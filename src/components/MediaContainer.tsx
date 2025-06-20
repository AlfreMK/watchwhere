import { type MediaType } from '@/mediaTypes'
import styled from 'styled-components'
import { Link } from 'react-router'

const BASE_URL = 'watchwhere'

function MediaContainer({
  mediaType,
  mediaObjects,
}: {
  mediaType: MediaType
  mediaObjects: { id: string; title: string; imgUrl: string }[]
}) {
  return (
    <CarouselContainer>
      {mediaObjects.map(mediaObject => (
        <MediaObject
          key={mediaObject.id}
          to={`/${BASE_URL}/${mediaType}/${mediaObject.id}`}
          className={'shadow'}
        >
          <Image src={mediaObject.imgUrl} alt={mediaObject.title} />
        </MediaObject>
      ))}
    </CarouselContainer>
  )
}

export default MediaContainer

const CarouselContainer = styled.div`
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

const MediaObject = styled(Link)`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 0.5s ease;
  margin: 0 10px;
  margin-top: 10px;
  margin-bottom: 30px;
  flex-shrink: 0;
  &:hover {
    transform: scale(1.05);
  }
`
