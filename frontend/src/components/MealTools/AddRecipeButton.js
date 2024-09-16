import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { MealEditContext } from "./MealTools";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
const AddRecipeButton = ({ className }) => {
    const { toggleAddRecipe, isAddRecipeActive } = useContext(MealEditContext);
    return (_jsx("button", { type: "button", onClick: toggleAddRecipe, className: cn(`bg-slate-300 hover:bg-slate-400 active:bg-slate-500
         border-slate-500 hover:border-slate-600 active:border-slate-700
         text-slate-600 hover:text-slate-700 active:text-slate-800
         border border-dashed flex flex-col items-center p-4 rounded-md transition-colors`, className), children: isAddRecipeActive
            ? _jsxs(_Fragment, { children: [_jsx(X, { size: 36 }), _jsx("span", { className: "font-[600]", children: "Cancel" })] })
            : _jsxs(_Fragment, { children: [_jsx(Plus, { size: 36 }), _jsx("span", { className: "font-[600]", children: "Add a Recipe" })] }) }));
};
export default AddRecipeButton;
