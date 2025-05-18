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
import { useSuspenseQuery } from "@tanstack/react-query"
import { type Filters } from "./dashboard"
import { Badge } from "./ui/badge"

interface FilterPanelProps {
  filters: Filters
  onFilterChange: (filterName: keyof Filters, value: string) => void
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const { data: filterOptions } = useSuspenseQuery(getFetchFacetsQuery())

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
                value={filters.end_year}
                onValueChange={value => onFilterChange("end_year", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select end year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.end_year.map(facet => (
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

            {/* Topic Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Select
                value={filters.topic}
                onValueChange={value => onFilterChange("topic", value)}
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
                value={filters.sector}
                onValueChange={value => onFilterChange("sector", value)}
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
                value={filters.region}
                onValueChange={value => onFilterChange("region", value)}
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
                value={filters.pestle}
                onValueChange={value => onFilterChange("pestle", value)}
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
                value={filters.source}
                onValueChange={value => onFilterChange("source", value)}
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
                value={filters.country}
                onValueChange={value => onFilterChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <span>Any country</span>
                    <Badge variant="outline" className="ml-2">
                      {filterOptions.country.reduce(
                        (sum, facet) => sum + facet.count,
                        0
                      )}
                    </Badge>
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
