import { type Recipe } from "./recipe";
export type Meal = {
    title: string;
    description?: string;
    tags?: string[];
    time: MealTime;
    contents: MealType[];
    isFavorite?: boolean;
    id?: string;
    userId?: string;
};
export type MealType = {
    type: string;
    recipe: Recipe;
};
export type MealTime = "breakfast" | "brunch" | "lunch" | "dinner" | "supper" | "snack" | "";
export declare function isMeal(value: string | Meal): value is Meal;
export declare const defaultMeal: Meal;
export declare function formatMeal(meal: string | Meal): Promise<Meal>;
export declare function formatMeals(meals: Meal[]): Promise<Meal[]>;
