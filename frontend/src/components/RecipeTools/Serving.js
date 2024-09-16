import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Error from "./Error";
const Serving = ({ className, register, error }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: cn("flex justify-between gap-2 items-center border border-slate-400 rounded-md", className), children: [_jsx("h1", { className: "font-[600] my-2", children: "Serving Size:" }), _jsx(Input, { ...register("servingSize.amount", {
                            required: "A serving size amount is required.",
                            min: 1
                        }), type: "number", className: "max-w-[75px]" }), _jsx(Input, { ...register("servingSize.unit", {
                            required: "A serving size unit is required."
                        }), type: "text", className: "flex-1" })] }), error.servingSize?.amount &&
                _jsx(Error, { children: error.servingSize.amount.message }), error.servingSize?.unit &&
                _jsx(Error, { children: error.servingSize.unit.message })] }));
};
export default Serving;
