import type { Country } from "../Types/country"

interface CountryCardProps {
    country: Country
}

function CountryCard({ country }: CountryCardProps) {
    return (
        <article className="country-card">
            <img 
              src={country.flags.svg || country.flags.png}
              alt={`Flag of ${country.name}`}
              width='80'              
            />

            <h3>{country.name}</h3>
            <p>Region: {country.region || 'Unknown'}</p>
            <p>Capital: {country.capital || 'Unknown'}</p>
        </article>
    )
}

export default CountryCard