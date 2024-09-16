import { type Recipe } from "@/types/recipe";
import { type Layout } from "@/types/app";
type Props = {
    layout?: Layout;
    recipe: Recipe;
};
export default function Recipe({ layout, recipe }: Props): React.ReactElement;
export {};
