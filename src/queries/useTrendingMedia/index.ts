import { useQuery } from '@tanstack/react-query'
import { useTrendingMediaRequests } from '@/queries/useTrendingMedia/apiCalls'
import { transformMedia } from '@/queries/dataTransforms'
import { type TrendingGenre } from '@/queries/types'

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
