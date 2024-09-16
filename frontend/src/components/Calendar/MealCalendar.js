import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppContext } from "@/App";
import { useContext, useEffect } from "react";
import Calendar from "./Calendar";
import CreateEvent from "./EventTools/CreateEvent";
import { formatPlans } from "@/types/plan";
import { useFirestoreFetch } from "@/util/hooks";
import { createQuery } from "@/types/app";
import { X } from "lucide-react";
import { formatMeals } from "@/types/meal";
import * as Placeholder from "../Theme/Placeholder";
import RemoveEvent from "./EventTools/RemoveEvent";
const MealCalendar = () => {
    const { user } = useContext(AppContext);
    const { data: plans, setData: setPlans } = useFirestoreFetch(createQuery(user, "plans"), formatPlans);
    const { data: meals } = useFirestoreFetch(createQuery(user, "meals"), formatMeals);
    useEffect(() => {
        document.title = "Meal Calendar | Mealicious";
    }, []);
    return (_jsx("div", { className: "relative min-h-[calc(100vh-150px)] flex flex-col items-start gap-2 bg-orange-100", children: _jsxs("div", { className: "flex flex-col h-[calc(100vh-150px)] min-w-[450px] bg-white px-6 py-4 mx-auto space-y-4", children: [_jsx("h1", { className: "font-bold text-4xl", children: "Meal Calendar" }), plans.length > 0
                    ? _jsx(Calendar, { plans: plans, className: "flex-1" })
                    : _jsxs(Placeholder.Root, { icon: _jsx(X, { size: 64 }), className: "flex-1", children: [_jsx(Placeholder.Message, { children: "No Plans Found!" }), _jsx(Placeholder.Tip, { children: "Try creating a new one!" })] }), _jsxs("div", { className: "flex justify-center items-center gap-8", children: [_jsx(CreateEvent, { meals: meals, setPlans: setPlans }), _jsx(RemoveEvent, { plans: plans, setPlans: setPlans })] })] }) }));
};
export default MealCalendar;
