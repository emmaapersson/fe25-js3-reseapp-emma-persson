
import { useState, useEffect } from 'react'
import './App.css'
import { getCountries, type Country } from './API/countries'

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar', 'World Oceans']

function App() {
  const [search, setSearch] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('') 
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
    .toLowerCase()
    .includes(search.trim().toLowerCase())
    
    const matchesRegion = 
    selectedRegion === 'All' || 
    country.region === selectedRegion

    return matchesSearch && matchesRegion
  })

  useEffect(() => {
    async function loadCountries() {
      try {
        setLoading(true)
        setError('')

        const data = await getCountries()
        setCountries(data)
      } catch {
        setError('Kunde inte hämta länder. Försök igen senare.')
      } finally {
        setLoading(false)
      }
    }
    loadCountries()
  }, [])

  return (
    <main className="app">
      <header className="header">
        <h1>DISCOVER THE WORLD</h1>
        <p className="intro">
          Find your next destination and discover countries around the world.
        </p>
      </header>

      <section className="search-section">
        <label htmlFor="country-search">Search for a country</label>
        <input
          id="country-search"
          type="search"
          placeholder="Try Sweden, Japan or Brazil..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
              <article className="country-card" key={country.alpha3code}>
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={`Flag of ${country.name}`}
                  width='80'
                />

                <h3>{country.name}</h3>
                <p>Region: {country.region || 'Unknown'}</p>
                <p>Capital: {country.capital || 'Unknown'}</p>
              </article>
            ))}
          </div>
          </>
        )}
      </section>
    </main>
  )
}

export default App
