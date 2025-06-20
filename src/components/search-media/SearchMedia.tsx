import { useState } from 'react'
import { type MediaType } from '@/mediaTypes'
import SearchInput from '@/components/search-media/SearchInput'
import MediaContainer from '@/components/MediaContainer'
import { useSearchMediaQuery } from '@/queries/useSearchMedia'
import useDebounce from '@/hooks/useDebounce'

function SearchMedia({ mediaType }: { mediaType: MediaType }) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  
  const { data: mediaObjects } = useSearchMediaQuery({
    media: mediaType,
    query: debouncedSearch,
  })
  
  return (
    <div className="flex flex-col gap-4">
      <SearchInput
        placeholder={`Search a ${mediaType}...`}
        onSearch={setSearch}
      />
      {mediaObjects && (
        <MediaContainer mediaType={mediaType} mediaObjects={mediaObjects} />
      )}
    </div>
  )
}

export default SearchMedia
