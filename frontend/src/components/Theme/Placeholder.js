import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import Button from "./Button";
const Root = ({ className, icon, children }) => {
    return (_jsxs("div", { className: cn("flex flex-col justify-center items-center gap-3 border-2 border-dashed border-slate-400 bg-slate-200 text-slate-600 font-[600] text-2xl py-4 rounded-lg", className), children: [icon, children] }));
};
const Message = ({ className, children }) => {
    return _jsx("h1", { className: className, children: children });
};
const Tip = ({ className, children }) => (_jsx("p", { className: cn("text-sm font-[500]", className), children: children }));
const Action = Button;
export { Root, Message, Tip, Action };
