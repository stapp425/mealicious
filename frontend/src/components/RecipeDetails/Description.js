import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import Tip from "./Tip";
const Description = forwardRef(({ className, description }, ref) => {
    return (_jsxs("div", { ref: ref, className: className, children: [_jsxs("div", { className: "flex items-end gap-2 mb-2 text-slate-600", children: [_jsx("h1", { className: "font-bold text-black text-3xl leading-none", children: "Description" }), _jsx(Tip, { children: "Includes all relevant information about the recipe such as cost per serving, overall rating, and preparation time." })] }), _jsx("p", { className: "indent-8 print:text-lg", children: description })] }));
});
export default Description;
