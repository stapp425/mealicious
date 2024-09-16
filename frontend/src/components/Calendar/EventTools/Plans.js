import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { useWatch } from "react-hook-form";
import { useEffect } from "react";
const Plans = ({ children, className, control, setError, clearErrors, plans, register, ...props }) => {
    const allPlans = useWatch({
        control,
        name: "plans"
    });
    useEffect(() => {
        if (allPlans.every(p => !p.selected)) {
            setError("plans", {
                type: "unselected",
                message: "There are no plans selected."
            });
        }
        else {
            clearErrors("plans");
        }
    }, [allPlans]);
    return (_jsxs("form", { className: className, ...props, children: [_jsx("div", { className: "overflow-y-auto space-y-4 h-[500px]", children: plans.map((plan, index) => _jsx(Plan, { register: register, plan: plan, index: index }, index)) }), children] }));
};
const Plan = ({ plan, register, index }) => {
    const { date, title, description, tags, meals } = plan;
    function clickCheckbox(event) {
        const inputElement = event.currentTarget.querySelector('input[type="checkbox"]');
        inputElement.click();
    }
    return (_jsxs("button", { type: "button", onClick: clickCheckbox, className: "text-left has-[:checked]:bg-red-100 border border-slate-400 has-[:checked]:border-red-500 p-4 rounded-md", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-bold text-2xl", children: title }), _jsx("h2", { className: "font-[600] text-xs", children: format(date, "MMMM dd, yyyy") }), description &&
                        _jsx("p", { className: "font-[600] text-muted-foreground", children: plan.description }), tags &&
                        tags.map((tag, index) => _jsx("div", { className: "bg-orange-500 text-white font-[600] rounded-full", children: tag }, index)), _jsx("div", { className: "space-y-2", children: meals.map((meal, index) => _jsx(Meal, { meal: meal }, index)) })] }), _jsx("input", { type: "checkbox", ...register(`plans.${index}.selected`), className: "peer invisible" })] }));
};
const Meal = ({ meal }) => {
    const { title, description, tags, time, contents } = meal;
    return (_jsxs("div", { className: "[&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-slate-400 [&:not(:last-child)]:pb-3 space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "font-bold text-lg", children: title }), _jsx("h1", { className: "bg-orange-500 text-white font-[600] px-4 rounded-md", children: time })] }), description &&
                _jsx("p", { children: description }), tags &&
                _jsx("div", { className: "flex gap-2", children: tags.map((tag, index) => _jsx("span", { className: "size-fit bg-orange-500 text-white font-[600] text-xs px-4 rounded-full", children: tag }, index)) }), contents.map((content, index) => _jsx(Recipe, { recipe: content.recipe }, index))] }));
};
const Recipe = ({ recipe }) => {
    const { title, image } = recipe;
    return (_jsxs("div", { className: "border border-slate-400 relative overflow-hidden flex items-center rounded-md", children: [_jsx("img", { src: image, alt: title, className: "h-[75px] w-[75px] bg-white" }), _jsx("h1", { className: "font-bold line-clamp-2 px-6", children: title })] }));
};
export default Plans;
