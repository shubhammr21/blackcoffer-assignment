"use client"

import { X } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFilters } from "@/hooks/use-filters"
import { getFetchFacetsQuery } from "@/services/reports/queries"
import { type DataFacetResponse } from "@/services/reports/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps {
  facets?: DataFacetResponse
  searchKey: string
  filterKeys: Array<keyof DataFacetResponse>
  searchPlaceholder?: string
}
;("use client")

interface DataTableToolbarProps {
  searchKey: string
  filterKeys: Array<keyof DataFacetResponse>
}

export function DataTableToolbar({
  searchKey,
  filterKeys
}: DataTableToolbarProps) {
  const { filters, setFilters, resetFilters } = useFilters("/table")
  const { data: facets } = useSuspenseQuery(getFetchFacetsQuery())

  const currentSearchValue =
    (filters[searchKey as keyof typeof filters] as string) ?? ""

  const isFiltered = Object.keys(filters).some(
    key =>
      key !== searchKey && filters[key as keyof typeof filters] !== undefined
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      [searchKey]: event.target.value
    })
  }

  const handleFilterChange = (
    key: keyof DataFacetResponse,
    value: string | null
  ) => {
    setFilters({
      [key]: value || undefined
    })
  }

  return (
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter data..."
        value={currentSearchValue}
        onChange={handleSearchChange}
        className="h-8 w-[150px] lg:w-[250px]"
      />
      {filterKeys.map(key => {
        const facetItems = facets?.[key] as
          | Array<{ label: string; value: string; count?: number }>
          | undefined
        if (!facetItems) return null

        const options = facetItems.map(item => ({
          label: String(item.label),
          value: String(item.value),
          count: item.count
        }))

        return (
          <DataTableFacetedFilter
            key={String(key)}
            title={String(key)}
            options={options}
            selectedValue={filters[key] as string | undefined}
            onSelect={value => handleFilterChange(key, value)}
          />
        )
      })}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
