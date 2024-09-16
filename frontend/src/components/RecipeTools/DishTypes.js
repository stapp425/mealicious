import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useInputChange } from "@/util/hooks";
import { useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Field from "./Field";
const DishTypes = ({ className, control, setValue }) => {
    const { input, handleChange } = useInputChange({ dishType: "" });
    const dishTypes = useWatch({
        control,
        name: "dishTypes"
    });
    function addDishType(dishType) {
        if (dishTypes && dishType)
            setValue("dishTypes", [...dishTypes, input.dishType]);
    }
    return (_jsxs(Field, { className: className, children: [_jsx("h1", { className: "font-bold text-2xl", children: "Dish Types" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "relative flex justify-between gap-3 mb-3", children: [_jsx(Input, { type: "text", name: "dishType", value: input.dishType, onChange: handleChange, placeholder: "Dish Type...", autoComplete: "off", className: "text-lg py-5" }), _jsx("button", { type: "button", onClick: () => addDishType(input.dishType), className: "right-1.5 bg-orange-500 hover:bg-orange-700 text-white font-[600] px-6 rounded-md transition-colors", children: "Add" })] }), dishTypes && dishTypes.length > 0 &&
                        _jsxs(ScrollArea, { children: [_jsx("div", { className: "grid grid-cols-2 gap-3", children: dishTypes.map((dish, index) => (_jsx("button", { type: "button", onClick: () => setValue("dishTypes", [...dishTypes.filter(d => d !== dish)]), className: "bg-orange-500 text-white font-[600] hover:bg-red-500 hover:text-white p-2 rounded-md odd:last:col-span-2 transition-colors", children: dish }, index))) }), _jsx(ScrollBar, {})] })] }), _jsxs("p", { className: "font-[600] text-muted-foreground mt-2", children: ["Add some dish types to your recipe here. ", _jsx("br", {}), _jsx("i", { className: "text-xs text-slate-300 font-[600]", children: "Examples include breakfast, lunch, dinner, main course, side, etc..." })] })] }));
};
export default DishTypes;
