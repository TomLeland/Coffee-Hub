import { type Roaster } from './types'

export const roasters: Record<string, Roaster> = {
  "Artisan Roasters": {
    name: "Artisan Roasters",
    location: "Portland, Oregon",
    founded: 2012,
    description: "Artisan Roasters is a specialty coffee roaster focused on highlighting the unique characteristics of each origin through careful roast development and direct trade relationships. We specialize in Ethiopian and Kenyan coffees, bringing out their vibrant, complex flavors.",
    philosophy: "We believe in letting the coffee speak for itself. Our roasting style emphasizes clarity and sweetness while preserving the distinct flavor notes that make each coffee unique. Through meticulous roast profiling, we aim to highlight the inherent qualities of each bean.",
    roastingStyle: "Light to medium roasts that highlight the coffee's natural sweetness and complexity",
    specialties: [
      "Ethiopian single origins",
      "Kenyan micro-lots",
      "Experimental processing methods",
      "Limited edition releases"
    ],
    certifications: [
      "Organic",
      "Fair Trade",
      "Rainforest Alliance",
      "B Corp Certified"
    ],
    socialImpact: "We reinvest 5% of our profits into farmer education programs and community development projects in our source regions. Our annual scholarship program supports young coffee professionals in East Africa.",
    website: "https://artisanroasters.com",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31"
  },
  "Mountain Peak": {
    name: "Mountain Peak",
    location: "Seattle, Washington",
    founded: 2008,
    description: "Mountain Peak specializes in sourcing and roasting exceptional coffees from Colombia and other South American origins. We focus on building long-term relationships with producers to ensure consistent quality and sustainable practices.",
    philosophy: "We strive to create approachable yet complex coffees that showcase the best of what each origin has to offer. Our commitment to relationship coffee means working directly with producers to develop unique flavor profiles.",
    roastingStyle: "Medium roasts that balance caramel sweetness with origin character",
    specialties: [
      "Colombian single origins",
      "Natural process Brazils",
      "Honey process Costa Rica",
      "Classic espresso blends"
    ],
    certifications: [
      "Fair Trade",
      "USDA Organic",
      "Direct Trade Verified",
      "Smithsonian Bird Friendly"
    ],
    socialImpact: "Direct partnerships with Colombian farming communities, providing technical assistance and pre-harvest financing. We also support local water conservation projects in coffee-growing regions.",
    website: "https://mountainpeak.coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  },
  "Dark Forest Coffee": {
    name: "Dark Forest Coffee",
    location: "Vancouver, Canada",
    founded: 2016,
    description: "Dark Forest Coffee focuses on full-bodied, complex coffees with a particular emphasis on Indonesian and Pacific coffees. We're known for our unique processing methods and bold flavor profiles.",
    philosophy: "We believe in developing deep, rich flavors while maintaining the coffee's inherent character. Our approach combines traditional roasting techniques with modern technology to create distinctive taste experiences.",
    roastingStyle: "Medium-dark to dark roasts that emphasize body and sweetness",
    specialties: [
      "Indonesian single origins",
      "Extended fermentation lots",
      "Double anaerobic process",
      "Signature dark roasts"
    ],
    certifications: [
      "Organic",
      "Fair Trade",
      "Shade Grown",
      "Carbon Neutral"
    ],
    socialImpact: "Supporting reforestation projects in coffee-growing regions through our 'Plant a Tree' program. We also provide solar-powered processing equipment to our partner farms.",
    website: "https://darkforestcoffee.com",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31"
  },
  "Savanna Roasters": {
    name: "Savanna Roasters",
    location: "Austin, Texas",
    founded: 2015,
    description: "Savanna Roasters specializes in African coffees, particularly from Kenya, Ethiopia, and Rwanda. We focus on bringing out the bright, complex flavors these regions are known for through careful sourcing and roasting.",
    philosophy: "Our approach centers on showcasing the incredible diversity of African coffee. We work closely with producers to select exceptional lots that highlight each region's unique characteristics.",
    roastingStyle: "Light to medium-light roasts that emphasize brightness and clarity",
    specialties: [
      "Kenyan AA lots",
      "Ethiopian naturals",
      "Rwandan micro-lots",
      "Competition grade lots"
    ],
    certifications: [
      "Direct Trade",
      "B Corp Certified",
      "Women's Coffee Alliance",
      "1% for the Planet"
    ],
    socialImpact: "Annual scholarship program for young African coffee professionals, supporting the next generation of coffee leaders. We also fund clean water initiatives in coffee-growing communities.",
    website: "https://savannaroasters.com",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
  }
}