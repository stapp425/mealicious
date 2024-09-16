import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Error from "./Error";
const Image = ({ className, name = "image", register, error, setValue, image, setImage }) => {
    const addImageButton = useRef(null);
    function getImageDetails(image) {
        const name = image.name;
        const parsedName = name?.split(".");
        return {
            name: parsedName?.slice(0, parsedName.length - 1).join(""),
            type: parsedName?.[parsedName.length - 1].toUpperCase()
        };
    }
    function handleImageInsert(event) {
        const addedImage = event.target.files?.[0];
        // images can't be more than 5MB in size
        if (addedImage && addedImage.size <= 5 * 1024 * 1024) {
            setImage(i => ({ ...i, file: addedImage }));
        }
    }
    useEffect(() => {
        if (image.file) {
            const url = URL.createObjectURL(image.file);
            const { name, type } = getImageDetails(image.file);
            setImage(i => ({
                ...i,
                name: name,
                type: type,
                url: url
            }));
            setValue("image", url);
        }
        return () => URL.revokeObjectURL(image.url);
    }, [image.file]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: cn(`overflow-hidden group bg-slate-200 rounded-lg ${!image.url ? "h-[250px] border-2 border-dashed" : "h-fit"} border-slate-400 rounded-md`, className), children: [_jsx(Input, { ...register(name, {
                            required: "An image is required for a recipe."
                        }), ref: addImageButton, type: "file", onChange: handleImageInsert, accept: ".jpg, .jpeg, .png", className: "hidden" }), image.url
                        ? _jsxs("div", { className: "relative h-fit", children: [_jsx("img", { src: image.url, alt: "Added Image", className: "size-full" }), image.file && _jsx("h1", { className: "absolute top-2 left-2 bg-orange-500 size-fit select-none text-white font-[600] text-sm px-3 py-1 rounded-md", children: image.type }), _jsxs("div", { className: "absolute bottom-0 w-full flex justify-between items-center gap-2 p-2", children: [_jsx("button", { type: "button", onClick: () => addImageButton.current?.click(), className: "bg-orange-500 font-[600] text-white text-nowrap text-xs py-1 px-3 rounded-md", children: "Change Image" }), image.file && _jsx("h1", { className: "overflow-hidden bg-white border border-slate-500 py-1 px-3 text-nowrap text-center text-xs font-[600] rounded-md line-clamp-1", children: image.name })] })] })
                        : _jsxs("button", { type: "button", onClick: () => addImageButton.current?.click(), className: "size-full relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2 p-6 bg-slate-200 text-lg text-slate-500 font-bold rounded-md hover:bg-slate-300 active:bg-slate-400 active:text-slate-700 transition-colors", children: [_jsx(Plus, { size: 30 }), _jsx("span", { children: "Add an Image" })] })] }), error.image &&
                _jsx(Error, { children: error.image.message })] }));
};
export default Image;
