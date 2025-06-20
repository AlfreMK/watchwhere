import {
  type ResultsResponse,
  type MediaResponse,
  type TrendingGenre,
  TRENDING_GENRES,
} from '@/hooks/queries/types'
import { fetchApi } from '@/hooks/queries/apiClient'
import { type MediaType } from '@/mediaTypes'

export const useTrendingMediaRequests = () => {
  const getWeeklyTrendingMovies = async (media: MediaType) => {
    const data = await fetchApi<ResultsResponse<MediaResponse>>(`/trending/${media}/week`)
    return data.results
  }

  const getTrendingByGenre = async ({
    media,
    genre,
  }: {
    media: MediaType
    genre: TrendingGenre
  }) => {
    const data = await fetchApi<ResultsResponse<MediaResponse>>(
      `/discover/${media}`,
      {
        sort_by: 'popularity.desc',
        with_genres: TRENDING_GENRES[genre],
      },
    )
    return data.results
  }

  return {
    getWeeklyTrendingMovies,
    getTrendingByGenre,
  }
}
