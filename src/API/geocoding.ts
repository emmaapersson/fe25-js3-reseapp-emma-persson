
export interface Coordinates {
  latitude: number
  longitude: number
}

export async function getCoordinates(
  capital: string
): Promise<Coordinates> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(capital)}&count=1&language=en&format=json`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not find capital coordinates.')
  }

  const data = await response.json()

  if (!data.results || data.results.length === 0) {
    throw new Error('No coordinates found for this capital.')
  }

  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude
  }
}
