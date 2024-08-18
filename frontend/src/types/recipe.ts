export type Query = {
  query: string
}

export type Nutrition = {
  name: string
  amount: number
  unit: string
}

export type Ingredient = {
  name: string
  amount: number
  unit: string
}

export type Serving = {
  amount: number
  unit: string
}

export type Time = {
  prepTime: number
  cookTime: number
  readyTime: number
}

export type Diet = 
  "any" | "gluten free" | 
  "ketogenic" | "vegetarian" | 
  "vegan" | "paleo"

export type Dish = 
  "any" | "main dish" | 
  "side dish" | "appetizer" | 
  "dessert" | "drink" | 
  "breakfast" | "lunch" | "dinner"

export type RecipeQuery = {
  query: string,
  cuisine?: string,
  diet?: Diet,
  dish?: Dish,
  minCalories?: number,
  maxCalories?: number,
  minCarbs?: number,
  maxCarbs?: number,
  minProtein?: number,
  maxProtein?: number,
  minFat?: number,
  maxFat?: number,
  minCholesterol?: number,
  maxCholesterol?: number,
  minSodium?: number,
  maxSodium?: number,
  minSugar?: number,
  maxSugar?: number
}

export type RecipeSort = "favorite" | "title" | "calories" | "time"

export const defaultQueryValues: RecipeQuery = {
  query: "",
  cuisine: "",
  diet: "any",
  dish: "any",
  minCalories: 100,
  maxCalories: 1000,
  minProtein: 0,
  maxProtein: 20,
  minCarbs: 0,
  maxCarbs: 100,
  minFat: 0,
  maxFat: 100,
  minCholesterol: 0,
  maxCholesterol: 250,
  minSodium: 0,
  maxSodium: 2000,
  minSugar: 0,
  maxSugar: 100
}

export type Recipe = {
  title: string
  image: string
  description: string
  isFavorite?: boolean
  source?: {
    name: string
    url: string
  }
  diets?: string[]
  dishTypes?: string[]
  times: Time
  servingSize: Serving
  nutrition: Nutrition[]
  ingredients: Ingredient[]
  instructions: string[]
  id?: string
}

export function isRecipe(obj: string | Recipe): obj is Recipe {
  return typeof obj !== "string"
}

export const defaultRecipe: Recipe = {
  image: "",
  title: "",
  description: "",
  times: {
    prepTime: 0,
    cookTime: 0,
    readyTime: 0
  },
  servingSize: {
    amount: 1,
    unit: ""
  },
  diets: [],
  dishTypes: [],
  nutrition: [],
  ingredients: [],
  instructions: [],
  id: ""
}

