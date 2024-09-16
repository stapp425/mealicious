import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { MealEditContext } from "./MealTools";
import { useForm } from "react-hook-form";
import { defaultMeal } from "@/types/meal";
import { AnimatePresence } from "framer-motion";
import { useFirestorePost } from "@/util/hooks";
import { AppContext } from "@/App";
import { useToast } from "@/components/ui/use-toast";
import ToolWindow from "./ToolWindow";
import AddWindow from "./AddWindow";
const CreateMeal = () => {
    const { toast } = useToast();
    const { isAddRecipeActive } = useContext(MealEditContext);
    const { user } = useContext(AppContext);
    const { control, register, handleSubmit, setValue, getValues, reset, setError, clearErrors, formState: { errors } } = useForm({ defaultValues: defaultMeal });
    const { addFirestoreDoc: addMeal } = useFirestorePost();
    const submitMeal = async (data) => {
        if (user) {
            try {
                const addedData = {
                    ...data,
                    contents: data.contents.map(({ type, recipe }) => ({
                        type,
                        recipe: recipe.id
                    })),
                    userId: user.uid
                };
                await addMeal("meals", addedData);
            }
            catch (err) {
                toast({
                    title: "Error!",
                    description: err.message,
                    variant: "destructive"
                });
            }
        }
    };
    function sendProps() {
        return {
            register, control,
            setValue, reset,
            error: errors,
            setError, clearErrors
        };
    }
    useEffect(() => {
        document.title = "Create Meal | Mealicious";
    }, []);
    return (_jsxs("form", { onSubmit: handleSubmit(submitMeal), className: "overflow-hidden h-[calc(100vh-150px)] w-screen flex justify-between gap-4", children: [_jsx(ToolWindow, { ...sendProps() }), _jsx(AnimatePresence, { children: isAddRecipeActive && _jsx(AddWindow, { setValue: setValue, getValues: getValues }) })] }));
};
export default CreateMeal;
