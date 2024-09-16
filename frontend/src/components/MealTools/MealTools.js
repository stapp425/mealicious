import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "@/App";
import { defaultRecipe, formatRecipes } from "@/types/recipe";
import CreateMeal from "./CreateMeal";
import EditMeal from "./EditMeal";
import { useFirestoreFetch } from "@/util/hooks";
import { createQuery } from "@/types/app";
export const MealEditContext = createContext({
    mode: "create",
    isAddRecipeActive: false,
    toggleAddRecipe: () => undefined,
    fetchedRecipeData: [defaultRecipe],
});
const MealTools = ({ mode }) => {
    const { user } = useContext(AppContext);
    const { data: recipes } = useFirestoreFetch(createQuery(user, "recipes"), formatRecipes);
    const [isAddRecipeActive, setIsAddRecipeActive] = useState(false);
    const context = {
        mode,
        isAddRecipeActive,
        toggleAddRecipe,
        fetchedRecipeData: recipes
    };
    function toggleAddRecipe() {
        setIsAddRecipeActive(a => !a);
    }
    useEffect(() => {
        function handleUnload(event) {
            event.preventDefault();
        }
        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, []);
    return (_jsxs(MealEditContext.Provider, { value: context, children: [mode === "create" && _jsx(CreateMeal, {}), mode === "edit" && _jsx(EditMeal, {})] }));
};
export default MealTools;
