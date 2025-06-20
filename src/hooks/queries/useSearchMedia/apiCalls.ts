import { fetchApi } from '@/hooks/queries/apiClient'
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
    const data = await fetchApi<ResultsResponse<MediaResponse>>(
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
