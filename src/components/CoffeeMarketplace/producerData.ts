import { type Producer } from './types'

export const producers: Record<string, Producer> = {
  "Yirgacheffe Coffee Farmers Cooperative Union": {
    name: "Yirgacheffe Coffee Farmers Cooperative Union",
    location: {
      country: "Ethiopia",
      region: "Yirgacheffe",
      coordinates: [38.1967, 6.1620], // Yirgacheffe coordinates
      elevation: 1800
    },
    founded: 2002,
    description: "The Yirgacheffe Coffee Farmers Cooperative Union represents over 45,000 coffee farmers in the Yirgacheffe region of Ethiopia. Known for producing some of the world's finest Arabica coffees, their members maintain traditional organic farming practices passed down through generations.",
    farmSize: "Small-holder farms averaging 0.5-2 hectares",
    varieties: [
      "Ethiopian Heirloom",
      "Local Landraces"
    ],
    processes: [
      "Washed",
      "Natural"
    ],
    certifications: [
      "Organic",
      "Fair Trade",
      "Rainforest Alliance"
    ],
    socialImpact: "Provides education and healthcare support to farming families, invests in local infrastructure, and promotes sustainable farming practices.",
    image: "https://images.unsplash.com/photo-1500423079914-b65af272b8db"
  },
  "Familia Rodriguez Estate": {
    name: "Familia Rodriguez Estate",
    location: {
      country: "Colombia",
      region: "Huila",
      coordinates: [-76.0538, 2.5359], // Huila coordinates
      elevation: 1700
    },
    founded: 1985,
    description: "The Rodriguez family has been growing coffee for three generations in the highlands of Huila. Their estate combines traditional knowledge with modern processing techniques to produce exceptional Colombian coffees.",
    farmSize: "85 hectares",
    varieties: [
      "Caturra",
      "Castillo",
      "Colombia"
    ],
    processes: [
      "Washed",
      "Natural",
      "Honey"
    ],
    certifications: [
      "UTZ Certified",
      "Rainforest Alliance"
    ],
    socialImpact: "Provides housing and education for workers' families, implements water conservation programs.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
  },
  "Gayo Farmers Collective": {
    name: "Gayo Farmers Collective",
    location: {
      country: "Indonesia",
      region: "Aceh",
      coordinates: [96.8451, 4.6371], // Aceh coordinates
      elevation: 1250
    },
    founded: 1998,
    description: "The Gayo Farmers Collective brings together small-holder farmers in the Gayo highlands of Aceh, Sumatra. They specialize in traditional wet-hulled processing methods while implementing modern quality control standards.",
    farmSize: "Collective of 2,000+ farmers with 0.5-2 hectares each",
    varieties: [
      "Gayo 1",
      "Gayo 2",
      "TimTim",
      "Bourbon"
    ],
    processes: [
      "Wet Hulled",
      "Washed",
      "Natural"
    ],
    certifications: [
      "Organic",
      "Fair Trade",
      "Protected Geographical Indication"
    ],
    socialImpact: "Supports post-conflict community rebuilding, provides agricultural training, and promotes women's empowerment in coffee farming.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  },
  "Nyungwe Women's Cooperative": {
    name: "Nyungwe Women's Cooperative",
    location: {
      country: "Rwanda",
      region: "Nyungwe",
      coordinates: [29.3833, -2.3333], // Nyungwe coordinates
      elevation: 1700
    },
    founded: 2010,
    description: "The Nyungwe Women's Cooperative is a women-led organization that has revolutionized coffee production in the region. Their focus on quality and sustainability has earned them recognition in the specialty coffee market.",
    farmSize: "Collective of 500+ women farmers with average 1 hectare each",
    varieties: [
      "Red Bourbon",
      "Jackson"
    ],
    processes: [
      "Washed",
      "Natural",
      "Honey"
    ],
    certifications: [
      "Fair Trade",
      "Organic",
      "Women's Coffee Alliance"
    ],
    socialImpact: "Empowers women coffee farmers through training and leadership development, provides microloans for farm improvements.",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31"
  }
}