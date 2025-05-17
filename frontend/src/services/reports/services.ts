import api from "@/lib/api"
import type { FilterOptionsResponse } from "./types"

export const fetchDashboardData = async (params = {}) => {
  const response = await api.get("/records/list/", { params })
  return response.data
}

export const fetchFilterOptions = async () => {
  const response = await api.get<FilterOptionsResponse>(
    "/records/filter-options/"
  )
  return response.data
}
export const fetchDashboardStats = async () => {
  const response = await api.get<FilterOptionsResponse>("/records/stats/")
  return response.data
}
