import { type Coffee } from './types'

// Helper function to generate variations of coffee names
function generateCoffeeName(base: string, variation: string) {
  return `${base} - ${variation}`
}

// Base coffees with variations for each roaster
const artisanRoastersCoffees: Coffee[] = [
  {
    name: generateCoffeeName("Ethiopian Yirgacheffe", "Lot 412"),
    roaster: "Artisan Roasters",
    producer: "Yirgacheffe Coffee Farmers Cooperative Union",
    origin: "Yirgacheffe, Ethiopia",
    price: 18.99,
    notes: ["Jasmine", "Lemon", "Honey"],
    rating: 4.8,
    characteristics: {
      acidity: 0.8,
      sweetness: 0.7,
      bitterness: 0.3
    },
    body: "Light",
    mouthfeel: ["Silky", "Juicy"],
    process: "Washed"
  },
  {
    name: generateCoffeeName("Ethiopian Yirgacheffe", "Natural Process"),
    roaster: "Artisan Roasters",
    producer: "Yirgacheffe Coffee Farmers Cooperative Union",
    origin: "Yirgacheffe, Ethiopia",
    price: 19.99,
    notes: ["Blueberry", "Honey", "Lavender"],
    rating: 4.9,
    characteristics: {
      acidity: 0.7,
      sweetness: 0.9,
      bitterness: 0.2
    },
    body: "Medium",
    mouthfeel: ["Syrupy", "Juicy"],
    process: "Natural"
  },
  {
    name: generateCoffeeName("Kenya Nyeri", "AA"),
    roaster: "Artisan Roasters",
    producer: "Nyeri Hill Estate",
    origin: "Nyeri, Kenya",
    price: 22.99,
    notes: ["Blackberry", "Orange", "BrownSugar"],
    rating: 4.7,
    characteristics: {
      acidity: 0.9,
      sweetness: 0.6,
      bitterness: 0.4
    },
    body: "Full",
    mouthfeel: ["Juicy"],
    process: "Washed"
  },
  {
    name: generateCoffeeName("Kenya Nyeri", "Peaberry"),
    roaster: "Artisan Roasters",
    producer: "Nyeri Hill Estate",
    origin: "Nyeri, Kenya",
    price: 24.99,
    notes: ["Cranberry", "Lime", "Honey"],
    rating: 4.6,
    characteristics: {
      acidity: 0.9,
      sweetness: 0.7,
      bitterness: 0.3
    },
    body: "Medium",
    mouthfeel: ["Silky", "Juicy"],
    process: "Washed"
  },
  {
    name: generateCoffeeName("Ethiopian Sidama", "Natural"),
    roaster: "Artisan Roasters",
    producer: "Sidama Coffee Farmers Cooperative",
    origin: "Sidama, Ethiopia",
    price: 20.99,
    notes: ["Strawberry", "Vanilla", "Rose"],
    rating: 4.5,
    characteristics: {
      acidity: 0.7,
      sweetness: 0.8,
      bitterness: 0.3
    },
    body: "Medium",
    mouthfeel: ["Creamy", "Juicy"],
    process: "Natural"
  }
]

