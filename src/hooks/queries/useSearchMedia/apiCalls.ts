import { tmdbClient } from '@/hooks/queries/apiClients'
import { type ResultsResponse, type MediaResponse } from '@/hooks/queries/types'
import { type MediaType } from '@/mediaTypes'

export const useSearchMediaRequests = () => {
  const searchMoviesByName = async ({
    query,
    media,
  }: {
    query: string
    media: MediaType
  }) => {
    const data = await tmdbClient<ResultsResponse<MediaResponse>>(
      `/search/${media}`,
      {
        sort_by: 'popularity.desc',
        query,
      },
    )
    return data.results
  }
  return { searchMoviesByName }
}
