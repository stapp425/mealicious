import { Recipe } from "@/types/recipe";
type Props = {
    recipe: Recipe;
    matches: boolean;
};
export default function Details({ recipe, matches }: Props): React.ReactElement;
export {};
