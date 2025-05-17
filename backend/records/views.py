from django.db.models import Avg, Case, Count, FloatField, IntegerField, Q, Value, When
from django.db.models.functions import Cast, Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .filters import DataRecordFilter
from .models import DataRecord
from .serializers import DataRecordSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class DataRecordList(generics.ListAPIView):
    queryset = DataRecord.objects.all()
    serializer_class = DataRecordSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = DataRecordFilter
    pagination_class = StandardResultsSetPagination


class DataStatsView(generics.GenericAPIView):
    filterset_class = DataRecordFilter

    def get_queryset(self):
        return DataRecord.objects.all()

    def get(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        stats = {
            "avg_intensity": (queryset.aggregate(avg=Avg("intensity"))["avg"]),
            "avg_likelihood": (queryset.aggregate(avg=Avg("likelihood"))["avg"]),
            "avg_relevance": (queryset.aggregate(avg=Avg("relevance"))["avg"]),
            "total_records": queryset.count(),
            "sectors": (
                queryset.exclude(sector__isnull=True)
                .exclude(intensity__isnull=True)
                .values("sector")
                .annotate(intensity=Avg("intensity"), count=Count("id"))
                .order_by("-intensity")
            ),
            "topics": (
                queryset.exclude(topic__isnull=True)
                .values("topic")
                .annotate(count=Count("id"))
                .order_by("-count")
            ),
            "regions": (
                queryset.exclude(region__isnull=True)
                .exclude(intensity__isnull=True)
                .values("region")
                .annotate(intensity=Avg("intensity"), count=Count("id"))
                .order_by("-intensity")
            ),
            "yearly_trends": (
                (
                    queryset.filter(
                        Q(start_year__isnull=False) | Q(end_year__isnull=False),
                        Q(intensity__isnull=False)
                        | Q(relevance__isnull=False)
                        | Q(likelihood__isnull=False),
                    )
                    .annotate(
                        year=Coalesce("start_year", "end_year"),
                        # Use different names for annotated fields
                        intensity_value=Case(
                            When(intensity__isnull=True, then=Value(0)),
                            default="intensity",
                            output_field=FloatField(),
                        ),
                        relevance_value=Case(
                            When(relevance__isnull=True, then=Value(0)),
                            default="relevance",
                            output_field=FloatField(),
                        ),
                        likelihood_value=Case(
                            When(likelihood__isnull=True, then=Value(0)),
                            default="likelihood",
                            output_field=FloatField(),
                        ),
                    )
                    .filter(year__gt=0)
                    .values("year")
                    .annotate(
                        intensity=Avg("intensity_value"),
                        relevance=Avg("relevance_value"),
                        likelihood=Avg("likelihood_value"),
                        count=Count("id"),
                    )
                    .order_by("year")
                )
            ),
            "likelihoods": (
                queryset.exclude(likelihood__isnull=True)
                .values("likelihood")
                .annotate(count=Count("id"))
                .order_by("-count")
            ),
        }
        return Response(stats)


class DataFilterOptionsView(generics.GenericAPIView):
    def get(self, request):
        def distinct_values(field, output_field=None):
            qs = DataRecord.objects.exclude(**{f"{field}__isnull": True})
            if output_field:
                qs = qs.annotate(val=Cast(field, output_field))
                field = "val"
            return qs.values_list(field, flat=True).distinct().order_by(field)

        options = {
            "end_years": list(distinct_values("end_year", IntegerField())),
            "topics": list(distinct_values("topic")),
            "sectors": list(distinct_values("sector")),
            "regions": list(distinct_values("region")),
            "pestles": list(distinct_values("pestle")),
            "sources": list(distinct_values("source")),
            "countries": list(distinct_values("country")),
        }

        return Response(options)
