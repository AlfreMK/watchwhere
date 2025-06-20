export type Provider = {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export type ProvidersResponse = {
  results: {
    [countryCode: string]: {
      buy?: Provider[]
      flatrate?: Provider[]
      rent?: Provider[]
      link: string
    }
  }
}