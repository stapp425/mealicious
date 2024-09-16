import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import Tip from "./Tip";
const Instructions = forwardRef(({ className, instructions }, ref) => {
    return (_jsxs("div", { ref: ref, className: className, children: [_jsxs("div", { className: "flex items-end gap-2 mb-4 text-slate-600", children: [_jsx("h1", { className: "font-bold text-black text-3xl leading-none", children: "Instructions" }), _jsx(Tip, { children: "The steps needed to complete this recipe. For exact measurements for ingredients, scroll to the ingredients section." })] }), _jsx("div", { className: "flex flex-col gap-4", children: instructions.map((instruction, index) => (_jsxs("div", { className: "flex justify-between gap-3 bg-orange-100 rounded-md p-4", children: [_jsx("div", { className: "size-12 flex justify-center items-center text-white font-bold bg-orange-500 rounded-full", children: index + 1 }), _jsx("p", { className: "flex-1", children: instruction })] }, index))) })] }));
});
export default Instructions;
