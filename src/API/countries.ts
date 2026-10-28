// Country info
export interface Country {
  alpha3code: string
  name: string
  flag: string
  flags:{
    svg: string
    png: string
  }
  region: string
  capital: string
  latlng: number[]
}
// Fetch countries from API
export async function getCountries(): Promise<Country[]> {
  const response = await fetch('https://countries.dev/countries')

  if (!response.ok) {
    throw new Error('Kunde inte hämta länder.')
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('API:et returnerade ett oväntat format.')
  }

  return data as Country[]
}
