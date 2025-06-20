const API_KEY = '02f58fc0fefc4952073087c1738e0861'
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
