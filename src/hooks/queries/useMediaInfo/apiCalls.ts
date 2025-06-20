import { tmdbClient } from '@/hooks/queries/apiClients'
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
    const data = await tmdbClient<MediaResponse>(`/${media}/${id}`)
    return data
  }
  return { getMediaInfo }
}
