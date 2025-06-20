import {
  type ResultsResponse,
  type MediaResponse,
  type TrendingGenre,
  TRENDING_GENRES,
} from './types'

const API_KEY = '02f58fc0fefc4952073087c1738e0861'
const BASE_URL = 'https://api.themoviedb.org/3'

export const useTrendingMediaRequests = () => {
  const getTrendingByGenre = async ({
    media,
    genre,
  }: {
    media: 'movie' | 'tv'
    genre: TrendingGenre
  }) => {
    const url = `${BASE_URL}/discover/${media}?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=${TRENDING_GENRES[genre]}`
    const response = await fetch(url)
    const data: ResultsResponse<MediaResponse> = await response.json()
    return data.results
  }

  return {
    getTrendingByGenre,
  }
}
