import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useContext } from "react";
import { AppContext } from "@/App";
import { useForm } from "react-hook-form";
import { defaultMeal, formatMeal } from "@/types/meal";
import { AnimatePresence } from "framer-motion";
import { useFirestoreGet, useFirestoreUpdate } from "@/util/hooks";
import ToolWindow from "./ToolWindow";
import AddWindow from "./AddWindow";
import { useParams } from "react-router-dom";
import { MealEditContext } from "./MealTools";
const EditMeal = () => {
    const { isAddRecipeActive } = useContext(MealEditContext);
    const { mealId } = useParams();
    const { user } = useContext(AppContext);
    const { data: meal } = useFirestoreGet("meals", mealId, formatMeal, defaultMeal);
    const { control, register, handleSubmit, setValue, getValues, reset, setError, clearErrors, formState: { errors } } = useForm({ defaultValues: defaultMeal });
    const { updateFirestoreDoc: updateMeal } = useFirestoreUpdate();
    const submitMeal = async (data) => {
        if (user) {
            const editedData = {
                ...data,
                contents: data.contents.map(content => ({
                    type: content.type,
                    recipe: content.recipe.id
                })),
                userId: user.uid
            };
            updateMeal("meals", mealId, editedData);
        }
    };
    function sendProps() {
        return {
            register, control,
            setValue, reset,
            error: errors,
            setError,
            clearErrors
        };
    }
    useEffect(() => {
        document.title = "Edit Meal | Mealicious";
        function handleUnload(event) {
            event.preventDefault();
        }
        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, []);
    useEffect(() => {
        meal && reset(meal);
    }, [meal]);
    return (_jsxs("form", { onSubmit: handleSubmit(submitMeal), className: "overflow-hidden h-[calc(100vh-150px)] w-screen flex justify-between gap-4", children: [_jsx(ToolWindow, { ...sendProps() }), _jsx(AnimatePresence, { children: isAddRecipeActive && _jsx(AddWindow, { setValue: setValue, getValues: getValues }) })] }));
};
export default EditMeal;
