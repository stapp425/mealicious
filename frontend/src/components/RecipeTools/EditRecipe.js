import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useRef, useState } from "react";
import { useFirestoreGet, useFirestoreUpdate, useStorageDelete, useStorageUpload } from "@/util/hooks";
import { defaultRecipe, formatRecipe } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";
import { AppContext } from "@/App";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import Title from "./Title";
import Description from "./Description";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Diets from "./Diets";
import DishTypes from "./DishTypes";
import Times from "./Times";
import Image from "./Image";
import Serving from "./Serving";
import Nutrition from "./Nutrition";
// TODO: Fix image issues
const EditRecipe = () => {
    const { toast } = useToast();
    const { user } = useContext(AppContext);
    const { recipeId } = useParams();
    const { data } = useFirestoreGet("recipes", recipeId, formatRecipe, defaultRecipe);
    const [image, setImage] = useState({
        file: undefined,
        name: "",
        type: "",
        url: ""
    });
    const { updateFirestoreDoc } = useFirestoreUpdate();
    const { uploadFile } = useStorageUpload();
    const { deleteFile } = useStorageDelete();
    const { register, handleSubmit, setValue, setError, clearErrors, reset, control, formState: { errors, isSubmitting, } } = useForm({ defaultValues: defaultRecipe });
    const originalImageURL = useRef("");
    const submitRecipe = async (data) => {
        if (user) {
            try {
                let imageRef;
                if (image.file) {
                    imageRef = await uploadFile(image.file, `${image.name}-${nanoid()}`);
                    if (originalImageURL.current.includes("firebasestorage") && originalImageURL.current !== imageRef)
                        await deleteFile(getImageNameFromURL(originalImageURL.current));
                }
                else {
                    imageRef = image.url;
                }
                const editedRecipe = {
                    ...data,
                    image: imageRef,
                    userId: user.uid
                };
                await updateFirestoreDoc("recipes", recipeId, editedRecipe);
                toast({
                    title: "Success",
                    description: "Recipe successfully updated!",
                    variant: "success"
                });
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
    function getImageNameFromURL(url) {
        const decodedURL = decodeURIComponent(url);
        const splitURL = decodedURL.split("/o/");
        const imageName = splitURL[1].split("?");
        return imageName[0];
    }
    useEffect(() => {
        document.title = "Edit Recipe | Mealicious";
    }, []);
    useEffect(() => {
        if (data) {
            reset(data);
            setImage(i => ({
                ...i,
                url: data.image
            }));
            originalImageURL.current = data.image;
        }
    }, [data]);
    return (_jsxs("form", { onSubmit: handleSubmit(submitRecipe), className: "relative min-h-[calc(100vh-150px)] grid grid-cols-[350px_1fr]", children: [_jsxs("div", { className: "overflow-hidden h-[calc(100vh-150px)] sticky top-[150px] flex flex-col justify-between gap-3 p-4 bg-white border-r border-r-slate-300", children: [_jsx(Image, { name: "image", register: register, error: errors, setValue: setValue, image: image, setImage: setImage }), _jsx(Nutrition, { control: control, setError: setError, clearErrors: clearErrors, error: errors, setValue: setValue, children: _jsx(Serving, { className: "p-2", name: "servingSize", register: register, error: errors }) }), _jsx("button", { disabled: isSubmitting, type: "submit", className: "font-[600] text-xl text-white py-2 bg-orange-500 rounded-md disabled:cursor-not-allowed", children: isSubmitting ? "Working on it..." : "Update Recipe" })] }), _jsxs("div", { className: "grid grid-rows-[repeat(6,max-content)] grid-cols-1 xl:grid-rows-[repeat(4,_max-content)] xl:grid-cols-2 gap-3 p-3 *:border *:border-orange-300 *:p-4 *:rounded-md", children: [_jsx(Title, { className: "row-start-1 col-start-1", name: "title", register: register, error: errors }), _jsx(Times, { className: "row-start-2", register: register, error: errors }), _jsx(Description, { className: "flex-1 row-start-3 col-start-1 xl:row-start-1 xl:col-start-2 xl:row-span-2", name: "description", register: register, error: errors }), _jsx(Diets, { className: "row-start-4 col-start-1 xl:row-start-3", control: control, setValue: setValue }), _jsx(DishTypes, { className: "row-start-5 col-start-1 xl:row-start-3 xl:col-start-2", control: control, setValue: setValue }), _jsx(Ingredients, { className: "row-start-6 col-start-1 xl:row-start-4", control: control, setValue: setValue, error: errors, setError: setError, clearErrors: clearErrors }), _jsx(Instructions, { className: "row-start-7 col-start-1 xl:row-start-4 xl:col-start-2", control: control, setValue: setValue, error: errors, setError: setError, clearErrors: clearErrors })] })] }));
};
export default EditRecipe;
