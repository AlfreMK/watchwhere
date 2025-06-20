import { useParams } from 'react-router'
import styled from 'styled-components'
import { useMediaInfoQuery } from '@/hooks/queries/useMediaInfo'
import { type MediaType } from '@/mediaTypes'

function Media() {
  const { id } = useParams()
  const { media } = useParams()
  const { data: mediaInfo } = useMediaInfoQuery({ media: media as MediaType, id })
  return (
    <Container className="m-2">
      {mediaInfo?.id === undefined && <div>Loading...</div>}
      {mediaInfo?.id !== undefined && (
        <Container>
          <MoviePoster style={{ backgroundImage: `url(${mediaInfo.imgUrl})` }} />
          <MovieFront>
            <Image src={mediaInfo.imgUrl} alt={mediaInfo.title} />
            <Title>{mediaInfo.title}</Title>
          </MovieFront>
          <Info>
            <Overview>{mediaInfo.overview}</Overview>
          </Info>
        </Container>
      )}
    </Container>
  )
}

export default Media

const Image = styled.img`
  width: 300px;
  height: 450px;
  margin: 5px;
  box-shadow: 2px 2px 4px #000000;
  @media (max-width: 768px) {
    width: 200px;
    height: 300px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const MoviePoster = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  opacity: 0.5;
  @media (max-width: 768px) {
    height: 300px;
  }
`

const MovieFront = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
  padding: 50px 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Overview = styled.p`
  font-size: 1rem;
  text-align: justify;
  margin-bottom: 30px;
`

const Title = styled.h1`
  text-shadow: 2px 2px 4px #000000;
  font-size: 2rem;
  margin: 0 20px;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`