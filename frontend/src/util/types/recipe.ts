import { doc, getDoc } from "firebase/firestore"
import { firestore } from "@/../firebaseConfig"

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

export type RecipeSort = "favorite" | "title" | "calories" | "time"

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

export function isRecipe(value: string | Recipe): value is Recipe {
  return typeof value !== "string"
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
  instructions: []
}

export async function formatRecipe(recipe: string | Recipe) {
  if(typeof recipe === "string") {
    try {
      const docRef = doc(firestore, "recipes", recipe)
      const recipeSnapshot = await getDoc(docRef)
      
      if(!recipeSnapshot.exists())
        throw new Error()
      
      return { ...recipeSnapshot.data(), id: recipeSnapshot.id } as Recipe
    } catch (err: any) {
      console.warn(`Requested document with id ${recipe} does not exist!`)
      return { ...defaultRecipe, id: recipe }
    }
  } else if(isRecipe(recipe)) {
    return recipe
  }
  
  throw new Error("Unrecognized recipe type found")
}

export async function formatRecipes(recipes: Recipe[]) {
  return await Promise.all(recipes.map(recipe => formatRecipe(recipe)))
}