import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
export const defaultQueryValues = {
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
};
export function isRecipe(value) {
    return typeof value !== "string";
}
export const defaultRecipe = {
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
};
export async function formatRecipe(recipe) {
    if (typeof recipe === "string")
        try {
            const docRef = doc(firestore, "recipes", recipe);
            const recipeSnapshot = await getDoc(docRef);
            const filteredRecipe = { ...recipeSnapshot.data(), id: recipeSnapshot.id };
            return filteredRecipe;
        }
        catch (err) {
            throw err;
        }
    else if (isRecipe(recipe))
        return recipe;
    throw new Error("Unrecognized recipe type found");
}
export async function formatRecipes(recipes) {
    return await Promise.all(recipes.map(recipe => formatRecipe(recipe)));
}
