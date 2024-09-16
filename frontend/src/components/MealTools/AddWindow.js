import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useContext } from "react";
import { MealEditContext } from "./MealTools";
import { defaultRecipe } from "@/types/recipe";
import { animate, motion } from "framer-motion";
import { useInputChange } from "@/util/hooks";
import { Clipboard, Clock, Heart, Microwave, MoveLeft, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import * as Placeholder from "@/components/Theme/Placeholder";
import { useNavigate } from "react-router-dom";
const AddWindow = ({ setValue, getValues }) => {
    const navigate = useNavigate();
    const { fetchedRecipeData } = useContext(MealEditContext);
    const [selectedRecipe, setSelectedRecipe] = useState(defaultRecipe);
    const [isRecipeSelected, setIsRecipeSelected] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const { input, handleChange } = useInputChange({ type: "" });
    const addWindow = useRef(null);
    useEffect(() => {
        if (addWindow.current && !isFirstRender) {
            animate(addWindow.current, { x: isRecipeSelected ? [0, "-50%"] : ["-50%", 0] }, { duration: 0.25, ease: "easeInOut" });
        }
    }, [isRecipeSelected]);
    return (_jsx(motion.div, { initial: { x: "100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 }, transition: { type: "just", duration: 0.25 }, className: "overflow-y-auto overflow-x-hidden border border-orange-400 w-[425px] rounded-l-2xl", children: _jsxs("div", { ref: addWindow, className: "w-[200%] h-full flex", children: [_jsx("div", { className: "w-1/2 flex flex-col gap-2 px-4 pt-4", children: !isRecipeSelected &&
                        _jsxs(_Fragment, { children: [_jsx("h1", { className: "text-left font-bold text-3xl bg-white", children: "Saved Recipes" }), _jsxs(ScrollArea, { className: "flex-1", children: [_jsx("div", { className: "space-y-2 pb-4", children: fetchedRecipeData.length > 0
                                                ? fetchedRecipeData.map((recipe, index) => (_jsxs("button", { onClick: () => {
                                                        setIsRecipeSelected(true);
                                                        setIsFirstRender(false);
                                                        setSelectedRecipe(recipe);
                                                    }, type: "button", className: "group border border-slate-300 min-h-[100px] w-full flex justify-between gap-3 items-start hover:bg-orange-500 hover:border-orange-500 transition-colors p-3 rounded-md", children: [_jsx("img", { src: recipe.image, alt: recipe.title, className: "h-[100px] bg-white rounded-sm" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h1", { className: "font-[600] group-hover:text-white truncate max-w-[175px] text-nowrap", children: recipe.title }), recipe.isFavorite && _jsx(Heart, { size: 18, className: "text-rose-500 group-hover:text-white" })] }), _jsx("p", { className: "line-clamp-3 text-left text-sm font-[600] text-muted-foreground group-hover:text-white", children: recipe.description })] })] }, index)))
                                                : _jsxs(Placeholder.Root, { icon: _jsx(X, { size: 20 }), children: [_jsx(Placeholder.Message, { children: "No Recipes Found!" }), _jsx(Placeholder.Tip, { children: "Try Creating One!" }), _jsx(Placeholder.Action, { onClick: () => navigate("/recipes/create"), className: "text-sm", children: "Create Recipe" })] }) }), _jsx(ScrollBar, {})] })] }) }), _jsx("div", { className: "w-1/2 p-4", children: isRecipeSelected &&
                        _jsx(_Fragment, { children: _jsxs("div", { className: "h-full flex flex-col gap-3", children: [_jsxs("button", { type: "button", onClick: () => {
                                            setIsRecipeSelected(false);
                                            setSelectedRecipe(defaultRecipe);
                                        }, className: "flex items-center gap-2 w-fit bg-orange-500 text-sm text-white px-3 py-2 rounded-sm font-[600] hover:bg-orange-700 active:bg-orange-800 transition-colors", children: [_jsx(MoveLeft, { size: 16 }), "Back to Recipes"] }), _jsx("img", { src: selectedRecipe.image, alt: selectedRecipe.title }), _jsx("h1", { className: "text-center font-bold text-lg", children: selectedRecipe.title }), _jsxs("div", { className: "flex justify-between gap-2", children: [_jsxs("div", { className: "flex-1 flex justify-between items-center text-lg bg-orange-500 text-white p-3 rounded-sm", children: [_jsx(Clock, {}), _jsx("div", { className: "flex gap-2", children: _jsxs("h1", { children: [_jsx("b", { children: selectedRecipe.times.readyTime }), " mins"] }) })] }), _jsxs("div", { className: "flex-1 flex justify-between items-center text-lg bg-orange-500 text-white p-3 rounded-sm", children: [_jsx(Microwave, {}), _jsx("div", { className: "flex gap-2", children: _jsxs("h1", { children: [_jsx("b", { children: selectedRecipe.times.cookTime }), " mins"] }) })] }), _jsxs("div", { className: "flex-1 flex justify-between items-center text-lg bg-orange-500 text-white p-3 rounded-sm", children: [_jsx(Clipboard, {}), _jsx("div", { className: "flex gap-2", children: _jsxs("h1", { children: [_jsx("b", { children: selectedRecipe.times.prepTime }), " mins"] }) })] })] }), _jsx("div", { className: "flex-1 flex flex-wrap justify-between gap-2", children: selectedRecipe.ingredients.slice(0, 4).map((ingredient, index) => (_jsxs("div", { className: "flex-1 border border-slate-400 rounded-md min-w-[100px] p-2", children: [_jsxs("h1", { className: "font-bold text-sm", children: [ingredient.amount, " ", ingredient.unit] }), _jsx("span", { className: "font-[600] text-sm text-muted-foreground", children: ingredient.name })] }, index))) }), _jsxs("div", { className: "flex justify-between gap-3", children: [_jsx(Input, { name: "type", value: input.type, onChange: handleChange, placeholder: "Type...", autoComplete: "off", className: "flex-1" }), _jsx("button", { onClick: () => { input.type && setValue("contents", [...getValues("contents"), { type: input.type, recipe: selectedRecipe }]); }, type: "button", className: "size-10 flex justify-center items-center bg-orange-500 rounded-md hover:bg-orange-700 active:bg-orange-800 transition-colors", children: _jsx(Plus, { size: 18, className: "text-white" }) })] })] }) }) })] }) }));
};
export default AddWindow;
