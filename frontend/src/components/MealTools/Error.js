import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const Error = ({ children, className }) => {
    return (_jsxs("div", { className: cn("flex items-center gap-2 font-bold text-red-500 text-sm", className), children: [_jsx("i", { className: "fa-solid fa-circle-exclamation" }), children] }));
};
export default Error;
