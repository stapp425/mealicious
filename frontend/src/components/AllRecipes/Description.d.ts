import { type Recipe } from "@/types/recipe";
type Props = {
    isDeleting: boolean;
    deleteRecipe: (id: string) => void;
    activeRecipe: Recipe;
};
export default function Description({ isDeleting, activeRecipe, deleteRecipe }: Props): import("react/jsx-runtime").JSX.Element;
export {};
