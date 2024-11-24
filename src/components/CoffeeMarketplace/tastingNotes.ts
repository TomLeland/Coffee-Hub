import {
  Cherry,
  Citrus,
  Apple,
  Palmtree,
  Grape,
  Cookie,
  Coffee,
  Flower2,
  Sprout,
  Mountain,
  Flame,
  CircleDot,
  Soup,
  type LucideIcon
} from 'lucide-react'

export const categoryIcons: Record<string, LucideIcon> = {
  Berries: Cherry,
  Citrus: Citrus,
  "Stone Fruits": Apple,
  "Tropical Fruits": Palmtree,
  "Other Fruits": Grape,
  Nuts: Cookie,
  Chocolate: Coffee,
  Floral: Flower2,
  Herbal: Sprout,
  Earthy: Mountain,
  Spices: Soup,
  Sweet: Cookie,
  Roasted: Flame,
  Other: CircleDot
};

export const categoryGradients = {
  Berries: ["#8E2B4A", "#4A1B36"],           // Deep Burgundy to Dark Berry
  Citrus: ["#FFA344", "#FFD23F"],            // Vibrant Orange to Sunshine Yellow
  "Stone Fruits": ["#FFB894", "#FFDBC1"],    // Soft Peach to Delicate Flesh
  "Tropical Fruits": ["#FF6B6B", "#FF9F9F"],  // Exotic Pink to Tropical Sunset
  "Other Fruits": ["#7CAB9B", "#A4C7BB"],     // Using Herbal tones for fruits
  Nuts: ["#B67C4F", "#DEB99F"],              // Rich Almond to Light Cashew
  Chocolate: ["#3A2523", "#5C3D36"],         // Dark Cacao to Rich Mocha
  Floral: ["#FFB5C2", "#FED7E0"],           // Soft Rose to Petal Pink
  Herbal: ["#7CAB9B", "#A4C7BB"],           // Fresh Sage to Soft Herb
  Earthy: ["#6B4423", "#8B6B4F"],           // Deep Earth to Rich Soil
  Spices: ["#D35400", "#E67E22"],           // Warm Paprika to Saffron
  Sweet: ["#DAA520", "#F4C430"],            // Golden Caramel to Honey Gold
  Roasted: ["#3C3C3C", "#6D5843"],          // Charcoal to Roasted Umber
  Other: ["#862B47", "#F5EFE7"]             // Deep Ruby to Pure Cream
};

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

