import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Meal from "./Meal";
const Plan = ({ plan }) => {
    return (_jsxs("div", { className: "border border-slate-400 p-2 rounded-md", children: [_jsx("h3", { className: "font-bold text-xl", children: plan.title }), _jsx("p", { className: "font-[600] text-muted-foreground", children: plan.description }), _jsx("div", { children: plan.meals.map((meal, index) => _jsx(Meal, { meal: meal }, index)) })] }));
};
export default Plan;
