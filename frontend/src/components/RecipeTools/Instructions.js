import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Field from "./Field";
import { useInputChange } from "@/util/hooks";
import { useWatch } from "react-hook-form";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import Error from "./Error";
const Instructions = ({ className, control, setValue, error, setError, clearErrors }) => {
    const { input, isEditActive, setIsEditActive, handleChange } = useInputChange({ step: "" });
    const instructions = useWatch({
        control,
        name: "instructions"
    });
    useEffect(() => {
        if (instructions.length === 0) {
            setError("instructions", {
                type: "missing",
                message: "Instructions must be included for a recipe."
            });
        }
        else
            clearErrors("instructions");
    }, [instructions]);
    return (_jsxs(Field, { className: className, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold after:content-['*'] after:text-red-500", children: "Instructions" }), _jsx("p", { className: "font-[600] text-muted-foreground", children: "Add instructions to your recipe here." })] }), isEditActive &&
                        _jsx("button", { type: "button", onClick: () => setIsEditActive(false), className: "text-red-600 hover:text-red-500 transition-colors font-[600]", children: "Cancel" })] }), instructions.length > 0 &&
                _jsx("div", { className: "flex-1", children: _jsx("div", { className: "flex flex-col gap-4 my-2", children: instructions.map((instruction, index) => (_jsxs("button", { type: "button", onClick: () => setValue("instructions", [...instructions.filter(i => i !== instruction)]), className: "group flex justify-between gap-2 bg-orange-200 hover:bg-red-200 rounded-md p-3", children: [_jsx("div", { className: "size-10 flex justify-center items-center text-white bg-orange-500 group-hover:bg-red-500 p-3 rounded-full", children: index + 1 }), _jsx("p", { className: "flex-1 text-left", children: instruction })] }, index))) }) }), isEditActive
                ? _jsxs("div", { className: "h-fit flex justify-between gap-3", children: [_jsx("textarea", { name: "step", value: input.step, placeholder: "Add an instruction here...", autoComplete: "off", onChange: handleChange, className: "flex-1 h-10 resize-none focus:resize-y border border-slate-300 p-2 rounded-md", autoFocus: true }), _jsx("button", { type: "button", onClick: () => input && setValue("instructions", [...instructions, input.step]), className: "aspect-square size-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md", children: _jsx(Plus, { size: 18 }) })] })
                : _jsx("button", { type: "button", onClick: () => setIsEditActive(true), className: "w-full h-10 flex justify-center items-center bg-orange-500 text-white py-1 rounded-md", children: _jsx(Plus, { size: 18 }) }), error.instructions &&
                _jsx(Error, { children: error.instructions.message })] }));
};
export default Instructions;
