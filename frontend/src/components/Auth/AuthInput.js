import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import Error from "../Error";
import { cn } from "@/lib/utils";
const AuthInput = forwardRef(({ className, placeholder, id, label, autoFocus = false, errorMessage, ...props }, ref) => (_jsxs("div", { className: className, children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(Label, { htmlFor: id, className: "after:content-['_*'] after:font-bold after:text-red-600", children: label }), errorMessage && _jsx(Error, { children: errorMessage })] }), _jsx(Input, { ref: ref, id: id, type: "text", ...props, placeholder: placeholder, className: "mt-2", autoFocus: autoFocus, autoComplete: "off" })] })));
AuthInput.Password = forwardRef(({ className, placeholder, id, label, errorMessage, autoFocus = false, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const Icon = visible ? Eye : EyeOff;
    function toggleVisibility() {
        setVisible(v => !v);
    }
    return (_jsxs("div", { className: cn("px-6", className), children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(Label, { htmlFor: id, className: "after:content-['_*'] after:font-bold after:text-red-600", children: label }), errorMessage && _jsx(Error, { children: errorMessage })] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { ref: ref, id: id, type: visible ? "text" : "password", ...props, placeholder: placeholder, className: "mt-2", autoFocus: autoFocus, autoComplete: "off" }), _jsx("button", { type: "button", onClick: toggleVisibility, className: "absolute top-1/2 -translate-y-1/2 right-3 text-slate-500 cursor-pointer hover:text-slate-600 active:text-slate-700 transition-colors", children: _jsx(Icon, { size: 20 }) })] })] }));
});
export default AuthInput;
