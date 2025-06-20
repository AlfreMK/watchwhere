import type { MediaResponse } from './types'

const imgUrl = (media: MediaResponse) => {
  if (media.poster_path === null) {
    return 'https://via.placeholder.com/150'
  } else {
    return `https://image.tmdb.org/t/p/w500${media.poster_path}`
  }
}

export const transformMedia = (media: MediaResponse) => ({
  id: media.id,
  title: media.title,
  imgUrl: imgUrl(media),
  overview: media.overview,
})
