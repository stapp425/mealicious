import { isRecipe, type Recipe } from "./recipe"

<<<<<<< HEAD

// TODO: FIX STRING UNION
=======
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
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
<<<<<<< HEAD
  recipe: Recipe
=======
  recipe: string | Recipe
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
}

export type MealTime = 
  "breakfast" | "brunch" | "lunch" |
  "dinner" | "supper" | "snack" | ""
  
<<<<<<< HEAD
function isMealTime(value: unknown): value is MealTime {
  return (
    value != null &&
    typeof value === "string" && 
    ["breakfast", "brunch", "lunch", "dinner", "supper", "snack", ""].includes(value)
  )
}

function isMealType(value: unknown): value is MealType {
  return (
    value != null &&
    typeof value === "object" &&
    "type" in value && typeof value.type === "string" &&
    "recipe" in value && isRecipe(value.recipe)
  )
}

export function isMeal(value: unknown): value is Meal {
  const mealVal = value as Meal
  
  return (
    mealVal != null &&
    typeof mealVal === "object" &&
    "title" in mealVal && typeof mealVal.title === "string" &&
    (mealVal.description === undefined || typeof mealVal.description === "string") &&
    (
      mealVal.tags === undefined || 
      (
        Array.isArray(mealVal.tags) && 
        mealVal.tags.every(tag => typeof tag == "string")
      )
    ) &&
    "time" in mealVal && isMealTime(mealVal.time) &&
    "contents" in mealVal && isMealType(mealVal.contents) &&
    (mealVal.isFavorite === undefined || typeof mealVal.isFavorite === "boolean") &&
    (mealVal.id === undefined || typeof mealVal.id === "string")
  )
=======
export function isMeal(value: string | Meal): value is Meal {
  return typeof value !== "string"
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
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

<<<<<<< HEAD
// export function formatMeals(meals: Meal[], recipes: Recipe[]): (Meal & { contents: { type: string, recipe: Recipe }[] })[] {
//   return meals.map(meal => ({
//     ...meal,
//     contents: meal.contents.map(content => ({
//       ...content,
//       recipe: isRecipe(content.recipe) ? content.recipe : recipes.find(recipe => content.recipe === recipe.id) as Recipe
//     }))
//   }))
// }
=======
export function formatMeals(meals: Meal[], recipes: Recipe[]) {
  return meals.map(meal => ({
    ...meal,
    contents: meal.contents.map(content => ({
      ...content,
      recipe: isRecipe(content.recipe) ? content.recipe : recipes.find(recipe => content.recipe === recipe.id) as Recipe
    }))
  }))
}
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
