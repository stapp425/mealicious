import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import Button from "../../Theme/Button";
import { useWatch } from "react-hook-form";
import { X } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Error from "../Error";
import * as Placeholder from "../../Theme/Placeholder";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
const DragAndDrop = ({ meals, control, setValue, setError, clearErrors, error }) => {
    const [isAllMealsVisible, setIsAllMealsVisible] = useState(false);
    const mealsInput = useWatch({
        control,
        name: "meals"
    });
    function toggleViewMeals() {
        setIsAllMealsVisible(a => !a);
    }
    function removeMeal(meal) {
        setValue("meals", [...mealsInput.filter(m => meal.id !== m.id)]);
    }
    function handleOnDrag(event, data) {
        event.dataTransfer.setData("application/react-node", data);
    }
    function handleOnDragOver(event) {
        event.preventDefault();
    }
    function handleOnDrop(event) {
        const receivedElement = JSON.parse(event.dataTransfer.getData("application/react-node"));
        setValue("meals", [...mealsInput, receivedElement]);
    }
    useEffect(() => {
        if (mealsInput.length === 0) {
            setError("meals", {
                type: "missing",
                message: "At least one meal is required before submitting."
            });
        }
        else {
            clearErrors("meals");
        }
    }, [mealsInput]);
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Label, { className: "space-y-1", children: _jsx("h2", { className: "text-lg after:content-['*'] after:text-red-500", children: "Meals" }) }), _jsx(Button, { type: "button", onClick: toggleViewMeals, className: "text-xs p-2", children: isAllMealsVisible
                            ? "Hide Meals"
                            : "View All Meals" })] }), error.meals &&
                _jsx(Error, { children: error.meals.message }), _jsxs(ScrollArea, { type: "always", onDragOver: handleOnDragOver, onDrop: handleOnDrop, className: "h-[75px] border border-dashed border-slate-500 rounded-md", children: [_jsx("div", { className: "h-full flex flex-wrap items-start gap-2 p-2", children: mealsInput.map((meal, index) => (_jsxs("button", { type: "button", onClick: () => removeMeal(meal), className: "font-[600] text-xs border border-slate-400 flex justify-between items-center gap-2 px-2 py-1 rounded-sm hover:border-red-500 hover:bg-red-100 active:border-red-500 active:bg-red-200 transition-colors", children: [_jsx("h3", { children: meal.title }), _jsx(X, { size: 14 })] }, index))) }), _jsx(ScrollBar, {})] }), isAllMealsVisible &&
                _jsxs(ScrollArea, { type: "always", className: "w-full h-fit", children: [_jsx("div", { className: "h-[175px] flex gap-3", children: meals.length > 0 && meals[0].title
                                ? meals.map((meal, index) => _jsx(DraggableMeal, { onDragStart: handleOnDrag, meal: meal, className: "flex flex-col h-[90%] border border-slate-400 p-3 space-y-1 rounded-sm" }, index))
                                : _jsxs(Placeholder.Root, { icon: _jsx(X, { size: 64 }), className: "w-full", children: [_jsx(Placeholder.Message, { className: "text-lg", children: "No Meals Found!" }), _jsx(Placeholder.Tip, { className: "text-xs", children: "Try creating a new one!" }), _jsx(Button, { className: "text-xs", children: _jsx(Link, { to: "/meals/create", children: "Create Meal" }) })] }) }), _jsx(ScrollBar, { orientation: "horizontal" })] })] }));
};
const DraggableMeal = ({ className, meal, onDragStart }) => (_jsxs("div", { onDragStart: event => onDragStart(event, JSON.stringify(meal)), className: cn("cursor-grab active:cursor-grabbing", className), draggable: true, children: [_jsx("h1", { className: "font-bold text-center", children: meal.title }), _jsxs(ScrollArea, { type: "always", className: "flex-1", children: [_jsx("div", { className: "space-y-1", children: meal.contents.map((content, index) => _jsx(MealContent, { className: "min-w-[150px] text-xs text-center font-[600] bg-orange-100 p-2 rounded-md", children: content.recipe.title }, index)) }), _jsx(ScrollBar, {})] })] }));
const MealContent = ({ className, children }) => (_jsx("p", { className: className, children: children }));
export default DragAndDrop;
