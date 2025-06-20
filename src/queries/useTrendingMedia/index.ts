import { useTrendingMediaRequests } from './apiCalls'
import { transformMedia } from './dataTransforms'
import { useQuery } from '@tanstack/react-query'
import { type TrendingGenre } from './types'

export const useTrendingMediaQuery = ({
  media,
  genre,
}: {
  media: 'movie' | 'tv'
  genre: TrendingGenre
}) => {
  const { getTrendingByGenre } = useTrendingMediaRequests()
  return useQuery({
    queryKey: ['trendingMedia', media, genre],
    queryFn: async () => {
      const data = await getTrendingByGenre({ media, genre })
      return data.map(transformMedia)
    },
  })
}
