import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
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

interface FilterPanelProps {
  filters: RecordFilterParams
  onFilterChange: (filter: RecordFilterParams) => void
}

interface FilterSelectProps {
  label: string
  value: string | undefined
  options: Array<{ label: string; value: string; count: number }>
  placeholder: string
  onChange: (value: string) => void
}

const FilterSelect = ({
  label,
  value,
  options,
  placeholder,
  onChange
}: FilterSelectProps) => {
  const getFilterValue = (value: string | undefined) => value ?? "all"

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select value={getFilterValue(value)} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any</SelectItem>
          {options.map(facet => (
            <SelectItem key={facet.label} value={facet.value}>
              <span className="truncate">{facet.label}</span>
              <Badge variant="secondary" className="ml-2 font-mono text-xs">
                {facet.count.toLocaleString()}
              </Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const { data: filterOptions } = useSuspenseQuery(getFetchFacetsQuery())

  const handleFilterChange =
    (key: keyof RecordFilterParams) => (value: string) => {
      onFilterChange({
        ...filters,
        [key]:
          value === "all"
            ? undefined
            : key === "end_year"
              ? parseInt(value)
              : value
      })
    }

  const filterConfigs: Array<{
    key: keyof RecordFilterParams
    label: string
    placeholder: string
    options: Array<{ label: string; value: string; count: number }>
  }> = [
    {
      key: "end_year",
      label: "End Year",
      placeholder: "Select end year",
      options: filterOptions.end_year.map(f => ({
        ...f,
        value: f.value.toString(),
        label: String(f.label)
      }))
    },
    {
      key: "topic",
      label: "Topic",
      placeholder: "Select topic",
      options: filterOptions.topic.map(f => ({ ...f, value: String(f.value) }))
    },
    {
      key: "sector",
      label: "Sector",
      placeholder: "Select sector",
      options: filterOptions.sector.map(f => ({ ...f, value: String(f.value) }))
    },
    {
      key: "region",
      label: "Region",
      placeholder: "Select region",
      options: filterOptions.region.map(f => ({ ...f, value: String(f.value) }))
    },
    {
      key: "pestle",
      label: "PESTLE",
      placeholder: "Select PESTLE",
      options: filterOptions.pestle.map(f => ({ ...f, value: String(f.value) }))
    },
    {
      key: "source",
      label: "Source",
      placeholder: "Select source",
      options: filterOptions.source.map(f => ({ ...f, value: String(f.value) }))
    },
    {
      key: "country",
      label: "Country",
      placeholder: "Select country",
      options: filterOptions.country.map(f => ({
        ...f,
        value: String(f.value)
      }))
    }
  ]

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
            {filterConfigs.map(config => (
              <FilterSelect
                key={config.key}
                label={config.label}
                value={filters[
                  config.key as keyof RecordFilterParams
                ]?.toString()}
                options={config.options}
                placeholder={config.placeholder}
                onChange={handleFilterChange(config.key)}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FilterPanel
