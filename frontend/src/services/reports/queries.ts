import { queryOptions } from "@tanstack/react-query"
import { fetchFilterOptions } from "./services"

const REPORT_FILTER_OPTIONS_KEY = "report-filter-options"

export const getFetchFilterOptionsQuery = () => {
  return queryOptions({
    queryKey: [REPORT_FILTER_OPTIONS_KEY],
    queryFn: fetchFilterOptions,
    staleTime: 1000 * 60 * 5
  })
}
