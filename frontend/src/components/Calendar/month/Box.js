import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as dateFns from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
const Box = ({ day, children }) => {
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { children: _jsx("button", { className: "size-3 bg-orange-500 rounded-md hover:scale-[120%] transition-transform" }) }), _jsxs(DialogContent, { className: "min-w-[400px] min-h-[560px] space-y-1", children: [_jsx(DialogTitle, { className: "font-bold text-3xl", children: "Events" }), _jsx(DialogDescription, { className: "font-[600]", children: dateFns.format(day, "MMMM dd, yyyy") }), children] })] }));
};
export default Box;
