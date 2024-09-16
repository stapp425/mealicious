import { doc, getDoc } from "firebase/firestore";
import { formatRecipe } from "./recipe";
import { firestore } from "../../../firebaseConfig";
// function isMealTime(value: unknown): value is MealTime {
//   return (
//     value != null &&
//     typeof value === "string" && 
//     ["breakfast", "brunch", "lunch", "dinner", "supper", "snack", ""].includes(value)
//   )
// }
// function isMealType(value: unknown): value is MealType {
//   return (
//     value != null &&
//     typeof value === "object" &&
//     "type" in value && typeof value.type === "string" &&
//     "recipe" in value && isRecipe(value.recipe)
//   )
// }
// export function isMeal(value: unknown): value is Meal {
//   const mealVal = value as Meal
//   return (
//     mealVal != null &&
//     typeof mealVal === "object" &&
//     "title" in mealVal && typeof mealVal.title === "string" &&
//     (mealVal.description === undefined || typeof mealVal.description === "string") &&
//     (
//       mealVal.tags === undefined || 
//       (
//         Array.isArray(mealVal.tags) && 
//         mealVal.tags.every(tag => typeof tag == "string")
//       )
//     ) &&
//     "time" in mealVal && isMealTime(mealVal.time) &&
//     "contents" in mealVal && isMealType(mealVal.contents) &&
//     (mealVal.isFavorite === undefined || typeof mealVal.isFavorite === "boolean") &&
//     (mealVal.id === undefined || typeof mealVal.id === "string") &&
//     (mealVal.userId === undefined || typeof mealVal.userId === "string")
//   )
// }
export function isMeal(value) {
    return typeof value !== "string";
}
export const defaultMeal = {
    title: "",
    description: "",
    tags: [],
    time: "",
    contents: [],
};
export async function formatMeal(meal) {
    if (typeof meal === "string") {
        try {
            const docRef = doc(firestore, "meals", meal);
            const mealSnapshot = await getDoc(docRef);
            const mealData = { ...mealSnapshot.data(), id: mealSnapshot.id };
            const filteredData = {
                ...mealData,
                contents: await formatContents(mealData)
            };
            return filteredData;
        }
        catch (err) {
            console.error(err.message);
        }
    }
    else if (isMeal(meal)) {
        try {
            const formattedMeal = {
                ...meal,
                contents: await formatContents(meal)
            };
            return formattedMeal;
        }
        catch (err) {
            console.error(err.message);
        }
    }
    throw new Error("Unrecognized meal type found");
    async function formatContents(meal) {
        return await Promise.all(meal.contents.map(async (content) => ({
            type: content.type,
            recipe: await formatRecipe(content.recipe)
        })));
    }
}
export async function formatMeals(meals) {
    return meals.length > 0 ? await Promise.all(meals.map(meal => formatMeal(meal))) : [];
}
// TODO: Fix issues with plan and recipe formatting
