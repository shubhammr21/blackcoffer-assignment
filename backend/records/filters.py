import django_filters
from django.db.models import Q

from .models import DataRecord


class DataRecordFilter(django_filters.FilterSet):
    # Exact matches
    end_year = django_filters.NumberFilter(field_name="end_year")
    start_year = django_filters.NumberFilter(field_name="start_year")
    title = django_filters.CharFilter(field_name="title", lookup_expr="icontains")
    sector = django_filters.CharFilter(field_name="sector", lookup_expr="icontains")
    country = django_filters.CharFilter(field_name="country", lookup_expr="icontains")
    region = django_filters.CharFilter(field_name="region", lookup_expr="icontains")
    topic = django_filters.CharFilter(field_name="topic", lookup_expr="icontains")
    pestle = django_filters.CharFilter(field_name="pestle", lookup_expr="icontains")
    source = django_filters.CharFilter(field_name="source", lookup_expr="icontains")

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

    # Multiple filters
    end_years = django_filters.CharFilter(method="filter_end_years")
    start_years = django_filters.CharFilter(method="filter_start_years")
    topics = django_filters.BaseInFilter(field_name="topic")
    sectors = django_filters.BaseInFilter(field_name="sector")
    regions = django_filters.BaseInFilter(field_name="region")
    pestles = django_filters.BaseInFilter(field_name="pestle")
    sources = django_filters.BaseInFilter(field_name="source")
    countries = django_filters.BaseInFilter(field_name="country")

    # Date filters
    added_after = django_filters.DateTimeFilter(field_name="added", lookup_expr="gte")
    added_before = django_filters.DateTimeFilter(field_name="added", lookup_expr="lte")

    published_after = django_filters.DateTimeFilter(
        field_name="published", lookup_expr="gte"
    )
    published_before = django_filters.DateTimeFilter(
        field_name="published", lookup_expr="lte"
    )

    def filter_end_years(self, queryset, name, value):
        return self._filter_numeric_array(queryset, "end_year", value)

    def filter_start_years(self, queryset, name, value):
        return self._filter_numeric_array(queryset, "start_year", value)

    def _filter_numeric_array(self, queryset, field_name, value):
        """
        Universal safe numeric array filter that handles:
        - Single numbers
        - Comma-separated lists
        - 'null' values
        - Mixed valid/invalid values
        - Empty strings
        """
        if not value:
            return queryset

        try:
            parts = [part.strip() for part in str(value).split(",")]
            include_null = False
            numbers = []

            for part in parts:
                if not part:
                    continue
                if part.lower() == "null":
                    include_null = True
                else:
                    try:
                        numbers.append(
                            int(float(part))
                        )  # Handles both "2017" and "2017.0"
                    except (ValueError, TypeError):
                        continue  # Silently skip invalid numbers

            conditions = []
            if numbers:
                conditions.append(Q(**{f"{field_name}__in": numbers}))
            if include_null:
                conditions.append(Q(**{f"{field_name}__isnull": True}))

            if conditions:
                query = conditions.pop()
                for condition in conditions:
                    query |= condition
                return queryset.filter(query)

            return queryset
        except Exception:
            return queryset  # Ultimate fallback for any unexpected errors

    class Meta:
        model = DataRecord
        fields = []
