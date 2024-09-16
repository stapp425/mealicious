import { type Ingredient } from "@/types/recipe";
type Props = {
    className?: string;
    ingredients: Ingredient[];
};
declare const Ingredients: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLDivElement>>;
export default Ingredients;
