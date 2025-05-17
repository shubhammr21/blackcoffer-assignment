import django_filters

from .models import DataRecord


class DataRecordFilter(django_filters.FilterSet):
    # Exact matches
    end_year = django_filters.NumberFilter(field_name="end_year")
    start_year = django_filters.NumberFilter(field_name="start_year")
    sector = django_filters.CharFilter(field_name="sector", lookup_expr="icontains")
    country = django_filters.CharFilter(field_name="country", lookup_expr="icontains")
    region = django_filters.CharFilter(field_name="region", lookup_expr="icontains")

    # Range filters
    intensity_min = django_filters.NumberFilter(
        field_name="intensity", lookup_expr="gte"
    )
    intensity_max = django_filters.NumberFilter(
        field_name="intensity", lookup_expr="lte"
    )

    relevance_min = django_filters.NumberFilter(
        field_name="relevance", lookup_expr="gte"
    )
    relevance_max = django_filters.NumberFilter(
        field_name="relevance", lookup_expr="lte"
    )

    likelihood_min = django_filters.NumberFilter(
        field_name="likelihood", lookup_expr="gte"
    )
    likelihood_max = django_filters.NumberFilter(
        field_name="likelihood", lookup_expr="lte"
    )

    # Date filters
    added_after = django_filters.DateTimeFilter(field_name="added", lookup_expr="gte")
    added_before = django_filters.DateTimeFilter(field_name="added", lookup_expr="lte")

    published_after = django_filters.DateTimeFilter(
        field_name="published", lookup_expr="gte"
    )
    published_before = django_filters.DateTimeFilter(
        field_name="published", lookup_expr="lte"
    )

    class Meta:
        model = DataRecord
        fields = []
