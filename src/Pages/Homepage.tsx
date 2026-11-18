import { useSearchParams } from 'react-router-dom';
import { useCountries } from '../Hooks/useCountries';
import CountryCard from '../Components/countryCard';
import SearchBar from '../Components/searchBar';
import Pagination from '../Components/pagination';

const regions = [
  'All',
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Polar',
  'World Oceans'
];

function Homepage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('query') || ''
    const selectedRegion = searchParams.get('region') || 'All'
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)

    const { countries, loading, error } = useCountries()

    const countriesPerPage = 12;

    const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())

       const matchesRegion =
      selectedRegion === 'All' ||
      country.region === selectedRegion

    return matchesSearch && matchesRegion
  })

  const totalPages = Math.ceil(
    filteredCountries.length / countriesPerPage
  )

  const startIndex = (currentPage - 1) * countriesPerPage
  const visibleCountries = filteredCountries.slice(
    startIndex,
    startIndex + countriesPerPage
  )

    return (
        <main className="app">
            <header className="header">
                <h1>DISCOVER THE WORLD</h1>
                <p className="intro">
                Find your next destination and discover countries around the world.
                </p>
            </header>

            <section className='search-section'>
                <SearchBar
                    search={search}
                    onSearchChange={(value) => {
                        const newParams = new URLSearchParams(searchParams)

                        if (value) {
                        newParams.set('query', value)
                        } else {
                        newParams.delete('query')
                        }

                        newParams.delete('page')
                        setSearchParams(newParams)
                    }}
                />

                <h2>Explore by region</h2>

                <div className='regions'>
                    {regions.map((region) => (
                        <button 
                          key={region} 
                          type='button' 
                          className={
                            selectedRegion === region 
                            ? 'region active'
                            : 'region'
                            }
                            aria-pressed={selectedRegion === region}
                            onClick={() => {
                                const newParams = new URLSearchParams(searchParams)

                                if (region === 'All') {
                                    newParams.delete('region')
                                } else {
                                    newParams.set('region', region)
                                }

                                newParams.delete('page')
                                setSearchParams(newParams)
                            }}
                        >
                          {region}
                        </button>
                    ))}
                </div>
            </section>

            <section className='countries-section'>
                <h2>Countries to discover</h2>

                {loading && <p>Loading countries...</p>}

                {error && <p role='alert'>{error}</p>}

                {!loading && !error && (
                    <>
                        <p>
                            {search
                            ? `Your search: ${search}`
                            : 'Your next adventure starts here'}
                        </p>

                        <p>Selected region: {selectedRegion}</p>

                        <div className='countries-grid'>
                            {visibleCountries.map((country) =>(
                                <CountryCard
                                  key={country.alpha3Code}
                                  country={country}
                                />
                            ))}
                        </div>

                        {totalPages > 0 && (
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={(page) => {
                                const newParams = new URLSearchParams(searchParams)

                                newParams.set('page', String(page))
                                setSearchParams(newParams)
                                }}
                            />
                        )}

                        {filteredCountries.length === 0 &&(
                            <p>No countries found. Try another search.</p>
                        )}
                    </>
                )}
            </section>
        </main>
    )
}

export default Homepage