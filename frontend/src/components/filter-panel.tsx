import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { getFetchFacetsQuery } from "@/services/reports/queries"
import type { RecordFilterParams } from "@/services/reports/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Badge } from "./ui/badge"

interface FilterPanelProps {
  filters: RecordFilterParams
  onFilterChange: (filter: RecordFilterParams) => void
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const { data: filterOptions } = useSuspenseQuery(getFetchFacetsQuery())
  const getFilterValue = (value: string | undefined) => value ?? "all"

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="filters"
    >
      <AccordionItem value="filters">
        <AccordionTrigger>Filter Data</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* End Year Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">End Year</label>
              <Select
                value={getFilterValue(filters.end_year?.toString())}
                onValueChange={value =>
                  onFilterChange({
                    ...filters,
                    end_year: value === "all" ? undefined : parseInt(value)
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select end year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.end_year.map(facet => (
                    <SelectItem
                      key={facet.label}
                      value={facet.value.toString()}
                    >
                      <span className="truncate">{facet.label}</span>
                      <Badge
                        variant="secondary"
                        className="ml-2 font-mono text-xs"
                      >
                        {facet.count.toLocaleString()}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Topic Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Select
                value={getFilterValue(filters.topic)}
                onValueChange={value =>
                  onFilterChange({
                    ...filters,
                    topic: value === "all" ? undefined : value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.topic.map(facet => (
                    <SelectItem key={facet.label} value={String(facet.value)}>
                      <span className="truncate">{facet.label}</span>
                      <Badge
                        variant="secondary"
                        className="ml-2 font-mono text-xs"
                      >
                        {facet.count.toLocaleString()}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sector Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sector</label>
              <Select
                value={getFilterValue(filters.sector)}
                onValueChange={value =>
                  onFilterChange({
                    ...filters,
                    sector: value === "all" ? undefined : value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.sector.map(facet => (
                    <SelectItem key={facet.label} value={String(facet.value)}>
                      <span className="truncate">{facet.label}</span>
                      <Badge
                        variant="secondary"
                        className="ml-2 font-mono text-xs"
                      >
                        {facet.count.toLocaleString()}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Region Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select
                value={getFilterValue(filters.region)}
                onValueChange={value =>
                  onFilterChange({
                    ...filters,
                    region: value === "all" ? undefined : value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.region.map(facet => (
                    <SelectItem key={facet.label} value={String(facet.value)}>
                      <span className="truncate">{facet.label}</span>
                      <Badge
                        variant="secondary"
                        className="ml-2 font-mono text-xs"
                      >
                        {facet.count.toLocaleString()}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* PESTLE Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">PESTLE</label>
              <Select
                value={getFilterValue(filters.pestle)}
                onValueChange={value =>
                  onFilterChange({
                    ...filters,
                    pestle: value === "all" ? undefined : value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select PESTLE" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.pestle.map(facet => (
                    <SelectItem key={facet.label} value={String(facet.value)}>
                      <span className="truncate">{facet.label}</span>
                      <Badge
                        variant="secondary"
                        className="ml-2 font-mono text-xs"
                      >
                        {facet.count.toLocaleString()}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Source Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Select
                value={getFilterValue(filters.source)}
                onValueChange={value =>
                  onFilterChange({
                    ...filters,
                    source: value === "all" ? undefined : value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.source.map(facet => (
                    <SelectItem key={facet.label} value={String(facet.value)}>
                      <span className="truncate">{facet.label}</span>
                      <Badge
                        variant="secondary"
                        className="ml-2 font-mono text-xs"
                      >
                        {facet.count.toLocaleString()}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Select
                value={getFilterValue(filters.country)}
                onValueChange={value =>
                  onFilterChange({
                    ...filters,
                    country: value === "all" ? undefined : value
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <span>Any</span>
                  </SelectItem>
                  {filterOptions.country.map(facet => (
                    <SelectItem key={facet.label} value={String(facet.value)}>
                      <span className="truncate">{facet.label}</span>
                      <Badge
                        variant="secondary"
                        className="ml-2 font-mono text-xs"
                      >
                        {facet.count.toLocaleString()}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FilterPanel
