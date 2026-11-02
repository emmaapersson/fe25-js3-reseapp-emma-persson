
import { useState } from 'react'
import './App.css'
import { useCountries } from './Hooks/useCountries'
import CountryCard from './Components/countryCard'
import SearchBar from './Components/searchBar'

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar', 'World Oceans']

function App() {
  const [search, setSearch] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const { countries, loading, error } = useCountries()
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
    .toLowerCase()
    .includes(search.trim().toLowerCase())
    
    const matchesRegion = 
    selectedRegion === 'All' || 
    country.region === selectedRegion

    return matchesSearch && matchesRegion
  })

  
  return (
    <main className="app">
      <header className="header">
        <h1>DISCOVER THE WORLD</h1>
        <p className="intro">
          Find your next destination and discover countries around the world.
        </p>
      </header>

      <section className="search-section">
        <SearchBar
          search={search}
          onSearchChange={setSearch}  
        />

        <h2>Explore by region</h2>
        <div className="regions">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              className={selectedRegion === region ? 'region active' : 'region'}
              aria-pressed={selectedRegion === region}
              onClick={() => setSelectedRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </section>

      <section className="countries-section">
        <h2>Countries to discover</h2>

        {loading && <p>Loading countries...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && (
          <>
          <p>
            {search
            ? `Your search: ${search}`
            : 'Your next adventure starts here.'}
          </p>
          
          <p>Selected region: {selectedRegion}</p>
          
          <div className="countries-grid">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.alpha3Code}
                country={country}
              />
            ))}
          </div>
          </>
        )}
      </section>
    </main>
  )
}

export default App
