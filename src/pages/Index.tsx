import styled from 'styled-components'
import { useState } from 'react'
import SearchMedia from '@/components/search-media/SearchMedia'
import TrendingCarousel from '@/components/TrendingCarousel'
import { MEDIA_TYPES, type MediaType } from '@/mediaTypes'
import {
  useTrendingMediaQuery,
  useWeeklyTrendingMediaQuery,
} from '@/hooks/queries/useTrendingMedia'

function Index() {
  const [mediaType, setMediaType] = useState<MediaType>(MEDIA_TYPES.MOVIE)

  const weeklyTrendingMovies = useWeeklyTrendingMediaQuery({
    media: mediaType,
  })

  const trendingCrimeMovies = useTrendingMediaQuery({
    media: mediaType,
    genre: 'crime',
  })

  const trendingAnimationMovies = useTrendingMediaQuery({
    media: mediaType,
    genre: 'animation',
  })

  const trendingHorrorMovies = useTrendingMediaQuery({
    media: mediaType,
    genre: 'horror',
  })

  const trendingDramaMovies = useTrendingMediaQuery({
    media: mediaType,
    genre: 'drama',
  })

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 px-24">
      <div className="flex items-center mb-10">
        <Title>I Wanna Watch a...</Title>
        <Selector
          onChange={e => setMediaType(e.target.value as MediaType)}
          value={mediaType}
        >
          <option value={MEDIA_TYPES.MOVIE}>Movie</option>
          <option value={MEDIA_TYPES.TV_SHOW}>TV Show</option>
        </Selector>
      </div>
      <SearchMedia mediaType={mediaType} />
      <TrendingCarousel
        genre="Weekly"
        mediaType={mediaType}
        mediaObjects={weeklyTrendingMovies.data || []}
        isLoading={weeklyTrendingMovies.isLoading}
      />
      <TrendingCarousel
        genre="Crime"
        mediaType={mediaType}
        mediaObjects={trendingCrimeMovies.data || []}
        isLoading={trendingCrimeMovies.isLoading}
      />
      <TrendingCarousel
        genre="Animation"
        mediaType={mediaType}
        mediaObjects={trendingAnimationMovies.data || []}
        isLoading={trendingAnimationMovies.isLoading}
      />
      <TrendingCarousel
        genre="Horror"
        mediaType={mediaType}
        mediaObjects={trendingHorrorMovies.data || []}
        isLoading={trendingHorrorMovies.isLoading}
      />
      <TrendingCarousel
        genre="Drama"
        mediaType={mediaType}
        mediaObjects={trendingDramaMovies.data || []}
        isLoading={trendingDramaMovies.isLoading}
      />
    </div>
  )
}

export default Index

const Selector = styled.select`
  background-color: #3730a3;
  font-size: 1.2em;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid #3730a3;
  &:hover {
    background-color: #4338ca;
  }
  @media (max-width: 768px) {
    font-size: 1em;
  }
`

const Title = styled.h2`
  font-size: 1.4em;
  text-align: center;
  letter-spacing: 1px;
  margin-right: 10px;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`
