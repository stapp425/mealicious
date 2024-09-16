import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AddRecipeButton from "./AddRecipeButton";
const RecipeList = ({ control, setValue, className, contentClassName, setError, clearErrors }) => {
    const recipeList = useWatch({
        control,
        name: "contents"
    });
    function removeContent(content) {
        setValue("contents", recipeList.filter(entry => entry.recipe.id !== content.recipe.id));
    }
    useEffect(() => {
        if (recipeList.length === 0) {
            setError("contents", {
                type: "missing",
                message: "Recipe list must not be empty."
            });
        }
        else
            clearErrors("contents");
    }, [recipeList]);
    return (_jsxs(ScrollArea, { type: "always", className: cn("overflow-hidden max-w-full", className), children: [_jsx("div", { className: cn("flex flex-col gap-2", contentClassName), children: _jsxs(AnimatePresence, { children: [recipeList.map((content, index) => (_jsxs(motion.button, { type: "button", initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0, opacity: 0 }, onClick: () => removeContent(content), className: "flex gap-2 h-[150px] border border-slate-400 hover:border-red-500 hover:bg-red-300 p-3 rounded-md transition-colors", children: [_jsx("img", { src: content.recipe.image, alt: content.recipe.title, className: "h-full rounded-md" }), _jsxs("div", { className: "relative flex-1 h-full", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-left font-bold text-xl line-clamp-1", children: content.recipe.title }), content.recipe.isFavorite && _jsx(Heart, { size: 20, className: "text-rose-500 group-hover:text-white" })] }), _jsx("p", { className: "text-left text-slate-400 text-sm font-[600] line-clamp-3", children: content.recipe.description }), _jsx("h1", { className: "absolute bottom-0 right-0 font-[600] text-white text-sm px-2 bg-orange-500 rounded-md", children: content.type })] })] }, index))), _jsx(AddRecipeButton, {})] }) }), _jsx(ScrollBar, {})] }));
};
export default RecipeList;
