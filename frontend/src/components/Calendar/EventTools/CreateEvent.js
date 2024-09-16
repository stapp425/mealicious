import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { startOfWeek, addDays, addMonths, format, parse, } from "date-fns";
import { Input } from "../../ui/input";
import { useFirestorePost } from "@/util/hooks";
import { AppContext } from "@/App";
import { now } from "@/util/hooks";
import { Timestamp } from "firebase/firestore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import Button from "../../Theme/Button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/ui/Spinner";
import Error from "../Error";
import DragAndDrop from "./DragAndDrop";
import { defaultPlan } from "@/types/plan";
import { useToast } from "@/components/ui/use-toast";
const dateFormat = "yyyy-MM-dd";
const minDate = startOfWeek(addDays(now, 7), { weekStartsOn: 1 }); // Monday of the following week
const maxDate = startOfWeek(addMonths(minDate, 2), { weekStartsOn: 0 }); // Sunday 2 months in the future
const CreateEvent = ({ meals, setPlans }) => {
    const { toast } = useToast();
    const { user } = useContext(AppContext);
    const [date, setDate] = useState(minDate);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, setValue, setError, clearErrors, reset, control, formState: { errors, isSubmitting } } = useForm({ defaultValues: defaultPlan });
    const { addFirestoreDoc } = useFirestorePost();
    const submitEvent = async (data) => {
        if (user) {
            try {
                const addedPlan = await addFirestoreDoc("plans", {
                    ...data,
                    date: Timestamp.fromDate(data.date),
                    meals: data.meals.map(meal => meal.id),
                    userId: user.uid
                });
                setPlans(s => [...s, { ...data, id: addedPlan.id }]);
                reset(defaultPlan);
                setIsDialogOpen(false);
            }
            catch (err) {
                toast({
                    title: "Error!",
                    description: "Failed to add plan.",
                    variant: "destructive"
                });
            }
        }
    };
    function handleChange(event) {
        setDate(parse(event.target.value, dateFormat, new Date()));
    }
    function handleKeyDown(event) {
        if (!/Tab|F[0-9]+/.test(event.key))
            event.preventDefault();
    }
    useEffect(() => {
        setValue("date", date);
    }, [date]);
    return (_jsxs(Dialog, { open: isDialogOpen, onOpenChange: (bool) => setIsDialogOpen(bool), children: [_jsx(DialogTrigger, { children: _jsx(Button, { children: "Create an Event" }) }), _jsxs(DialogContent, { className: "w-[500px] p-6", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "font-bold text-3xl", children: "Create an Event" }), _jsx(DialogDescription, { className: "font-[600]", children: "Add a meal to your calendar here! Click \"Submit Event\" when you are finished." })] }), _jsxs("form", { onSubmit: handleSubmit(submitEvent), className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center gap-2 *:flex-1", children: [_jsxs(Label, { className: "space-y-1", children: [_jsx("h2", { className: "text-lg after:content-['*'] after:text-red-500", children: "Date" }), _jsx(Input, { type: "date", value: format(date, dateFormat), min: format(minDate, dateFormat), max: format(maxDate, dateFormat), onKeyDown: handleKeyDown, onChange: handleChange })] }), _jsxs(Label, { className: "space-y-1", children: [_jsx("h2", { className: "text-lg after:content-['*'] after:text-red-500", children: "Title" }), _jsx(Input, { type: "text", ...register("title", {
                                                    required: "A title is required before submitting."
                                                }), placeholder: "Title..." })] })] }), errors.title &&
                                _jsx(Error, { children: errors.title.message }), _jsxs(Label, { className: "space-y-1", children: [_jsx("h2", { className: "text-lg after:content-['_(optional)'] after:text-xs after:text-muted-foreground", children: "Description" }), _jsx(Textarea, { ...register("description"), placeholder: "Description..." })] }), _jsx(DragAndDrop, { meals: meals, control: control, setValue: setValue, error: errors, setError: setError, clearErrors: clearErrors }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", className: "bg-orange-500 text-white rounded-sm p-2 font-[600]", children: isSubmitting ? _jsx(Spinner, {}) : "Submit Event" }) })] })] })] }));
};
export default CreateEvent;
