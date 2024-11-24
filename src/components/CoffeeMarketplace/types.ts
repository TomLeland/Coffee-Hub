export type Coffee = {
  name: string
  roaster: string
  producer: string
  origin: string
  price: number
  notes: string[]
  rating: number
  characteristics: {
    acidity: number
    sweetness: number
    bitterness: number
  }
  body: "Light" | "Medium" | "Full"
  mouthfeel: ("Syrupy" | "Creamy" | "Silky" | "Juicy")[]
  process: "Washed" | "Natural" | "Honey" | "Anaerobic" | "Wet Hulled"
}

export type TastingNote = {
  category: 
    | "Berries"
    | "Citrus"
    | "Stone Fruits"
    | "Tropical Fruits"
    | "Other Fruits"
    | "Nuts"
    | "Chocolate"
    | "Floral"
    | "Herbal"
    | "Earthy"
    | "Spices"
    | "Sweet"
    | "Roasted"
    | "Other"
  gradient: [string, string]
}

export type Roaster = {
  name: string
  location: string
  founded: number
  description: string
  philosophy: string
  roastingStyle: string
  specialties: string[]
  certifications: string[]
  socialImpact?: string
  website: string
  image: string
}

export type Producer = {
  name: string
  location: {
    country: string
    region: string
    coordinates: [number, number] // [longitude, latitude]
    elevation: number
  }
  founded: number
  description: string
  farmSize: string
  varieties: string[]
  processes: string[]
  certifications: string[]
  socialImpact?: string
  image: string
}