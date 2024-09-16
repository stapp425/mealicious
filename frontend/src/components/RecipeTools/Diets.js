import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Field from "./Field";
import { Input } from "../ui/input";
import { useInputChange } from "@/util/hooks";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useWatch } from "react-hook-form";
const Diets = ({ className, control, setValue }) => {
    const { input, handleChange } = useInputChange({ diet: "" });
    const diets = useWatch({
        control,
        name: "diets"
    });
    function addDiet(diet) {
        if (diets && diet)
            setValue("diets", [...diets, input.diet]);
    }
    return (_jsxs(Field, { className: className, children: [_jsx("h1", { className: "font-bold text-2xl", children: "Diets" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "relative flex justify-between gap-3 mb-3", children: [_jsx(Input, { type: "text", name: "diet", value: input.diet, onChange: handleChange, placeholder: "Diet...", autoComplete: "off", className: "text-lg py-5" }), _jsx("button", { type: "button", onClick: () => addDiet(input.diet), className: "right-1.5 bg-orange-500 hover:bg-orange-700 text-white font-[600] px-6 rounded-md transition-colors", children: "Add" })] }), diets && diets.length > 0 &&
                        _jsxs(ScrollArea, { children: [_jsx("div", { className: "flex flex-wrap gap-x-1 gap-y-2", children: diets.map((diet, index) => (_jsx("button", { type: "button", onClick: () => setValue("diets", [...diets.filter(d => d !== diet)]), className: "bg-orange-500 text-white text-xs font-[600] min-w-[50px] hover:bg-red-500 hover:text-white px-3 py-1 rounded-full transition-colors", children: diet }, index))) }), _jsx(ScrollBar, {})] })] }), _jsxs("p", { className: "font-[600] text-muted-foreground", children: ["Add some diets to your recipe here. ", _jsx("br", {}), _jsx("i", { className: "text-xs text-slate-300", children: "Examples include vegetarian, paleolithic, etc..." })] })] }));
};
export default Diets;
