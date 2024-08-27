export type Query = {
  query: string
}

export type Nutrition = {
  name: string
  amount: number
  unit: string
}

function isNutrition(value: unknown): value is Nutrition {
  return (
    value != null &&
    typeof value === "object" &&
    "name" in value && typeof value.name === "string" &&
    "amount" in value && typeof value.amount === "number" &&
    "unit" in value && typeof value.unit === "string"
  )
}

export type Ingredient = {
  name: string
  amount: number
  unit: string
}

function isIngredient(value: unknown): value is Ingredient {
  return (
    value != null &&
    typeof value === "object" &&
    "name" in value && typeof value.name === "string" &&
    "amount" in value && typeof value.amount === "number" &&
    "unit" in value && typeof value.unit === "string"
  )
}

export type Serving = {
  amount: number
  unit: string
}

function isServing(value: unknown): value is Serving {
  return (
    value != null &&
    typeof value === "object" &&
    "amount" in value && typeof value.amount === "number" &&
    "unit" in value && typeof value.unit === "string"
  )
}

export type Time = {
  prepTime: number
  cookTime: number
  readyTime: number
}

function isTime(value: unknown): value is Time {
  return (
    value != null &&
    typeof value === "object" &&
    "prepTime" in value && typeof value.prepTime === "number" &&
    "cookTime" in value && typeof value.cookTime === "number" &&
    "readyTime" in value && typeof value.readyTime === "number"
  )
}

export type Diet = 
  "any" | "gluten free" | 
  "ketogenic" | "vegetarian" | 
  "vegan" | "paleo"

// function isDiet(value: unknown): value is Diet {
//   return (
//     value != null &&
//     typeof value === "string" &&
//     ["any", "gluten free", "ketogenic", "vegetarian", "vegan", "paleo"].includes(value)
//   )
// }

export type Dish = 
  "any" | "main dish" | 
  "side dish" | "appetizer" | 
  "dessert" | "drink" | 
  "breakfast" | "lunch" | "dinner"

// function isDish(value: unknown): value is Dish {
//   return (
//     value != null &&
//     typeof value === "string" &&
//     ["any", "main dish", "side dish", "appetizer", "dessert", "drink", "breakfast", "lunch", "dinner"].includes(value)
//   )
// }

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

<<<<<<< HEAD
export function isRecipe(value: unknown): value is Recipe {
  const recipeVal = value as Recipe
  
  return (
    recipeVal != null &&
    typeof recipeVal === "object" &&
    "title" in recipeVal && typeof recipeVal.title === "string" &&
    "image" in recipeVal && typeof recipeVal.image === "string" &&
    "description" in recipeVal && typeof recipeVal.description === "string" &&
    (recipeVal.description === undefined || typeof recipeVal.description === "boolean") &&
    (
      recipeVal.source === undefined || 
      (
        typeof recipeVal.source === "object" &&
        "name" in recipeVal.source && typeof recipeVal.source.name === "string" &&
        "url" in recipeVal.source && typeof recipeVal.source.url === "string"
      )
    ) &&
    (
      recipeVal.diets === undefined || 
      (
        Array.isArray(recipeVal.diets) && recipeVal.diets.every(diet => typeof diet === "string")
      )
    ) &&
    (
      recipeVal.dishTypes === undefined || 
      (
        Array.isArray(recipeVal.dishTypes) && recipeVal.dishTypes.every(dish => typeof dish === "string")
      )
    ) &&
    "times" in recipeVal && isTime(recipeVal.times) &&
    "servingSize" in recipeVal && isServing(recipeVal.servingSize) && 
    "nutrition" in recipeVal && Array.isArray(recipeVal.nutrition) && recipeVal.nutrition.every(n => isNutrition(n)) &&
    "ingredients" in recipeVal && Array.isArray(recipeVal.ingredients) && recipeVal.ingredients.every(i => isIngredient(i)) &&
    "instructions" in recipeVal && Array.isArray(recipeVal.instructions) && recipeVal.instructions.every(i => typeof i === "string") &&
    (recipeVal.id === undefined || typeof recipeVal.id === "string")
  )
=======
export function isRecipe(obj: string | Recipe): obj is Recipe {
  return typeof obj !== "string"
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
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

