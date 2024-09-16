import { type Recipe } from "@/types/recipe";
type Props = {
    recipe: Recipe;
    onChange: (recipe: Recipe) => void;
};
export default function Recipe({ recipe, onChange }: Props): React.ReactElement;
export {};
