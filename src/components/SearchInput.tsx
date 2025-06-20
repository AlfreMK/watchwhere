import { useState } from 'react'
import { Search } from 'lucide-react'

function SearchInput(
  { onSearch }: { onSearch?: (value: string) => void } = {},
) {
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    onSearch?.(search)
  }

  return (
    <div className="relative mt-1 w-2/3 min-w-300px flex">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full pl-6 pr-10 py-2 border-2 border-indigo-200 rounded-full hover:border-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors text-sm md:text-base"
        placeholder="Search..."
        autoComplete="off"
        onKeyDown={handleSearch}
      />
      <button
        onClick={handleSearch}
        className="block w-7 h-7 text-center text-xl leading-0 absolute top-1.5 md:top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-700 transition-colors"
      >
        <Search color="white" />
      </button>
    </div>
  )
}

export default SearchInput
