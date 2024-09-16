import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import Button from "../../Theme/Button";
import Plans from "./Plans";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useFirestoreDelete } from "@/util/hooks";
import Spinner from "@/components/ui/Spinner";
import Error from "../Error";
import { useEffect, useState } from "react";
const RemoveEvent = ({ plans, setPlans }) => {
    const { toast } = useToast();
    const { isWorking, deleteFirestoreDoc } = useFirestoreDelete();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { register, handleSubmit, setError, clearErrors, reset, control, formState: { errors } } = useForm({
        defaultValues: {
            plans: plans
        }
    });
    const formProps = { register, setError, control, clearErrors };
    const removePlans = async (data) => {
        try {
            // Remove selected documents from Firestore (backend)
            const selectedPlans = data.plans.filter(p => p.selected);
            const deletePromises = selectedPlans.map(({ id }) => deleteFirestoreDoc("plans", id));
            await Promise.all(deletePromises);
            // Remove selected documents from plans state (frontend)
            const selectedPlanIds = selectedPlans.map(p => p.id);
            setPlans(p => p.filter(({ id }) => !selectedPlanIds.includes(id)));
            setIsDialogOpen(false);
            toast({
                title: "Warning!",
                description: "All selected plans successfully deleted.",
                variant: "theme"
            });
        }
        catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        reset({
            plans: plans.map(p => ({ ...p, selected: false }))
        });
    }, [plans]);
    return (_jsxs(Dialog, { open: isDialogOpen, onOpenChange: (bool) => setIsDialogOpen(bool), children: [_jsx(DialogTrigger, { children: _jsx(Button, { disabled: plans.length <= 0, className: "bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300", children: "Remove Events" }) }), _jsxs(DialogContent, { className: "w-[500px] p-6 space-y-3", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "font-bold text-3xl", children: "Remove Events" }), _jsx(DialogDescription, { className: "font-[600]", children: "Select as many events below to delete. Click \"Remove Event(s)\" when you are finished." })] }), _jsx(Plans, { ...formProps, plans: plans, onSubmit: handleSubmit(removePlans), className: "space-y-3", children: _jsxs(DialogFooter, { className: "flex sm:justify-between items-center", children: [_jsx("div", { children: errors.plans &&
                                        _jsx(Error, { children: errors.plans.message }) }), _jsx(Button, { type: "submit", className: "bg-red-500 hover:bg-red-600 active:bg-red-700", children: isWorking
                                        ? _jsxs(_Fragment, { children: [_jsx(Spinner, {}), "Working on it..."] })
                                        : "Remove Event(s)" })] }) })] })] }));
};
export default RemoveEvent;