const mountainPeakCoffees: Coffee[] = [
  {
    name: generateCoffeeName("Colombian Supremo", "Reserve"),
    roaster: "Mountain Peak",
    producer: "Familia Rodriguez Estate",
    origin: "Huila, Colombia",
    price: 16.99,
    notes: ["DarkChocolate", "Walnut", "Caramel"],
    rating: 4.5,
    characteristics: {
      acidity: 0.5,
      sweetness: 0.8,
      bitterness: 0.4
    },
    body: "Medium",
    mouthfeel: ["Creamy", "Syrupy"],
    process: "Washed"
  },
  {
    name: generateCoffeeName("Colombian Supremo", "Natural Process"),
    roaster: "Mountain Peak",
    producer: "Familia Rodriguez Estate",
    origin: "Huila, Colombia",
    price: 18.99,
    notes: ["Cherry", "Vanilla", "MilkChocolate"],
    rating: 4.6,
    characteristics: {
      acidity: 0.6,
      sweetness: 0.8,
      bitterness: 0.3
    },
    body: "Full",
    mouthfeel: ["Syrupy"],
    process: "Natural"
  },
  {
    name: generateCoffeeName("Brazil Santos", "Premium"),
    roaster: "Mountain Peak",
    producer: "Fazenda Santa Ines",
    origin: "Santos, Brazil",
    price: 17.99,
    notes: ["Hazelnut", "Caramel", "MilkChocolate"],
    rating: 4.3,
    characteristics: {
      acidity: 0.4,
      sweetness: 0.7,
      bitterness: 0.5
    },
    body: "Medium",
    mouthfeel: ["Creamy"],
    process: "Natural"
  },
  {
    name: generateCoffeeName("Costa Rica Tarrazu", "Honey Process"),
    roaster: "Mountain Peak",
    producer: "Coopetarrazu R.L.",
    origin: "Tarrazu, Costa Rica",
    price: 20.99,
    notes: ["Honey", "Almond", "Orange"],
    rating: 4.7,
    characteristics: {
      acidity: 0.7,
      sweetness: 0.8,
      bitterness: 0.3
    },
    body: "Medium",
    mouthfeel: ["Syrupy", "Silky"],
    process: "Honey"
  },
  {
    name: generateCoffeeName("Peru Organic", "High Altitude"),
    roaster: "Mountain Peak",
    producer: "Valle del Santuario",
    origin: "Cajamarca, Peru",
    price: 19.99,
    notes: ["Cocoa", "BrownSugar", "Apple"],
    rating: 4.4,
    characteristics: {
      acidity: 0.6,
      sweetness: 0.7,
      bitterness: 0.4
    },
    body: "Medium",
    mouthfeel: ["Silky"],
    process: "Washed"
  }
]

const darkForestCoffees: Coffee[] = [
  {
    name: generateCoffeeName("Sumatra Mandheling", "Grade 1"),
    roaster: "Dark Forest Coffee",
    producer: "Gayo Farmers Collective",
    origin: "Sumatra, Indonesia",
    price: 21.99,
    notes: ["Cedar", "DarkChocolate", "Clove"],
    rating: 4.7,
    characteristics: {
      acidity: 0.3,
      sweetness: 0.5,
      bitterness: 0.7
    },
    body: "Full",
    mouthfeel: ["Syrupy", "Creamy"],
    process: "Wet Hulled"
  },
  {
    name: generateCoffeeName("Sumatra Mandheling", "Double Processed"),
    roaster: "Dark Forest Coffee",
    producer: "Gayo Farmers Collective",
    origin: "Sumatra, Indonesia",
    price: 23.99,
    notes: ["Tobacco", "Leather", "DarkChocolate"],
    rating: 4.8,
    characteristics: {
      acidity: 0.2,
      sweetness: 0.6,
      bitterness: 0.8
    },
    body: "Full",
    mouthfeel: ["Syrupy"],
    process: "Wet Hulled"
  },
  {
    name: generateCoffeeName("Papua New Guinea", "Sigri Estate"),
    roaster: "Dark Forest Coffee",
    producer: "Sigri Estate",
    origin: "Western Highlands, PNG",
    price: 20.99,
    notes: ["Molasses", "Wood", "Spices"],
    rating: 4.5,
    characteristics: {
      acidity: 0.4,
      sweetness: 0.6,
      bitterness: 0.6
    },
    body: "Full",
    mouthfeel: ["Creamy", "Syrupy"],
    process: "Washed"
  },
  {
    name: generateCoffeeName("Sulawesi Toraja", "Sapan Village"),
    roaster: "Dark Forest Coffee",
    producer: "Toraja Cooperative",
    origin: "Sulawesi, Indonesia",
    price: 22.99,
    notes: ["Cocoa", "Cedar", "BrownSugar"],
    rating: 4.6,
    characteristics: {
      acidity: 0.3,
      sweetness: 0.7,
      bitterness: 0.6
    },
    body: "Full",
    mouthfeel: ["Syrupy"],
    process: "Wet Hulled"
  },
  {
    name: generateCoffeeName("Java Estate", "Old Brown"),
    roaster: "Dark Forest Coffee",
    producer: "Jampit Estate",
    origin: "East Java, Indonesia",
    price: 21.99,
    notes: ["Mocha", "Walnut", "Spices"],
    rating: 4.4,
    characteristics: {
      acidity: 0.4,
      sweetness: 0.5,
      bitterness: 0.7
    },
    body: "Full",
    mouthfeel: ["Creamy", "Syrupy"],
    process: "Washed"
  }
]

