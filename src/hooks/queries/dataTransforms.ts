import notFoundImg from '@/assets/not-found.png'
import type { MediaResponse } from './types'

export const imgUrl = (posterPath: string) => {
  if (posterPath === null) {
    return notFoundImg
  } else {
    return `https://image.tmdb.org/t/p/w500${posterPath}`
  }
}

export const transformMedia = (media: MediaResponse) => ({
  id: media.id,
  title: media.title,
  imgUrl: imgUrl(media.poster_path),
  overview: media.overview,
})
