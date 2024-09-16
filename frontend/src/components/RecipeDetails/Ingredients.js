import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import Tip from "./Tip";
const Ingredients = forwardRef(({ className, ingredients }, ref) => {
    return (_jsxs("div", { ref: ref, className: className, children: [_jsxs("div", { className: "flex items-end gap-2 mb-4 text-slate-600", children: [_jsx("h1", { className: "font-bold text-black text-3xl leading-none", children: "Ingredients" }), _jsxs(Tip, { children: ["The list of ingredients ", _jsx("i", { children: "required" }), " to prepare this recipe. Exact measurements are provided for the best results."] })] }), _jsx("div", { className: "flex flex-wrap justify-between gap-3", children: ingredients.map((ingredient, index) => (_jsxs("div", { className: "overflow-hidden flex-1 min-w-[200px] h-[75px] text-nowrap border border-slate-400 py-2 px-3 rounded-md", children: [_jsxs("h1", { className: "text-slate-600 font-[500]", children: [_jsx("b", { className: "font-bold text-black text-lg", children: ingredient.amount }), " ", ingredient.unit] }), _jsx("span", { children: ingredient.name })] }, index))) })] }));
});
export default Ingredients;
