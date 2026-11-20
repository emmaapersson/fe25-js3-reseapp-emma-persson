
export interface WeatherData {
  temperature: number
  windSpeed: number
  weatherCode: number
}

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not fetch weather data.')
  }

  const data = await response.json()

  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code
  }
}
