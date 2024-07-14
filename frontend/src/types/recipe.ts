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

export type InstructionIngredient = {
  name: string
  image: string
}

export type Instruction = {
  number: number,
  step: string
  ingredients: InstructionIngredient[]
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

export type RecipeSort = "title" | "calories" | "time"

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
  source?: {
    name: string
    url: string
  }
  diets: string[]
  dishTypes: string[]
  isHealthy: boolean
  times: {
    prepTime: number
    cookTime: number
    readyTime: number
  }
  servingSize: {
    amount: number,
    unit: string
  }
  nutrition: Nutrition[]
  ingredients: Ingredient[]
  instructions: Instruction[]
  id?: string
}

export const defaultRecipe: Recipe[] = [{
  title: "",
  image: "",
  description: "",
  source: {
    name: "",
    url: ""
  },
  diets: [],
  dishTypes: [],
  isHealthy: false,
  times: {
    prepTime: 0,
    cookTime: 0,
    readyTime: 0
  },
  servingSize: {
    amount: 0,
    unit: ""
  },
  nutrition: [],
  ingredients: [],
  instructions: []
}]