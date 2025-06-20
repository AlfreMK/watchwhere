import { type MediaType, MEDIA_TYPES } from '@/mediaTypes'
import styled from 'styled-components'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import MediaContainer from '@/components/MediaContainer'

const mediaNameByType = {
  [MEDIA_TYPES.MOVIE]: 'Movie',
  [MEDIA_TYPES.TV_SHOW]: 'TV Show',
} as const

function TrendingCarousel({
  genre,
  mediaType,
  mediaObjects,
  isLoading,
}: {
  genre: string
  mediaType: MediaType
  mediaObjects: { id: string; title: string; imgUrl: string }[]
  isLoading?: boolean
}) {
  return (
    <Container>
      <TitleTrending>
        {genre} Trending {mediaNameByType[mediaType]}s
      </TitleTrending>
      {isLoading && <LoadingSpinner className="md:h-[300px] h-[150px]" />}
      <MediaContainer mediaType={mediaType} mediaObjects={mediaObjects} />
    </Container>
  )
}

export default TrendingCarousel

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TitleTrending = styled.h2`
  font-size: 1.2em;
  width: 100%;
  padding: 0 12px;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`
