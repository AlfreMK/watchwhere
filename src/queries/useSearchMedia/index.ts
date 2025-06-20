import { useQuery } from '@tanstack/react-query'
import { useSearchMediaRequests } from './apiCalls'
import { transformMedia } from '@/queries/dataTransforms'

export const useSearchMediaQuery = ({
  media,
  query,
}: {
  media: 'movie' | 'tv'
  query?: string
}) => {
  const { searchMoviesByName } = useSearchMediaRequests()
  return useQuery({
    queryKey: ['searchMedia', media, query],
    queryFn: async () => {
      const data = await searchMoviesByName({ media, query: query! })
      return data.map(transformMedia)
    },
    enabled: !!query,
  })
}