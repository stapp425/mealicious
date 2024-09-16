import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
// import Search from "./Search"
import { defaultRecipe, formatRecipes } from "@/types/recipe";
import Recipe from "./Recipe";
import { nanoid } from "nanoid";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clipboard, Plus, X } from "lucide-react";
import Description from "./Description";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/App";
import { useFirestoreDelete, useFirestoreFetch } from "@/util/hooks";
import { createQuery } from "@/types/app";
import * as Placeholder from "@/components/Theme/Placeholder";
export const ActiveRecipeContext = createContext(defaultRecipe.title);
export default function AllRecipes() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const { data: recipes, isFetching: isRecipesFetching } = useFirestoreFetch(createQuery(user, "recipes"), formatRecipes);
    const { isWorking, deleteFirestoreDoc } = useFirestoreDelete();
    const [activeRecipe, setActiveRecipe] = useState(defaultRecipe);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [sortedRecipes, setSortedRecipes] = useState(recipes);
    function invalidate(recipe) {
        setIsFirstRender(false);
        setActiveRecipe(recipe);
    }
    function sortRecipes(sort) {
        switch (sort) {
            case "favorite":
                setSortedRecipes((d) => [...d.filter((recipe) => recipe.isFavorite), ...d.filter((recipe) => !recipe.isFavorite)]);
                break;
            case "title":
                setSortedRecipes((d) => [...d].sort((a, b) => a.title.localeCompare(b.title)));
                break;
            case "calories":
                setSortedRecipes((d) => [...d].sort((a, b) => a.nutrition[0].amount - b.nutrition[0].amount));
                break;
            case "time":
                setSortedRecipes((d) => [...d].sort((a, b) => a.times.readyTime - b.times.readyTime));
                break;
        }
    }
    async function deleteRecipe(id) {
        try {
            await deleteFirestoreDoc("recipes", id);
            setSortedRecipes(sorted => sorted.filter(s => s.id !== id));
        }
        catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        document.title = "All Recipes | Mealicious";
    }, []);
    useEffect(() => {
        if (recipes.length > 0)
            setSortedRecipes(recipes);
    }, [recipes]);
    console.log(sortedRecipes);
    return (_jsx(ActiveRecipeContext.Provider, { value: activeRecipe.title, children: _jsxs("div", { className: "relative h-[calc(100vh-150px)] grid grid-cols-[33vw_1fr] xl:grid-cols-[1fr_33vw]", children: [_jsxs("div", { className: "overflow-hidden h-[calc(100vh-150px)] flex flex-col border border-r-slate-300", children: [_jsxs("div", { className: "z-20 flex flex-col gap-3 p-4 shadow-scroll-t", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h1", { className: "font-bold text-2xl xl:text-4xl", children: "All Recipes" }), _jsxs(Link, { to: "/recipes/create", className: "flex justify-center items-center gap-2 aspect-square xl:aspect-auto h-full max-h-[50px] xl:w-[175px] xl:px-3 text-white font-[600] bg-orange-500 hover:bg-orange-700 transition rounded-md", children: [_jsx("span", { className: "hidden xl:inline", children: "Add New Recipe" }), _jsx(Plus, { size: 20 })] })] }), _jsx("div", { className: "flex justify-between gap-4 w-full", children: _jsxs(Select, { onValueChange: sortRecipes, children: [_jsx(SelectTrigger, { className: "h-[35px] xl:h-[50px] w-[175px] rounded-full", children: _jsx(SelectValue, { placeholder: "Sort By" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "favorite", children: "Favorite" }), _jsx(SelectItem, { value: "title", children: "Title" }), _jsx(SelectItem, { value: "calories", children: "Calories" }), _jsx(SelectItem, { value: "time", children: "Prep Time" })] })] }) })] }), _jsxs(ScrollArea, { className: "h-full px-4", type: "scroll", children: [_jsxs("div", { className: "w-full grid 2xl:grid-cols-2 gap-6 py-4", children: [isRecipesFetching
                                            ? _jsx(Loading, {})
                                            : sortedRecipes?.map((recipe) => _jsx(Recipe, { recipe: recipe, onChange: invalidate }, nanoid())), recipes.length === 0 &&
                                            _jsxs(Placeholder.Root, { icon: _jsx(X, { size: 48 }), className: "2xl:col-span-2 py-[50px]", children: [_jsx(Placeholder.Message, { children: "No Recipes Found!" }), _jsx(Placeholder.Tip, { children: "Try creating one!" }), _jsx(Placeholder.Action, { onClick: () => navigate("/recipes/create"), className: "text-sm", children: "Create Recipe" })] })] }), _jsx(ScrollBar, {})] })] }), _jsx("div", { className: "h-[calc(100vh-150px)] flex justify-center items-center p-4", children: isFirstRender
                        ? _jsxs("div", { className: "size-full text-slate-500 flex flex-col justify-center items-center gap-3 bg-slate-200 rounded-lg", children: [_jsx(Clipboard, { size: 96 }), _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "font-bold text-xl", children: "Selected Recipes will appear here" }), _jsx("p", { children: "Try selecting one!" })] })] })
                        : _jsx(Description, { activeRecipe: activeRecipe, isDeleting: isWorking, deleteRecipe: deleteRecipe }) })] }) }));
}
