import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
const Button = forwardRef(({ className, children, ...props }, ref) => {
    return (_jsx("button", { ...props, ref: ref, className: cn("text-white font-[600] bg-orange-500 rounded-md hover:bg-orange-700 active:bg-orange-800 transition-colors px-4 py-2", className), children: children }));
});
export default Button;
