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
import { getFetchFilterOptionsQuery } from "@/services/reports/queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { type Filters } from "./dashboard"

interface FilterPanelProps {
  filters: Filters
  onFilterChange: (filterName: keyof Filters, value: string) => void
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const { data: filterOptions } = useSuspenseQuery(getFetchFilterOptionsQuery())

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
                value={filters.endYear}
                onValueChange={value => onFilterChange("endYear", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select end year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.end_years.map(year => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
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
                  {filterOptions.topics.map(topic => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
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
                  {filterOptions.sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
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
                  {filterOptions.regions.map(region => (
                    <SelectItem key={region} value={region}>
                      {region}
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
                  {filterOptions.pestles.map(pestle => (
                    <SelectItem key={pestle} value={pestle}>
                      {pestle}
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
                  {filterOptions.sources.map(source => (
                    <SelectItem key={source} value={source}>
                      {source}
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
                  <SelectItem value="all">Any</SelectItem>
                  {filterOptions.countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
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
