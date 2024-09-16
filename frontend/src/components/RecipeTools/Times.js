import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Clock, Microwave, Clipboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import Field from "./Field";
import Error from "./Error";
const Times = ({ className, error, register }) => {
    return (_jsxs(Field, { className: className, children: [_jsx("h1", { className: "font-bold text-2xl after:content-['*'] after:text-red-500", children: "Times" }), _jsx("p", { className: "text-muted-foreground font-[600]", children: "Add preparation times for this recipe." }), _jsxs("div", { className: "flex flex-col xl:flex-row flex-wrap justify-between gap-3 xl:gap-5 mt-3", children: [_jsxs("div", { className: "flex-1 bg-orange-500 text-white flex flex-col items-center gap-3 p-4 rounded-md", children: [_jsx("h1", { className: "font-bold text-xl", children: "Prep Time" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { size: 28 }), _jsx(Input, { ...register("times.prepTime", {
                                            min: {
                                                value: 1,
                                                message: "Prep time must be provided."
                                            }
                                        }), type: "number", min: 0, autoComplete: "off", className: "w-[75px] h-[30px] bg-transparent focus:bg-white focus:text-black" }), _jsx("span", { className: "font-[600]", children: "mins" })] })] }), _jsxs("div", { className: "flex-1 bg-orange-500 text-white flex flex-col items-center gap-3 p-4 rounded-md", children: [_jsx("h1", { className: "font-bold text-xl", children: "Cook Time" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Microwave, { size: 28 }), _jsx(Input, { ...register("times.cookTime", {
                                            min: {
                                                value: 1,
                                                message: "Cook time must be provided."
                                            }
                                        }), type: "number", min: 0, autoComplete: "off", className: "w-[75px] h-[30px] bg-transparent focus:bg-white focus:text-black" }), _jsx("span", { className: "font-[600]", children: "mins" })] })] }), _jsxs("div", { className: "flex-1 bg-orange-500 text-white flex flex-col items-center gap-3 p-4 rounded-md", children: [_jsx("h1", { className: "font-bold text-xl", children: "Ready Time" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clipboard, { size: 28 }), _jsx(Input, { ...register("times.readyTime", {
                                            min: {
                                                value: 1,
                                                message: "Ready time must be provided."
                                            }
                                        }), type: "number", min: 0, autoComplete: "off", className: "w-[75px] h-[30px] bg-transparent focus:bg-white focus:text-black" }), _jsx("span", { className: "font-[600]", children: "mins" })] })] })] }), error.times?.prepTime &&
                _jsx(Error, { children: error.times.prepTime.message }), error.times?.cookTime &&
                _jsx(Error, { children: error.times.cookTime.message }), error.times?.readyTime &&
                _jsx(Error, { children: error.times.readyTime.message })] }));
};
export default Times;
