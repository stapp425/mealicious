export type Meal = {
  title: string,
  description: string,
  tags: string[],
  time: MealTime,
  contents: MealType[],
  isFavorite?: boolean,
  id?: string
}

export type MealType = {
  type: string,
  recipe: string
}

export type MealTime = 
  "breakfast" | "brunch" | "lunch" |
  "dinner" | "supper" | "snack" | ""

export const defaultMeal: Meal = {
  title: "",
  description: "",
  tags: [],
  time: "",
  contents: [],
}