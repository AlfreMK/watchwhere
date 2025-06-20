import { tmdbClient } from '@/hooks/queries/apiClients'
import type { ProvidersResponse } from './types'

export const useProvidersRequests = () => {
  const getProviders = async ({
    mediaId,
    media,
  }: {
    mediaId: string
    media: string
  }) => {
    const data = await tmdbClient<ProvidersResponse>(`/${media}/${mediaId}/watch/providers`)
    return data
  }
  return { getProviders }
}
