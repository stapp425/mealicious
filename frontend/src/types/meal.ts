import { isRecipe, type Recipe } from "./recipe"

export type Meal = {
  title: string,
  description?: string,
  tags?: string[],
  time: MealTime,
  contents: MealType[],
  isFavorite?: boolean,
  id?: string
}

export type MealType = {
  type: string,
  recipe: string | Recipe
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

export function areAllRecipesStrings(meals: Meal[]): boolean {
  return meals.every(meal => 
    meal.contents.every(content => !isRecipe(content.recipe))
  )
}

export function formatMeals(meals: Meal[], recipes: Recipe[]) {
  return meals.map(meal => ({
    ...meal,
    contents: meal.contents.map(content => ({
      ...content,
      recipe: isRecipe(content.recipe) ? content.recipe : recipes.find(recipe => content.recipe === recipe.id) as Recipe
    }))
  }))
}