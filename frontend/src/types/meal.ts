import { isRecipe, type Recipe } from "./recipe"


// TODO: FIX STRING UNION
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
  recipe: Recipe
}

export type MealTime = 
  "breakfast" | "brunch" | "lunch" |
  "dinner" | "supper" | "snack" | ""
  
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

// export function formatMeals(meals: Meal[], recipes: Recipe[]): (Meal & { contents: { type: string, recipe: Recipe }[] })[] {
//   return meals.map(meal => ({
//     ...meal,
//     contents: meal.contents.map(content => ({
//       ...content,
//       recipe: isRecipe(content.recipe) ? content.recipe : recipes.find(recipe => content.recipe === recipe.id) as Recipe
//     }))
//   }))
// }