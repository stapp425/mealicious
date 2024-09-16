export type Query = {
    query: string;
};
export type Nutrition = {
    name: string;
    amount: number;
    unit: string;
};
export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
};
export type Serving = {
    amount: number;
    unit: string;
};
export type Time = {
    prepTime: number;
    cookTime: number;
    readyTime: number;
};
export type Diet = "any" | "gluten free" | "ketogenic" | "vegetarian" | "vegan" | "paleo";
export type Dish = "any" | "main dish" | "side dish" | "appetizer" | "dessert" | "drink" | "breakfast" | "lunch" | "dinner";
export type RecipeQuery = {
    query: string;
    cuisine?: string;
    diet?: Diet;
    dish?: Dish;
    minCalories?: number;
    maxCalories?: number;
    minCarbs?: number;
    maxCarbs?: number;
    minProtein?: number;
    maxProtein?: number;
    minFat?: number;
    maxFat?: number;
    minCholesterol?: number;
    maxCholesterol?: number;
    minSodium?: number;
    maxSodium?: number;
    minSugar?: number;
    maxSugar?: number;
};
export type RecipeSort = "favorite" | "title" | "calories" | "time";
export declare const defaultQueryValues: RecipeQuery;
export type Recipe = {
    title: string;
    image: string;
    description: string;
    isFavorite?: boolean;
    source?: {
        name: string;
        url: string;
    };
    diets?: string[];
    dishTypes?: string[];
    times: Time;
    servingSize: Serving;
    nutrition: Nutrition[];
    ingredients: Ingredient[];
    instructions: string[];
    id?: string;
};
export declare function isRecipe(value: string | Recipe): value is Recipe;
export declare const defaultRecipe: Recipe;
export declare function formatRecipe(recipe: string | Recipe): Promise<Recipe>;
export declare function formatRecipes(recipes: Recipe[]): Promise<Recipe[]>;
