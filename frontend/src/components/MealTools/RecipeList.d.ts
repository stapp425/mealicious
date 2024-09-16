import { type Meal } from "@/types/meal";
import { type Obj } from "@/types/app";
import { type RequiredFieldArray } from "@/types/form";
interface Props<T extends Obj> extends RequiredFieldArray<T> {
    contentClassName?: string;
}
declare const RecipeList: React.FC<Props<Meal>>;
export default RecipeList;
