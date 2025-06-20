export type ResultsResponse<T> = {
  results: T[]
}

export type MediaResponse = {
  id: string
  title: string
  poster_path: string
  overview: string
}

export const TRENDING_GENRES = {
  animation: 16,
  crime: 80,
  history: 36,
  documentary: 99,
  horror: 27,
  drama: 18,
} as const

export type TrendingGenre = keyof typeof TRENDING_GENRES
