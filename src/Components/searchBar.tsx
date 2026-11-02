interface SearchBarProps {
    search: string
    onSearchChange: (value: string) => void
}

function SearchBar({ search, onSearchChange }: SearchBarProps) {
    return (
        <div className="search-bar">
            <label htmlFor="country-search">
                Search for a country
            </label>

            <input
              id="country-search" 
              type="search"
              placeholder="Try Sweden, Austrailia or Korea..."
              value={search}
              onChange={(event) => onSearchChange(event.target.value)} 
            />
        </div>
    )
}

export default SearchBar