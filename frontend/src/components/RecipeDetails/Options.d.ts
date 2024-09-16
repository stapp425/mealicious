import { type Recipe } from "@/types/recipe";
import * as React from "react";
type Props = {
    className?: string;
    recipe: Recipe;
    content: HTMLDivElement;
    isFavorite: boolean;
    setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
};
declare const Options: React.FC<Props>;
export default Options;
