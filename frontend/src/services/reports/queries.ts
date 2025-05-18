import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import {
  fetchDashboardStats,
  fetchDashboardTable,
  fetchFacets,
  fetchFilterOptions
} from "./services"
import type { PaginatedRecordFilterParams, RecordFilterParams } from "./types"

const REPORT_FILTER_OPTIONS_KEY = "report-filter-options"
const REPORT_DATA_RECORDS_KEY = "report-data-records"
const REPORT_STATS_RECORDS_KEY = "report-stats"
const REPORT_FACET_KEY = "report-facet"

export const getFetchFilterOptionsQuery = () => {
  return queryOptions({
    queryKey: [REPORT_FILTER_OPTIONS_KEY],
    queryFn: fetchFilterOptions
  })
}

export const getFetchDashboardTableQuery = (
  params: PaginatedRecordFilterParams = {}
) => {
  return queryOptions({
    queryKey: [REPORT_DATA_RECORDS_KEY, params],
    queryFn: () => fetchDashboardTable(params),
    placeholderData: keepPreviousData
  })
}

export const getFetchDashboardStatsQuery = (
  params: RecordFilterParams = {}
) => {
  return queryOptions({
    queryKey: [REPORT_STATS_RECORDS_KEY, params],
    queryFn: () => fetchDashboardStats(params)
  })
}

export const getFetchFacetsQuery = () => {
  return queryOptions({
    queryKey: [REPORT_FACET_KEY],
    queryFn: fetchFacets
  })
}
