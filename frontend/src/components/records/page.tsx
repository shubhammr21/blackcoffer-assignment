import { useFilters } from "@/hooks/use-filters"
import { getFetchDashboardTableQuery } from "@/services/reports/queries"
import type { SortParams } from "@/services/reports/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { type SortingState } from "@tanstack/react-table"
import { useMemo } from "react"
import { columns as recordColumns } from "./components/columns"
import { DataTable } from "./components/data-table"

export const DEFAULT_PAGE_INDEX = 1
export const DEFAULT_PAGE_SIZE = 10

export const stateToSortBy = (sorting: SortingState | undefined) => {
  if (!sorting || sorting.length == 0) return undefined

  const sort = sorting[0]

  return `${sort.id}.${sort.desc ? "desc" : "asc"}` as const
}

export const sortByToState = (sortBy: SortParams["sortBy"] | undefined) => {
  if (!sortBy) return []

  const [id, desc] = sortBy.split(".")
  return [{ id, desc: desc === "desc" }]
}

export default function DataRecordTablePage() {
  const { filters, setFilters } = useFilters("/table")
  const { data } = useSuspenseQuery(getFetchDashboardTableQuery(filters))
  const paginationState = {
    pageIndex: (filters.page ?? DEFAULT_PAGE_INDEX) - 1,
    pageSize: filters.page_size ?? DEFAULT_PAGE_SIZE
  }
  const sortingState = sortByToState(filters.sortBy)
  const columns = useMemo(() => recordColumns, [])

  return (
    <>
      <section className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Data Records
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            <DataTable
              data={data.results}
              columns={columns}
              pagination={paginationState}
              sorting={sortingState}
              paginationOptions={{
                onPaginationChange: pagination => {
                  const pageFilter =
                    typeof pagination === "function"
                      ? pagination(paginationState)
                      : pagination
                  setFilters({
                    page: pageFilter.pageIndex + 1,
                    page_size: pageFilter.pageSize
                  })
                },
                rowCount: data?.count
              }}
              onSortingChange={updaterOrValue => {
                const newSortingState =
                  typeof updaterOrValue === "function"
                    ? updaterOrValue(sortingState)
                    : updaterOrValue
                return setFilters({ sortBy: stateToSortBy(newSortingState) })
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
