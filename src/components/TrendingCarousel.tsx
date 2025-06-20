import { type MediaType, MEDIA_TYPES } from '@/components/mediaTypes'
import styled from 'styled-components'
import { Link } from 'react-router'

const BASE_URL = 'watchwhere'

const mediaNameByType = {
  [MEDIA_TYPES.MOVIE]: 'Movie',
  [MEDIA_TYPES.TV_SHOW]: 'TV Show',
} as const

function TrendingCarousel({
  genre,
  mediaType,
  movies,
}: {
  genre: string
  mediaType: MediaType
  movies: { id: string; title: string, posterSrc: string }[]
}) {
  return (
    <Container>
      <TitleTrending>
        {genre} Trending {mediaNameByType[mediaType]}s
      </TitleTrending>
      <MoviesContainer>
        {movies.map(movie => (
          <Movie
            key={movie.id}
            to={`/${BASE_URL}/${mediaType}/${movie.id}`}
            className={'shadow inactive-movie '}
          >
            <Image src={movie.posterSrc} alt={movie.title} />
          </Movie>
        ))}
      </MoviesContainer>
    </Container>
  )
}

export default TrendingCarousel

const MoviesContainer = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  overflow-y: visible;
  scroll-behavior: smooth;
  transition: all 0.5s ease;
  justify-content: flex-start;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  width: 85vw;
`

const Image = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  // media
  @media (max-width: 768px) {
    width: 100px;
    height: 150px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Movie = styled(Link)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 0.5s ease;
  margin: 0 10px;
  margin-top: 10px;
  margin-bottom: 30px;
  &:hover {
    transform: scale(1.05);
  }
`

const TitleTrending = styled.h2`
  font-size: 1.2em;
  width: 80vw;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`
