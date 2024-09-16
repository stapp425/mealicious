import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { AppContext } from "@/App";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEventCalendar, useFirestoreFetch } from "@/util/hooks";
import { formatPlans } from "@/types/plan";
import { createQuery } from "@/types/app";
import Spinner from "../ui/Spinner";
import * as Placeholder from "../Theme/Placeholder";
const Root = ({ className, children }) => (_jsx("div", { className: cn("flex flex-col gap-2", className), children: children }));
const Header = ({ className, children }) => (_jsx("div", { className: cn("flex justify-between", className), children: children }));
const Date = ({ className, date }) => (_jsxs("div", { className: cn("flex flex-col", className), children: [_jsx("h1", { className: "font-bold text-2xl xl:text-4xl", children: "Today's Meals" }), _jsx("p", { className: "text-sm xl:text-lg text-muted-foreground", children: format(date, "EEEE") }), _jsx("p", { className: "text-sm xl:text-lg text-muted-foreground", children: format(date, "MMMM do, yyyy") })] }));
const OptionContainer = ({ className, children }) => (_jsx("div", { className: cn("flex justify-between items-center gap-2", className), children: children }));
const Option = ({ className, to, label, children }) => (_jsxs("div", { className: cn("group relative group flex flex-col gap-2 items-center", className), children: [_jsx("button", { className: "p-3 text-white bg-orange-500 rounded-full hover:bg-orange-700 hover:scale-[110%] transition", children: _jsx(Link, { to: `/meals/${to}`, children: children }) }), _jsx("p", { className: "text-nowrap absolute -bottom-7 group-last:right-0 opacity-0 group-hover:opacity-100 transition text-sm text-muted-foreground", children: label })] }));
const DailyMeals = ({ className }) => {
    const { user } = useContext(AppContext);
    const { data: plans, isFetching } = useFirestoreFetch(createQuery(user, "plans"), formatPlans);
    const { currentEvents: { day } } = useEventCalendar(plans);
    return (_jsx("div", { className: cn("flex flex-col", className), children: !isFetching
            ? _jsx(Plans, { plans: day })
            : _jsx(Spinner, {}) }));
};
const Plans = ({ className, plans }) => {
    const navigate = useNavigate();
    return (plans.length > 0
        ? _jsx("div", { className: cn("h-full flex gap-3 overflow-x-auto", className), children: plans.map((plan, index) => _jsx(Plan, { plan: plan }, index)) })
        : _jsxs(Placeholder.Root, { icon: _jsx(X, { size: 64 }), className: "size-full", children: [_jsx(Placeholder.Message, { children: "No Plans Found for Today." }), _jsx(Placeholder.Tip, { children: "Try adding one!" }), _jsx(Placeholder.Action, { onClick: () => navigate("/meals/calendar"), className: "text-sm", children: "Go to Event Calendar" })] }));
};
const Plan = ({ className, plan }) => {
    const { title, tags, description, meals } = plan;
    return (_jsxs("div", { className: cn("min-w-[300px] border border-slate-400 p-3 rounded-md text-nowrap", className), children: [_jsx("h1", { className: "font-bold text-xl", children: title }), tags &&
                _jsx("div", { className: "flex flex-wrap items-center gap-2", children: tags.map(tag => _jsx("div", { className: "text-white font-[600] text-xs px-3", children: tag })) }), description &&
                _jsx("p", { className: "text-muted-foreground font-[600] text-sm", children: description }), _jsx(Meals, { meals: meals })] }));
};
const Meals = ({ className, meals }) => (meals.length > 0 &&
    _jsx("div", { className: cn("space-y-2 mt-2", className), children: meals.map((meal, index) => _jsx(Meal, { meal: meal }, index)) }));
const Meal = ({ className, meal }) => (_jsxs("div", { className: cn("border border-slate-400 p-2 rounded-md", className), children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "font-bold", children: meal.title }), _jsx("h1", { className: "text-center min-w-[100px] bg-orange-500 font-[600] text-sm text-white px-3 rounded-md", children: meal.time })] }), _jsx("div", { className: "overflow-hidden flex flex-wrap gap-2 xl:justify-between xl:mt-2", children: meal.contents.map(({ recipe }) => _jsx("img", { src: recipe.image, alt: recipe.title, className: "size-[25px] xl:size-[75px] rounded-md" })) })] }));
export { Root, Header, Date, OptionContainer, Option, DailyMeals };
