import SearchMedia from '@/components/search-media/SearchMedia'
import TrendingCarousel from '@/components/TrendingCarousel'
import { MEDIA_TYPES } from '@/mediaTypes'
import {
  useTrendingMediaQuery,
  useWeeklyTrendingMediaQuery,
} from '@/queries/useTrendingMedia'

function Index() {
  const weeklyTrendingMovies = useWeeklyTrendingMediaQuery({
    media: 'movie',
  })

  const trendingCrimeMovies = useTrendingMediaQuery({
    media: 'movie',
    genre: 'crime',
  })

  const trendingAnimationMovies = useTrendingMediaQuery({
    media: 'movie',
    genre: 'animation',
  })

  const trendingHorrorMovies = useTrendingMediaQuery({
    media: 'movie',
    genre: 'horror',
  })

  const trendingDramaMovies = useTrendingMediaQuery({
    media: 'movie',
    genre: 'drama',
  })

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <SearchMedia mediaType={MEDIA_TYPES.MOVIE} />
      <TrendingCarousel
        genre="Weekly"
        mediaType={MEDIA_TYPES.MOVIE}
        movies={weeklyTrendingMovies.data || []}
        isLoading={weeklyTrendingMovies.isLoading}
      />
      <TrendingCarousel
        genre="Crime"
        mediaType={MEDIA_TYPES.MOVIE}
        movies={trendingCrimeMovies.data || []}
        isLoading={trendingCrimeMovies.isLoading}
      />
      <TrendingCarousel
        genre="Animation"
        mediaType={MEDIA_TYPES.MOVIE}
        movies={trendingAnimationMovies.data || []}
        isLoading={trendingAnimationMovies.isLoading}
      />
      <TrendingCarousel
        genre="Horror"
        mediaType={MEDIA_TYPES.MOVIE}
        movies={trendingHorrorMovies.data || []}
        isLoading={trendingHorrorMovies.isLoading}
      />
      <TrendingCarousel
        genre="Drama"
        mediaType={MEDIA_TYPES.MOVIE}
        movies={trendingDramaMovies.data || []}
        isLoading={trendingDramaMovies.isLoading}
      />
    </div>
  )
}

export default Index
