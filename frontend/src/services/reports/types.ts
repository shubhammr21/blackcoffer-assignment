export interface FilterOptionsResponse {
  end_years: number[]
  topics: string[]
  sectors: string[]
  regions: string[]
  pestles: string[]
  sources: string[]
  countries: string[]
}

export interface DashboardListResponse {
  count: number
  next: string
  previous: null
  results: DataRecord[]
}

export interface DataRecord {
  id: number
  end_year: number | null
  intensity: number | null
  sector: string | null
  topic: string | null
  insight: string | null
  url: string | null
  region: string | null
  start_year: number | null
  impact: string | null
  added: string | null
  published: string | null
  country: string | null
  relevance: number | null
  pestle: string | null
  source: string | null
  title: string | null
  likelihood: number | null
}

export interface DashboardStatsResponse {
  avg_intensity: number
  avg_likelihood: number
  avg_relevance: number
  total_records: number
  sectors: SectorStats[]
  topics: TopicStats[]
  regions: RegionStats[]
  yearly_trends: YearlyTrendStats[]
  likelihoods: LikelihoodStats[]
}

export interface LikelihoodStats {
  likelihood: number
  count: number
}

export interface RegionStats {
  region: string
  intensity: number
  count: number
}

export interface SectorStats {
  sector: string
  intensity: number
  count: number
}

export interface TopicStats {
  topic: string
  count: number
}

export interface YearlyTrendStats {
  year: number
  intensity: number
  relevance: number
  likelihood: number
  count: number
}

export interface DataFacetResponse {
  end_year: FacetItem<number>[]
  topic: FacetItem<string>[]
  sector: FacetItem<string>[]
  region: FacetItem<string>[]
  pestle: FacetItem<string>[]
  source: FacetItem<string>[]
  country: FacetItem<string>[]
}

export interface FacetItem<T> {
  label: T
  value: T
  count: number
}
