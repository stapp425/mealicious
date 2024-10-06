import { doc, getDoc } from "firebase/firestore"
import { formatRecipe, type Recipe } from "./recipe"
import { firestore } from "@/../firebaseConfig"

export type Meal = {
  title: string,
  description?: string,
  tags?: string[],
  time: MealTime,
  contents: MealType[],
  isFavorite?: boolean,
  id?: string
  userId?: string
}

export type MealType = {
  type: string,
  recipe: Recipe
}

export type MealTime = 
  "breakfast" | "brunch" | "lunch" |
  "dinner" | "supper" | "snack" | ""

export function isMeal(value: string | Meal): value is Meal {
  return typeof value !== "string"
}

export const defaultMeal: Meal = {
  title: "",
  description: "",
  tags: [],
  time: "",
  contents: [],
}

export async function formatMeal(meal: string | Meal) {  
  if(typeof meal === "string") {
    try {
      const docRef = doc(firestore, "meals", meal)
      const mealSnapshot = await getDoc(docRef)
      if(mealSnapshot.exists()) {
        const mealData = { ...mealSnapshot.data(), id: mealSnapshot.id } as Meal

        const filteredData: Meal = {
          ...mealData,
          contents: await formatContents(mealData)
        }

        return filteredData
      }
      
      // fall-through case: reference document was not found
      return defaultMeal
    } catch (err: any) {
      console.error(err.message)
    }
  } else if(isMeal(meal)) {
    try {
      const formattedMeal: Meal = {
        ...meal,
        contents: await formatContents(meal)
      }

      return formattedMeal
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return defaultMeal

  async function formatContents(meal: Meal) {
    return await Promise.all(meal.contents.map(async (content) => ({
      type: content.type,
      recipe: await formatRecipe(content.recipe)
    })))
  }
}

export async function formatMeals(meals: Meal[]) {
  return meals.length > 0 ? await Promise.all(meals.map(meal => formatMeal(meal))) : []
}