import type { ProvidersResponse, Provider } from './types'
import { imgUrl } from '@/hooks/queries/dataTransforms'

export const parseProvider = (provider: Provider) => {
  return {
    id: provider.provider_id,
    name: provider.provider_name,
    imgUrl: imgUrl(provider.logo_path),
  }
}

export const parseProviders = (data: ProvidersResponse['results'][string]) => {
  return {
    buy: data.buy?.map(parseProvider) ?? [],
    stream: data.flatrate?.map(parseProvider) ?? [],
    rent: data.rent?.map(parseProvider) ?? [],
  }
}
