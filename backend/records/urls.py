from django.urls import path

from .views import DataFilterOptionsView, DataRecordList, DataStatsView

urlpatterns = [
    path("list/", DataRecordList.as_view(), name="record-list"),
    path("stats/", DataStatsView.as_view(), name="data-stats"),
    path(
        "filter-options/", DataFilterOptionsView.as_view(), name="data-filter-options"
    ),
]
