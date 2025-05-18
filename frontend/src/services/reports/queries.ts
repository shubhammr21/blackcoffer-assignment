import { queryOptions } from "@tanstack/react-query"
import {
  fetchDashboardStats,
  fetchDashboardTable,
  fetchFacets,
  fetchFilterOptions
} from "./services"

const REPORT_FILTER_OPTIONS_KEY = "report-filter-options"
const REPORT_DATA_RECORDS_KEY = "report-data_records"
const REPORT_STATS_RECORDS_KEY = "report-stats"
const REPORT_FACET_KEY = "report-facet"

export const getFetchFilterOptionsQuery = () => {
  return queryOptions({
    queryKey: [REPORT_FILTER_OPTIONS_KEY],
    queryFn: fetchFilterOptions,
    staleTime: 1000 * 60 * 5
  })
}

export const getFetchDashboardTableQuery = () => {
  return queryOptions({
    queryKey: [REPORT_DATA_RECORDS_KEY],
    queryFn: fetchDashboardTable,
    staleTime: 1000 * 60 * 5
  })
}

export const getFetchDashboardStatsQuery = () => {
  return queryOptions({
    queryKey: [REPORT_STATS_RECORDS_KEY],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 5
  })
}

export const getFetchFacetsQuery = () => {
  return queryOptions({
    queryKey: [REPORT_FACET_KEY],
    queryFn: fetchFacets,
    staleTime: 1000 * 60 * 5
  })
}