const savannaRoastersCoffees: Coffee[] = [
  {
    name: generateCoffeeName("Rwanda Nyungwe", "Red Bourbon"),
    roaster: "Savanna Roasters",
    producer: "Nyungwe Women's Cooperative",
    origin: "Nyungwe, Rwanda",
    price: 23.99,
    notes: ["Blackberry", "Lavender", "BrownSugar"],
    rating: 4.8,
    characteristics: {
      acidity: 0.8,
      sweetness: 0.7,
      bitterness: 0.4
    },
    body: "Medium",
    mouthfeel: ["Juicy", "Silky"],
    process: "Washed"
  },
  {
    name: generateCoffeeName("Ethiopia Guji", "Natural"),
    roaster: "Savanna Roasters",
    producer: "Guji Highland Farm",
    origin: "Guji, Ethiopia",
    price: 21.99,
    notes: ["Blueberry", "Jasmine", "Honey"],
    rating: 4.9,
    characteristics: {
      acidity: 0.7,
      sweetness: 0.9,
      bitterness: 0.2
    },
    body: "Medium",
    mouthfeel: ["Syrupy", "Juicy"],
    process: "Natural"
  },
  {
    name: generateCoffeeName("Kenya Kirinyaga", "AA Plus"),
    roaster: "Savanna Roasters",
    producer: "Kirinyaga Coffee Growers",
    origin: "Kirinyaga, Kenya",
    price: 24.99,
    notes: ["Raspberry", "Orange", "BrownSugar"],
    rating: 4.7,
    characteristics: {
      acidity: 0.9,
      sweetness: 0.6,
      bitterness: 0.3
    },
    body: "Full",
    mouthfeel: ["Juicy"],
    process: "Washed"
  },
  {
    name: generateCoffeeName("Burundi Kayanza", "Bourbon"),
    roaster: "Savanna Roasters",
    producer: "Kayanza Washing Station",
    origin: "Kayanza, Burundi",
    price: 22.99,
    notes: ["Cherry", "Honey", "Tea"],
    rating: 4.6,
    characteristics: {
      acidity: 0.8,
      sweetness: 0.7,
      bitterness: 0.4
    },
    body: "Medium",
    mouthfeel: ["Silky", "Juicy"],
    process: "Washed"
  },
  {
    name: generateCoffeeName("Tanzania Kilimanjaro", "Peaberry"),
    roaster: "Savanna Roasters",
    producer: "KNCU Cooperative",
    origin: "Kilimanjaro, Tanzania",
    price: 23.99,
    notes: ["BlackPepper", "Citrus", "Cocoa"],
    rating: 4.5,
    characteristics: {
      acidity: 0.7,
      sweetness: 0.6,
      bitterness: 0.5
    },
    body: "Medium",
    mouthfeel: ["Creamy", "Juicy"],
    process: "Washed"
  }
]

// Combine all coffees
export const coffees: Coffee[] = [
  ...artisanRoastersCoffees,
  ...mountainPeakCoffees,
  ...darkForestCoffees,
  ...savannaRoastersCoffees
]