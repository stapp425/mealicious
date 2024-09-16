import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppContext } from "@/App";
import { useContext, useEffect } from "react";
import { useFirestoreDelete, useFirestoreFetch } from "@/util/hooks";
import { createQuery } from "@/types/app";
import { formatMeals } from "@/types/meal";
import { useToast } from "@/components/ui/use-toast";
import Meal from "./Meal";
import Spinner from "@/components/ui/Spinner";
import { X } from "lucide-react";
import Button from "../Theme/Button";
import { Link } from "react-router-dom";
import * as Placeholder from "../Theme/Placeholder";
const AllMeals = () => {
    const { user, screenSizes: { xl } } = useContext(AppContext);
    const { toast } = useToast();
    const { deleteFirestoreDoc } = useFirestoreDelete();
    const { data: fetchedMeals, setData: setMeals, isFetching } = useFirestoreFetch(createQuery(user, "meals"), formatMeals);
    function evenlySplitArray(arr, sections) {
        if (sections <= 0 || sections % 1)
            throw new Error("The number of sections must be a positive integer.");
        if (sections > arr.length)
            return [arr];
        const arrLen = arr.length;
        const arrTemplate = [];
        const interval = Math.round(arrLen / sections);
        let start = 0;
        for (let i = 0; i < sections; i++) {
            const end = start + interval;
            arrTemplate.push(arr.slice(start, end));
            start = end;
        }
        return arrTemplate;
    }
    async function removeMeal(targetMeal) {
        try {
            await deleteFirestoreDoc("meals", targetMeal.id);
            setMeals(meals => meals.filter(m => m.id !== targetMeal.id));
        }
        catch (err) {
            toast({
                title: "Error!",
                description: err.message,
                variant: "destructive"
            });
        }
    }
    useEffect(() => {
        document.title = "All Meals | Mealicious";
    }, []);
    return (_jsx("div", { className: "bg-orange-200 min-h-[calc(100vh-150px)]", children: _jsxs("div", { className: "relative mx-auto size-fit min-h-[calc(100vh-150px)] min-w-[700px] bg-white p-6 shadow-md", children: [_jsx("h1", { className: "font-bold text-5xl mb-8", children: "All Meals" }), _jsx("div", { className: "flex justify-center items-start gap-8", children: !isFetching
                        ? evenlySplitArray(fetchedMeals, xl ? 2 : 1).map((meals, index) => _jsx("div", { className: "w-full flex flex-col gap-8", children: meals.length > 0
                                ? meals.map((meal, index) => _jsx(Meal, { meal: meal, removeMeal: removeMeal }, index))
                                : _jsxs(Placeholder.Root, { icon: _jsx(X, { size: 64 }), children: [_jsx(Placeholder.Message, { children: "No Meals Found!" }), _jsx(Placeholder.Tip, { children: "Try creating a new one!" }), _jsx(Button, { className: "text-sm", children: _jsx(Link, { to: "/meals/create", children: "Create Meal" }) })] }) }, index))
                        : _jsxs("div", { className: "flex-1 flex flex-col justify-center items-center gap-6", children: [_jsx(Spinner, { size: 75 }), _jsx("h1", { className: "font-[600] text-3xl", children: "Loading..." })] }) })] }) }));
};
export default AllMeals;
