
import { useState } from 'react'
import './App.css'

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar', 'World Oceans']

function App() {
  const [search, setSearch] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')

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
        <p>
          {search
            ? `Your search: ${search}`
            : 'Your next adventure starts here.'}
        </p>
        <p>Selected region: {selectedRegion}</p>
      </section>
    </main>
  )
}

export default App
