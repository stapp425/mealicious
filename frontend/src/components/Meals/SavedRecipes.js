import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { SquareArrowUpRight, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Recipe from "./Recipe";
import { useFirestoreFetch } from "@/util/hooks";
import { formatRecipes } from "@/types/recipe";
import { createQuery } from "@/types/app";
import { useContext } from "react";
import { AppContext } from "@/App";
import * as Placeholder from "@/components/Theme/Placeholder";
export default function SavedRecipes() {
    const { user } = useContext(AppContext);
    const { data: recipes } = useFirestoreFetch(createQuery(user, "recipes", { limit: 2 }), formatRecipes);
    return (_jsxs("div", { className: "row-start-3 col-span-2 xl:row-start-2 xl:col-start-3 xl:col-span-1 overflow-hidden flex flex-row xl:flex-col justify-between gap-6", children: [_jsxs("div", { className: "flex flex-col gap-2 h-full xl:h-36 w-44 xl:w-full", children: [_jsx("h1", { className: "text-2xl font-bold xl:text-center", children: "Saved Recipes" }), _jsx("button", { className: "flex-1", children: _jsxs(Link, { to: "/recipes", className: "h-full group text-white py-3 w-full flex flex-col justify-center items-center bg-orange-500 gap-2 rounded-md hover:bg-orange-700", children: [_jsx(SquareArrowUpRight, {}), _jsx(Separator, { className: "w-[75%] group-hover:w-[90%] transition-all" }), _jsx("span", { className: "font-[550]", children: "See All Recipes" })] }) })] }), _jsx("div", { className: "flex-1 flex flex-row xl:flex-col gap-6", children: recipes.length > 0
                    ? recipes.slice(0, 2).map((recipe, index) => _jsx(Recipe, { recipe: recipe }, index))
                    : _jsxs(Placeholder.Root, { icon: _jsx(X, { size: 48 }), className: "w-full", children: [_jsx(Placeholder.Message, { children: "No Recipes Found!" }), _jsx(Placeholder.Tip, { children: "Try creating some!" })] }) })] }));
}
