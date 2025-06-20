import SearchInput from '@/components/SearchInput'
import TrendingCarousel from '@/components/TrendingCarousel'
import { MEDIA_TYPES } from '@/components/mediaTypes'

function Index() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <SearchInput />
      <TrendingCarousel
        genre="Miku"
        mediaType={MEDIA_TYPES.MOVIE}
        movies={[]}
      />
    </div>
  )
}

export default Index
