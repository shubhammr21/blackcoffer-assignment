from django.urls import path

from .views import DataFacetView, DataFilterOptionsView, DataRecordList, DataStatsView

urlpatterns = [
    path("list/", DataRecordList.as_view(), name="record-list"),
    path("stats/", DataStatsView.as_view(), name="record-stats"),
    path("facet/", DataFacetView.as_view(), name="record-facet"),
    path(
        "filter-options/", DataFilterOptionsView.as_view(), name="record-filter-options"
    ),
]
