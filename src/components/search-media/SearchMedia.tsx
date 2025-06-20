import { useState } from 'react'
import { type MediaType } from '@/mediaTypes'
import SearchInput from '@/components/search-media/SearchInput'
import MediaContainer from '@/components/MediaContainer'
import { useSearchMediaQuery } from '@/hooks/queries/useSearchMedia'
import useDebounce from '@/hooks/useDebounce'
import { LoadingSpinner } from '@/components/LoadingSpinner'

function SearchMedia({ mediaType }: { mediaType: MediaType }) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  
  const { data: mediaObjects, isLoading } = useSearchMediaQuery({
    media: mediaType,
    query: debouncedSearch,
  })
  
  return (
    <div className="flex flex-col gap-4 items-center">
      <SearchInput
        placeholder={`Search a ${mediaType}...`}
        onSearch={setSearch}
      />
      {isLoading && <LoadingSpinner className="md:h-[300px] h-[150px]" />}
      {!!mediaObjects && (
        <MediaContainer mediaType={mediaType} mediaObjects={mediaObjects} />
      )}
    </div>
  )
}

export default SearchMedia
