const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const tmdbClient = async <TResponse>(
  url: string,
  params?: Record<string, string>,
) => {
  const fullUrl = `${BASE_URL}${url}?api_key=${API_KEY}${
    params ? `&${new URLSearchParams(params).toString()}` : ''
  }`
  const response = await fetch(fullUrl)
  const data: TResponse = await response.json()
  return data
}
