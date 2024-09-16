import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import Tip from "./Tip";
const Nutrition = forwardRef(({ className, servingSize, nutrition }, ref) => {
    const [count, setCount] = useState(1);
    function increment() {
        setCount(c => c + 1);
    }
    function decrement() {
        count > 1 && setCount(c => c - 1);
    }
    return (_jsxs("div", { ref: ref, className: className, children: [_jsxs("div", { className: "flex items-end gap-2 mb-2 text-slate-600", children: [_jsx("h1", { className: "font-bold text-black text-3xl leading-none", children: "Nutrition" }), _jsx(Tip, { children: "Contains all nutrients contributing to one's daily needs, including macronutrients such as calories, carbohydrates, and fats." })] }), _jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsxs("h1", { className: "text-lg", children: [_jsx("b", { children: "Serving Size" }), ": ", servingSize.amount, " ", servingSize.unit] }), _jsxs("div", { className: "flex overflow-hidden border border-slate-400 rounded-md *:aspect-square *:w-8", children: [_jsx("button", { onClick: decrement, className: "flex justify-center items-center border-r border-r-slate-400 hover:bg-orange-500 active:bg-orange-700 hover:text-white transition-colors", children: _jsx(Minus, { size: 18 }) }), _jsx("span", { className: "flex justify-center items-center border-r border-r-slate-400", children: count }), _jsx("button", { onClick: increment, className: "flex justify-center items-center aspect-square hover:bg-orange-500 active:bg-orange-700 hover:text-white transition-colors", children: _jsx(Plus, { size: 18 }) })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-4 border border-slate-400 p-4 rounded-lg", children: nutrition.map((nutrient, index) => (_jsxs("div", { className: "flex justify-between odd:last:w-full", children: [_jsxs("div", { children: [_jsx("span", { className: "font-[500]", children: nutrient.name }), _jsxs("span", { className: "text-sm text-muted-foreground font-[300]", children: [" (", nutrient.unit, ")"] })] }), _jsx("span", { className: "bg-orange-500 min-w-[65px] px-3 font-[600] text-white text-center rounded-full", children: Math.round(nutrient.amount) * count })] }, index))) })] }));
});
export default Nutrition;
