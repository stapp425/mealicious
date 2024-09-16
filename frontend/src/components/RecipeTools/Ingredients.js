import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import Field from "./Field";
import Error from "./Error";
import { useInputChange } from "@/util/hooks";
const Ingredients = ({ className, control, setValue, error, setError, clearErrors }) => {
    const { input, isEditActive, setIsEditActive, setInput, handleChange } = useInputChange({
        name: "",
        amount: 1,
        unit: ""
    });
    const ingredients = useWatch({
        control,
        name: "ingredients"
    });
    useEffect(() => {
        if (ingredients.length === 0) {
            setError("ingredients", {
                type: "missing",
                message: "Ingredients must be included for a recipe."
            });
        }
        else
            clearErrors("ingredients");
    }, [ingredients]);
    // "row-start-6 col-start-1 xl:row-start-4"
    return (_jsxs(Field, { className: className, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold after:content-['*'] after:text-red-500", children: "Ingredients" }), _jsx("p", { className: "font-[600] text-muted-foreground", children: "Add ingredients to your recipe here." })] }), isEditActive &&
                        _jsx("button", { type: "button", onClick: () => setIsEditActive(false), className: "text-red-600 hover:text-red-500 transition-colors font-[600]", children: "Cancel" })] }), ingredients.length > 0 &&
                _jsx("div", { className: "flex-1", children: _jsx("div", { className: "grid grid-cols-2 gap-2 my-2", children: ingredients.map((ingredient, index) => (_jsxs("button", { type: "button", onClick: () => setValue("ingredients", [...ingredients.filter(i => i !== ingredient)]), className: "group flex justify-between gap-2 items-center border border-slate-400 p-3 rounded-md hover:bg-red-500 transition-colors odd:last:col-span-2", children: [_jsxs("h1", { className: "font-bold text-xl group-hover:text-white", children: [ingredient.amount, " ", ingredient.unit] }), _jsx("span", { className: "text-xl font-[600] text-muted-foreground group-hover:text-white", children: ingredient.name })] }, index))) }) }), isEditActive
                ? _jsxs("div", { className: "h-fit flex justify-between gap-3", children: [_jsx(Input, { type: "number", name: "amount", min: 1, value: input.amount, placeholder: "Amount", autoComplete: "off", onChange: handleChange, className: "w-1/4" }), _jsxs(Select, { onValueChange: (value) => setInput((i) => ({ ...i, unit: value })), children: [_jsx(SelectTrigger, { className: "w-1/4", children: _jsx(SelectValue, { placeholder: "unit" }) }), _jsxs(SelectContent, { children: [_jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Weight" }), _jsx(SelectItem, { value: "ml", children: "ml" }), _jsx(SelectItem, { value: "l", children: "l" }), _jsx(SelectItem, { value: "mg", children: "mg" }), _jsx(SelectItem, { value: "g", children: "g" }), _jsx(SelectItem, { value: "kg", children: "kg" }), _jsx(SelectItem, { value: "lb", children: "lb" }), _jsx(SelectItem, { value: "oz", children: "oz" })] }), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Dry" }), _jsx(SelectItem, { value: "tsp", children: "tsp" }), _jsx(SelectItem, { value: "tbsp", children: "tbsp" }), _jsx(SelectItem, { value: "cup", children: "cup" }), _jsx(SelectItem, { value: "pc", children: "pc" })] }), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Liquid" }), _jsx(SelectItem, { value: "fl oz", children: "fl oz" }), _jsx(SelectItem, { value: "pt", children: "pt" }), _jsx(SelectItem, { value: "qt", children: "qt" }), _jsx(SelectItem, { value: "gal", children: "gal" })] })] })] }), _jsx(Input, { type: "text", name: "name", value: input.name, placeholder: "Name", autoComplete: "off", onChange: handleChange, className: "flex-1" }), _jsx("button", { type: "button", onClick: () => (input.name && input.amount > 0 && input.unit) && setValue("ingredients", [...ingredients, input]), className: "aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md", children: _jsx(Plus, { size: 18 }) })] })
                : _jsx("button", { type: "button", onClick: () => setIsEditActive(true), className: "group-focus:hidden w-full h-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md", children: _jsx(Plus, { size: 18 }) }), error.ingredients &&
                _jsx(Error, { children: error.ingredients.message })] }));
};
export default Ingredients;
