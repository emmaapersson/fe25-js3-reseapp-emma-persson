
import { useParams, Link } from 'react-router-dom'
import { useCountries } from '../Hooks/useCountries'

function CountryDetailsPage() {
  const { code } = useParams()
  const { countries, loading, error } = useCountries()

  if (loading) {
    return <p>Loading country...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  const country = countries.find(
    (country) => country.alpha3Code.toLowerCase() === code?.toLowerCase()
  )

  if (!country) {
    return (
      <main>
        <h1>Country not found</h1>
        <Link to="/">Back to countries</Link>
      </main>
    )
  }

  return (
    <main className="app">
      <Link to="/">← Back to countries</Link>

      <h1>{country.name}</h1>

      <img
        src={country.flags.svg || country.flags.png}
        alt={`Flag of ${country.name}`}
        width="120"
      />

      <p>Region: {country.region || 'Unknown'}</p>
      <p>Capital: {country.capital || 'Unknown'}</p>
    </main>
  )
}

export default CountryDetailsPage
