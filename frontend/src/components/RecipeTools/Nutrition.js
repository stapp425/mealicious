import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useInputChange } from "@/util/hooks";
import { useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useEffect } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Error from "./Error";
const Nutrition = ({ children, control, setValue, error, setError, clearErrors }) => {
    const { input, setInput, isEditActive, setIsEditActive, handleChange } = useInputChange({
        name: "",
        amount: 1,
        unit: ""
    });
    const nutrition = useWatch({
        control,
        name: "nutrition"
    });
    useEffect(() => {
        if (nutrition.length === 0) {
            setError("nutrition", {
                type: "missing",
                message: "Nutrition must be included."
            });
        }
        else
            clearErrors("nutrition");
    }, [nutrition]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h1", { className: "font-bold text-2xl after:content-['*'] after:text-red-500", children: "Nutrition" }), isEditActive &&
                        _jsx("button", { type: "button", onClick: () => setIsEditActive(false), className: "text-red-600 hover:text-red-500 transition-colors font-[600]", children: "Cancel" })] }), isEditActive || nutrition.length > 0
                ? _jsxs(ScrollArea, { className: "flex-1 border border-slate-400 rounded-md", children: [_jsxs("div", { className: "flex flex-col gap-2 p-2", children: [children, nutrition.map((nutrient, index) => (_jsxs("button", { type: "button", onClick: () => setValue("nutrition", [...nutrition.filter((n) => n !== nutrient)]), className: "group w-full flex justify-between items-center px-1 py-3 hover:p-3 hover:bg-red-200 rounded-md transition-all", children: [_jsxs("h1", { className: "text-muted-foreground font-[600]", children: [_jsx("b", { className: "font-[700] text-black text-xl", children: nutrient.name }), " (", nutrient.unit, ")"] }), _jsx("div", { className: "min-w-[75px] font-bold bg-orange-500 group-hover:bg-red-500 text-white px-2 rounded-full", children: nutrient.amount })] }, index))), isEditActive
                                    ? _jsxs("div", { className: "grid grid-rows-2 grid-cols-[repeat(2,_1fr)_max-content] gap-2", children: [_jsx(Input, { type: "text", name: "name", value: input.name, placeholder: "Name", autoComplete: "off", onChange: handleChange, className: "row-start-1 col-start-1 col-span-3" }), _jsx(Input, { type: "number", name: "amount", min: 1, value: input.amount, placeholder: "Amount", autoComplete: "off", onChange: handleChange, className: "row-start-2 col-start-1" }), _jsxs(Select, { onValueChange: (value) => setInput(n => ({ ...n, unit: value })), children: [_jsx(SelectTrigger, { className: "row-start-2 col-start-2", children: _jsx(SelectValue, { placeholder: "unit" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "kcal", children: "kcal" }), _jsx(SelectItem, { value: "g", children: "g" }), _jsx(SelectItem, { value: "mg", children: "mg" }), _jsx(SelectItem, { value: "\u03BCg", children: "\u03BCg" }), _jsx(SelectItem, { value: "%", children: "%" })] })] }), _jsx("button", { type: "button", onClick: () => (input.name && input.unit) && setValue("nutrition", [...nutrition, input]), className: "row-start-2 col-start-3 aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md", children: _jsx(Plus, { size: 18 }) })] })
                                    : _jsx("button", { type: "button", onClick: () => setIsEditActive(true), className: "w-full h-10 flex justify-center items-center text-white bg-orange-500 py-2 rounded-md", children: _jsx(Plus, { size: 18 }) })] }), _jsx(ScrollBar, {})] })
                : _jsxs("button", { type: "button", onClick: () => setIsEditActive(true), className: "flex-1 flex flex-col justify-center items-center p-6 bg-slate-200 text-slate-500 rounded-md hover:bg-slate-300 active:bg-slate-400 active:text-slate-700 transition-colors", children: [_jsx(X, { size: 84 }), _jsx("h1", { className: "text-lg font-bold", children: "No Nutrition Found!" }), _jsx("span", { children: "Click here to add one!" })] }), error.nutrition &&
                _jsx(Error, { children: error.nutrition.message })] }));
};
export default Nutrition;
