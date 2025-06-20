import { useQuery } from '@tanstack/react-query'
import { useTrendingMediaRequests } from '@/hooks/queries/useTrendingMedia/apiCalls'
import { transformMedia } from '@/hooks/queries/dataTransforms'
import { type TrendingGenre } from '@/hooks/queries/types'

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

export const useWeeklyTrendingMediaQuery = ({
  media,
}: {
  media: 'movie' | 'tv'
}) => {
  const { getWeeklyTrendingMovies } = useTrendingMediaRequests()
  return useQuery({
    queryKey: ['weeklyTrendingMedia', media],
    queryFn: async () => {
      const data = await getWeeklyTrendingMovies(media)
      return data.map(transformMedia)
    },
  })
}
