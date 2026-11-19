import type { Country } from "../Types/country"
import { Link } from 'react-router-dom'

interface CountryCardProps {
    country: Country
}

function CountryCard({ country }: CountryCardProps) {
    return (
        <Link
            to={`/country/${country.alpha3Code}`}
            className="country-card-link"
        >
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
        </Link>
    )
}

export default CountryCard