import { fetchApi } from '@/hooks/queries/apiClient'
import { type MediaResponse } from '@/hooks/queries/types'
import { type MediaType } from '@/mediaTypes'

export const useMediaInfoRequests = () => {
  const getMediaInfo = async ({
    media,
    id,
  }: {
    media: MediaType
    id: string
  }) => {
    const data = await fetchApi<MediaResponse>(`/${media}/${id}`)
    return data
  }
  return { getMediaInfo }
}
