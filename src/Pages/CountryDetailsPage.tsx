
import { useParams, Link } from 'react-router-dom';
import { useCountries } from '../Hooks/useCountries';
import { useEffect, useState } from 'react';
import { getWeather, type WeatherData } from '../API/weather';
import { getCoordinates } from '../API/geocoding';

function CountryDetailsPage() {
  const { code } = useParams()
  const { countries, loading, error } = useCountries()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState('')
  const country = countries.find(
    (country) => country.alpha3Code.toLowerCase() === code?.toLowerCase()
  )

 useEffect(() => {
  async function loadWeather() {
    const selectedCountry = countries.find(
      (country) => 
        country.alpha3Code.toLowerCase() === code?.toLowerCase()
    )
    
    if (!selectedCountry) return

    try {
      setWeatherLoading(true)
      setWeatherError('')
      setWeather(null)

      let coordinates 
      
      try {
        if (!selectedCountry.capital) {
          throw new Error('Capital not available.')
        }

        coordinates = await getCoordinates(selectedCountry.capital)
      } 
      catch {
        if (selectedCountry.latlng && selectedCountry.latlng.length >= 2) {
          coordinates = {
            latitude: selectedCountry.latlng[0],
            longitude: selectedCountry.latlng[1]
          }
        } 
        else {
          throw new Error('Could not find coordinates for this country.')
        }
      }

      const weatherData = await getWeather(
        coordinates.latitude,
        coordinates.longitude
      )

      setWeather(weatherData)
    } 
    catch (error) {
        console.error('Weather error:', error)
        setWeatherError('Weather information is currently unavailable.')
    }
    finally {
      setWeatherLoading(false)
    }
  }

  if (!loading && !error) {
    loadWeather()
  }
 }, [countries, code, loading, error])

  if (loading) {
    return <p>Loading country...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

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

      <section className='weather-section'>
        <h2>Weather in {country.capital || country.name}</h2>

        {weatherLoading && <p>Loading weather...</p>}

        {weatherError && <p role='alert'>{weatherError}</p>}

        {weather && (
          <div>
            <p>Temperature: {weather.temperature} °C</p>
            <p>Wind speed: {weather.windSpeed} km/h</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default CountryDetailsPage
