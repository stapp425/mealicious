import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const Field = ({ children, className }) => {
    return (_jsx("div", { className: cn("flex flex-col justify-between gap-2 border border-orange-300 p-4 rounded-md", className), children: children }));
};
export default Field;
