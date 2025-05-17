from django.db.models import Avg, Count
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
    def get(self, request):
        stats = {
            "sectors": list(
                DataRecord.objects.values("sector").annotate(count=Count("sector"))
                # .order_by("-count")
            ),
            "topics": list(
                DataRecord.objects.values("topic").annotate(count=Count("topic"))
                # .order_by("-count")
            ),
            "regions": list(
                DataRecord.objects.values("region").annotate(count=Count("region"))
                # .order_by("-count")
            ),
            "avg_intensity": DataRecord.objects.aggregate(avg=Avg("intensity"))["avg"],
            "avg_likelihood": DataRecord.objects.aggregate(avg=Avg("likelihood"))[
                "avg"
            ],
            "avg_relevance": DataRecord.objects.aggregate(avg=Avg("relevance"))["avg"],
        }
        return Response(stats)


class DataFilterOptionsView(generics.GenericAPIView):
    def get(self, request):
        return Response(
            {
                "end_years": DataRecord.objects.exclude(end_year__isnull=True)
                .values_list("end_year", flat=True)
                .distinct()
                .order_by("end_year"),
                "topics": DataRecord.objects.exclude(topic__isnull=True)
                .values_list("topic", flat=True)
                .distinct()
                .order_by("topic"),
                "sectors": DataRecord.objects.exclude(sector__isnull=True)
                .values_list("sector", flat=True)
                .distinct()
                .order_by("sector"),
                "regions": DataRecord.objects.exclude(region__isnull=True)
                .values_list("region", flat=True)
                .distinct()
                .order_by("region"),
                "pestles": DataRecord.objects.exclude(pestle__isnull=True)
                .values_list("pestle", flat=True)
                .distinct()
                .order_by("pestle"),
                "sources": DataRecord.objects.exclude(source__isnull=True)
                .values_list("source", flat=True)
                .distinct()
                .order_by("source"),
                "countries": DataRecord.objects.exclude(country__isnull=True)
                .values_list("country", flat=True)
                .distinct()
                .order_by("country"),
            }
        )
