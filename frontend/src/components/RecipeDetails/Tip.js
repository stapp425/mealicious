import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
const Tip = ({ children }) => {
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { className: "print:hidden", children: _jsx(Info, { size: 20 }) }), _jsx(PopoverContent, { side: "top", className: "size-auto p-0", children: _jsx("p", { className: "p-4 max-w-[300px]", children: children }) })] }));
};
export default Tip;
