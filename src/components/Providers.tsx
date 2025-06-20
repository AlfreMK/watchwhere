import styled from 'styled-components'
import { useProvidersQuery } from '@/hooks/queries/useProviders'
import { type MediaType } from '@/mediaTypes'
import { useMemo } from 'react'

function Providers({
  media,
  mediaId,
  countryCode,
}: {
  media: MediaType
  mediaId: string
  countryCode: string
}) {
  const { data: providersByCountryCode } = useProvidersQuery({ media, mediaId })
  const providers = useMemo(() => {
    return (
      providersByCountryCode?.[countryCode] ?? { buy: [], stream: [], rent: [] }
    )
  }, [providersByCountryCode, countryCode])

  return (
    <div className="w-2/3 flex flex-col gap-4">
      <ProvidersContainer providers={providers.stream} title="Streaming" />
      <ProvidersContainer providers={providers.buy} title="Buy" />
      <ProvidersContainer providers={providers.rent} title="Rent" />
    </div>
  )
}

const ProvidersContainer = ({
  providers,
  title,
}: {
  providers: {
    id: number
    name: string
    imgUrl: string
  }[]
  title: string
}) => {
  return (
    <div>
      <Text>{title}</Text>
      <Container className="bg-indigo-950">
        {providers.length === 0 && <NoProvidersFound />}
        {providers.map((provider, index) => (
          <Provider key={index}>
            <Image
              className="shadow-inner"
              src={provider.imgUrl}
              alt={provider.name}
              title={provider.name}
            />
          </Provider>
        ))}
      </Container>
    </div>
  )
}

const NoProvidersFound = () => {
  return <div className="text-center italic text-gray-400">No providers found</div>
}

export default Providers

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
`

const Provider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;
`

const Text = styled.span`
  display: inline;
  font-size: 15px;
  font-optical-sizing: auto;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: initial;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
