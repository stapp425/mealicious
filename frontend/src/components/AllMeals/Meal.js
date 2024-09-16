import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Recipe from "./Recipe";
import Menu from "./Menu";
const Meal = ({ meal, removeMeal }) => {
    return (_jsxs("fieldset", { className: "relative size-fit border border-orange-500 rounded-md p-6 space-y-2", children: [_jsx("legend", { className: "select-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-lg font-[600] px-6 rounded-full", children: meal.time }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "font-bold text-2xl", children: meal.title }), _jsx(Menu, { meal: meal, removeMeal: removeMeal, id: meal.id })] }), _jsx("div", { className: "flex gap-2", children: meal.tags?.map((tag, index) => _jsx("div", { className: "bg-orange-500 text-white font-[600] text-xs px-2 rounded-full", children: tag }, index)) }), _jsx("p", { className: "text-muted-foreground font-[600]", children: meal.description }), _jsx("div", { className: "flex flex-col gap-4", children: meal.contents.map((content, index) => _jsx(Recipe, { recipe: content.recipe }, index)) })] }));
};
export default Meal;
