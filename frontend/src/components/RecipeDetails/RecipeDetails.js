import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useFirestoreGet, useScroll } from "@/util/hooks";
import { useParams } from "react-router-dom";
import { defaultRecipe, formatRecipe } from "@/types/recipe";
import { ArrowUp } from "lucide-react";
import Title from "./Title";
import Description from "./Description";
import Nutrition from "./Nutrition";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Options from "./Options";
import Sections from "./Sections";
export default function RecipeDetails() {
    const { y } = useScroll();
    const { recipeId } = useParams();
    const { data } = useFirestoreGet("recipes", recipeId, formatRecipe, defaultRecipe);
    const [isFavorite, setIsFavorite] = useState(false);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const nutritionRef = useRef(null);
    const ingredientsRef = useRef(null);
    const instructionsRef = useRef(null);
    useEffect(() => {
        document.title = `${data.title} | Mealicious`;
        data.isFavorite &&
            setIsFavorite(data.isFavorite);
    }, [data]);
    return (_jsxs("div", { className: "relative flex", children: [_jsxs("div", { className: "sticky top-[150px] left-0 border-r border-r-slate-300 w-1/4 max-w-[300px] h-[calc(100vh-150px)] flex flex-col pt-3", children: [_jsx(Sections, { title: titleRef.current, description: descriptionRef.current, nutrition: nutritionRef.current, ingredients: ingredientsRef.current, instructions: instructionsRef.current }), _jsx(Options, { content: contentRef.current, recipe: data, isFavorite: isFavorite, setIsFavorite: setIsFavorite, className: "px-3" })] }), _jsxs("div", { ref: contentRef, className: "h-min flex-1 flex flex-col *:max-w-[1000px] *:print:p-6 *:print:max-w-none *:print:w-full *:px-6", children: [_jsx(Title, { ref: titleRef, title: data.title, isFavorite: isFavorite, image: data.image, times: data.times, diets: data.diets, dishTypes: data.dishTypes, source: data.source, className: "h-fit flex gap-3 pt-6" }), _jsx(Description, { ref: descriptionRef, description: data.description, className: "pt-6" }), _jsx(Nutrition, { ref: nutritionRef, servingSize: data.servingSize, nutrition: data.nutrition.filter(nutrition => Math.floor(nutrition.amount) > 0), className: "pt-6 break-inside-avoid-page" }), _jsx(Ingredients, { ref: ingredientsRef, ingredients: data.ingredients, className: "pt-6 break-inside-avoid" }), _jsx(Instructions, { ref: instructionsRef, instructions: data.instructions, className: "py-6 break-inside-avoid-page" })] }), _jsx("button", { className: `peer fixed bottom-4 right-4 ${y ? "opacity-100" : "opacity-0 pointer-events-none"} flex justify-center items-center text-white bg-orange-500 hover:bg-orange-700 hover:scale-110 transition-all rounded-full size-14`, onClick: () => scrollTo({ top: 0, behavior: "smooth" }), children: _jsx(ArrowUp, { size: 28 }) })] }));
}
