import {useState, useEffect} from 'react'
import { getCountries } from '../API/countries'
import { type Country } from '../Types/country'

export function useCountries() {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadCountries() {
            try {
                setLoading(true)
                setError('')

                const data = await getCountries()
                setCountries(data)            
            } catch {
                console.error('Fel uppstod vid hämtning av länder:', error)
                setError('Kunde inte hämta länder. Försök igen senare.')
            } finally {
                setLoading(false)
            }
        }
        loadCountries()
    }, [])
    return { countries, loading, error }
}