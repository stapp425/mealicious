import { type RequiredFieldArray } from "@/types/form";
import { type Nutrition, type Recipe } from "@/types/recipe";
interface NutritionProps extends RequiredFieldArray<Recipe> {
    children: React.ReactNode;
}
declare const Nutrition: React.FC<NutritionProps>;
export default Nutrition;
