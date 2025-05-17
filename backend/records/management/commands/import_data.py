import json

from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from records.models import DataRecord


class Command(BaseCommand):
    help = "Import JSON data into DataRecord model using bulk creation"

    def add_arguments(self, parser):
        parser.add_argument(
            "file_path",
            type=str,
            help="Path to the JSON file containing data to import",
        )
        parser.add_argument(
            "--batch-size",
            type=int,
            default=1000,
            help="Number of records to create in each batch (default: 1000)",
        )

    def handle(self, *args, **options):
        file_path = options["file_path"]
        batch_size = options["batch_size"]

        try:
            with open(file_path, "r") as f:
                data = json.load(f)
        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"File not found: {file_path}"))
            return
        except json.JSONDecodeError:
            self.stderr.write(self.style.ERROR("Invalid JSON file"))
            return

        records = []
        success_count = 0
        errors = []

        for item in data:
            try:
                # Convert empty strings to None
                processed_item = {
                    key: None if value == "" else value for key, value in item.items()
                }

                # Convert date strings
                if processed_item["added"]:
                    processed_item["added"] = parse_datetime(
                        processed_item["added"].replace(",", "")
                    )
                if processed_item["published"]:
                    processed_item["published"] = parse_datetime(
                        processed_item["published"].replace(",", "")
                    )

                records.append(DataRecord(**processed_item))

                # Create records in batches
                if len(records) >= batch_size:
                    DataRecord.objects.bulk_create(records)
                    success_count += len(records)
                    records = []

            except Exception as e:
                errors.append({"item": item.get("title", "Untitled"), "error": str(e)})

        # Create any remaining records
        if records:
            DataRecord.objects.bulk_create(records)
            success_count += len(records)

        # Output results
        self.stdout.write(
            self.style.SUCCESS(f"\nSuccessfully imported {success_count} records")
        )

        if errors:
            self.stdout.write(self.style.WARNING(f"\n{len(errors)} records failed:"))
            for error in errors[:10]:  # Show first 10 errors
                self.stdout.write(f"- {error['item']}: {error['error']}")
            if len(errors) > 10:
                self.stdout.write(f"... and {len(errors) - 10} more errors")
