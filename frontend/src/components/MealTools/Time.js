import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import Button from "../Theme/Button";
import { MealEditContext } from "./MealTools";
const Time = ({ className, setValue, control, setError, clearErrors }) => {
    const { mode } = useContext(MealEditContext);
    const mealTime = useWatch({
        control,
        name: "time"
    });
    useEffect(() => {
        if (!mealTime) {
            setError("time", {
                type: "missing",
                message: "The meal type must be included."
            });
        }
        else
            clearErrors("time");
    }, [mealTime]);
    return (_jsxs("div", { className: cn("flex justify-between", className), children: [_jsxs(Select, { defaultValue: mealTime, onValueChange: value => setValue("time", value), children: [_jsx(SelectTrigger, { className: "w-[150px]", children: _jsx(SelectValue, { placeholder: mealTime }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { children: [_jsx(SelectItem, { value: "breakfast", children: "Breakfast" }), _jsx(SelectItem, { value: "brunch", children: "Brunch" }), _jsx(SelectItem, { value: "lunch", children: "Lunch" }), _jsx(SelectItem, { value: "dinner", children: "Dinner" }), _jsx(SelectItem, { value: "supper", children: "Supper" }), _jsx(SelectItem, { value: "snack", children: "Snack" })] }) })] }), _jsxs(Button, { children: [mode === "create" && "Create Meal", mode === "edit" && "Update Meal"] })] }));
};
export default Time;