export const tastingNotes: Record<string, TastingNote> = {
  // Fruity Notes
  // Berries
  Blueberry: { category: "Berries", gradient: categoryGradients.Berries },
  Raspberry: { category: "Berries", gradient: categoryGradients.Berries },
  Strawberry: { category: "Berries", gradient: categoryGradients.Berries },
  Blackberry: { category: "Berries", gradient: categoryGradients.Berries },
  Cranberry: { category: "Berries", gradient: categoryGradients.Berries },

  // Citrus
  Lemon: { category: "Citrus", gradient: categoryGradients.Citrus },
  Lime: { category: "Citrus", gradient: categoryGradients.Citrus },
  Orange: { category: "Citrus", gradient: categoryGradients.Citrus },
  Grapefruit: { category: "Citrus", gradient: categoryGradients.Citrus },
  Tangerine: { category: "Citrus", gradient: categoryGradients.Citrus },

  // Stone Fruits
  Peach: { category: "Stone Fruits", gradient: categoryGradients["Stone Fruits"] },
  Apricot: { category: "Stone Fruits", gradient: categoryGradients["Stone Fruits"] },
  Cherry: { category: "Stone Fruits", gradient: categoryGradients["Stone Fruits"] },
  Plum: { category: "Stone Fruits", gradient: categoryGradients["Stone Fruits"] },

  // Tropical Fruits
  Mango: { category: "Tropical Fruits", gradient: categoryGradients["Tropical Fruits"] },
  Pineapple: { category: "Tropical Fruits", gradient: categoryGradients["Tropical Fruits"] },
  Coconut: { category: "Tropical Fruits", gradient: categoryGradients["Tropical Fruits"] },
  Papaya: { category: "Tropical Fruits", gradient: categoryGradients["Tropical Fruits"] },
  PassionFruit: { category: "Tropical Fruits", gradient: categoryGradients["Tropical Fruits"] },

  // Other Fruits
  Apple: { category: "Other Fruits", gradient: categoryGradients["Other Fruits"] },
  Pear: { category: "Other Fruits", gradient: categoryGradients["Other Fruits"] },
  Grape: { category: "Other Fruits", gradient: categoryGradients["Other Fruits"] },
  Fig: { category: "Other Fruits", gradient: categoryGradients["Other Fruits"] },
  Raisin: { category: "Other Fruits", gradient: categoryGradients["Other Fruits"] },

  // Nutty and Chocolatey Notes
  Almond: { category: "Nuts", gradient: categoryGradients.Nuts },
  Hazelnut: { category: "Nuts", gradient: categoryGradients.Nuts },
  Walnut: { category: "Nuts", gradient: categoryGradients.Nuts },
  Peanut: { category: "Nuts", gradient: categoryGradients.Nuts },
  Macadamia: { category: "Nuts", gradient: categoryGradients.Nuts },

  MilkChocolate: { category: "Chocolate", gradient: categoryGradients.Chocolate },
  DarkChocolate: { category: "Chocolate", gradient: categoryGradients.Chocolate },
  Cocoa: { category: "Chocolate", gradient: categoryGradients.Chocolate },
  Mocha: { category: "Chocolate", gradient: categoryGradients.Chocolate },

  // Floral and Herbal Notes
  Jasmine: { category: "Floral", gradient: categoryGradients.Floral },
  Rose: { category: "Floral", gradient: categoryGradients.Floral },
  Lavender: { category: "Floral", gradient: categoryGradients.Floral },
  OrangeBlossom: { category: "Floral", gradient: categoryGradients.Floral },
  Geranium: { category: "Floral", gradient: categoryGradients.Floral },

  Sage: { category: "Herbal", gradient: categoryGradients.Herbal },
  Mint: { category: "Herbal", gradient: categoryGradients.Herbal },
  Chamomile: { category: "Herbal", gradient: categoryGradients.Herbal },
  Thyme: { category: "Herbal", gradient: categoryGradients.Herbal },
  Rosemary: { category: "Herbal", gradient: categoryGradients.Herbal },

  // Earthy and Spicy Notes
  Soil: { category: "Earthy", gradient: categoryGradients.Earthy },
  Mushroom: { category: "Earthy", gradient: categoryGradients.Earthy },
  Moss: { category: "Earthy", gradient: categoryGradients.Earthy },
  Wood: { category: "Earthy", gradient: categoryGradients.Earthy },
  Tobacco: { category: "Earthy", gradient: categoryGradients.Earthy },

  Cinnamon: { category: "Spices", gradient: categoryGradients.Spices },
  Clove: { category: "Spices", gradient: categoryGradients.Spices },
  Nutmeg: { category: "Spices", gradient: categoryGradients.Spices },
  BlackPepper: { category: "Spices", gradient: categoryGradients.Spices },
  Cardamom: { category: "Spices", gradient: categoryGradients.Spices },

  // Sweet Notes
  Caramel: { category: "Sweet", gradient: categoryGradients.Sweet },
  Honey: { category: "Sweet", gradient: categoryGradients.Sweet },
  BrownSugar: { category: "Sweet", gradient: categoryGradients.Sweet },
  Molasses: { category: "Sweet", gradient: categoryGradients.Sweet },
  Vanilla: { category: "Sweet", gradient: categoryGradients.Sweet },
  Toffee: { category: "Sweet", gradient: categoryGradients.Sweet },
  MapleSyrup: { category: "Sweet", gradient: categoryGradients.Sweet },

  // Roasted Notes
  ToastedNuts: { category: "Roasted", gradient: categoryGradients.Roasted },
  RoastedGrains: { category: "Roasted", gradient: categoryGradients.Roasted },
  Smoke: { category: "Roasted", gradient: categoryGradients.Roasted },
  Ash: { category: "Roasted", gradient: categoryGradients.Roasted },
  BurntSugar: { category: "Roasted", gradient: categoryGradients.Roasted },

  // Other Notes
  Leather: { category: "Other", gradient: categoryGradients.Other },
  Cedar: { category: "Other", gradient: categoryGradients.Other },
  TeaLike: { category: "Other", gradient: categoryGradients.Other },
  WineLike: { category: "Other", gradient: categoryGradients.Other },
  Malt: { category: "Other", gradient: categoryGradients.Other },
  Butter: { category: "Other", gradient: categoryGradients.Other },
  Cream: { category: "Other", gradient: categoryGradients.Other }
};