import { Recipe } from "@/types/recipe";
type Edit = {
    mode: Mode;
    isAddRecipeActive: boolean;
    toggleAddRecipe: () => void;
    fetchedRecipeData: Recipe[];
};
type Mode = "create" | "edit";
type Props = {
    mode: Mode;
};
export declare const MealEditContext: import("react").Context<Edit>;
declare const MealTools: React.FC<Props>;
export default MealTools;
