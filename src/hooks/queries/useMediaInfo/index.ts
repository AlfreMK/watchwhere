import { useQuery } from '@tanstack/react-query'
import { useMediaInfoRequests } from './apiCalls'
import { transformMedia } from '@/hooks/queries/dataTransforms'
import { type MediaType } from '@/mediaTypes'

export const useMediaInfoQuery = ({
  media,
  id,
}: {
  media?: MediaType
  id?: string
}) => {
  const { getMediaInfo } = useMediaInfoRequests()
  return useQuery({
    queryKey: ['mediaInfo', media, id],
    queryFn: async () => {
      const data = await getMediaInfo({ media: media!, id: id! })
      return transformMedia(data)
    },
    enabled: !!id && (media === 'movie' || media === 'tv'),
  })
}
