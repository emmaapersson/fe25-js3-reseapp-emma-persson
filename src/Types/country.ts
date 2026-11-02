export interface Country {
  alpha3Code: string
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