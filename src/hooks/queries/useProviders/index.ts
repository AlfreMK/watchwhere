import { useQuery } from '@tanstack/react-query'
import { useProvidersRequests } from './apiCalls'
import { parseProviders } from './dataTransforms'
import { arrayToKeyed } from '@/hooks/queries/utils'

export const useProvidersQuery = ({
  media,
  mediaId,
}: {
  media: 'movie' | 'tv'
  mediaId?: string
}) => {
  const { getProviders } = useProvidersRequests()
  return useQuery({
    queryKey: ['providers', media, mediaId],
    queryFn: async () => {
      const data = await getProviders({ media, mediaId: mediaId! })
      const parsedData = Object.entries(data.results).map(([countryCode, providers]) => ({
        countryCode,
        ...parseProviders(providers),
      }))
      return arrayToKeyed(parsedData, 'countryCode')
    },
    enabled: !!mediaId && (media === 'movie' || media === 'tv'),
  })
}
