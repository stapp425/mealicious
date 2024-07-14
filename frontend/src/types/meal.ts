import { Recipe } from "./recipe"

export type Meal = {
  mainDish: Recipe
  sideDish: Recipe
  beverage: Recipe
  appetizer?: Recipe
  dessert?: Recipe
}