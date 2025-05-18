import api from "@/lib/api"
import type {
  DashboardListResponse,
  DashboardStatsResponse,
  DataFacetResponse,
  FilterOptionsResponse
} from "./types"

export const fetchDashboardTable = async (params = {}) => {
  const response = await api.get<DashboardListResponse>("/records/list/", {
    params
  })
  return response.data
}

export const fetchDashboardStats = async (params = {}) => {
  const response = await api.get<DashboardStatsResponse>("/records/stats/", {
    params
  })
  return response.data
}

export const fetchFilterOptions = async () => {
  const response = await api.get<FilterOptionsResponse>(
    "/records/filter-options/"
  )
  return response.data
}
export const fetchFacets = async () => {
  const response = await api.get<DataFacetResponse>("/records/facet/")
  return response.data
}
