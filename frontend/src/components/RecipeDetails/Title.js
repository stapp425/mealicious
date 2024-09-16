import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Clock, Heart, Microwave, Clipboard, Earth } from "lucide-react";
import { forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
const Title = forwardRef(({ className, title, isFavorite, image, times, diets, dishTypes, source }, ref) => {
    return (_jsxs("div", { ref: ref, className: className, children: [_jsx("img", { src: image, alt: title, className: "rounded-md max-w-[300px]" }), _jsxs("div", { className: "flex-1 flex flex-col gap-2", children: [_jsx("h1", { className: "font-bold text-3xl", children: title }), isFavorite &&
                        _jsxs("div", { className: "flex gap-1.5 text-rose-400 font-[600]", children: [_jsx(Heart, {}), _jsx("span", { children: "Favorited Recipe" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { className: "flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md", children: [_jsx(Clock, {}), _jsxs("span", { className: "text-center", children: [_jsx("b", { children: times.readyTime || "-" }), " mins"] })] }), _jsxs("div", { className: "flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md", children: [_jsx(Microwave, {}), _jsxs("span", { className: "text-center", children: [_jsx("b", { children: times.cookTime || "-" }), " mins"] })] }), _jsxs("div", { className: "flex justify-between items-center gap-2 bg-orange-500 py-2 px-3 text-white rounded-md", children: [_jsx(Clipboard, {}), _jsxs("span", { className: "text-center", children: [_jsx("b", { children: times.prepTime || "-" }), " mins"] })] })] }), _jsx("div", { className: "flex flex-wrap gap-1 text-nowrap", children: diets?.map((diet, index) => _jsx(Badge, { className: "bg-orange-500 gap-2 select-none pointer-events-none", children: diet }, index)) }), _jsx("div", { className: "flex-1 flex flex-wrap gap-2 text-nowrap", children: dishTypes?.map((dish, index) => (_jsx("div", { className: "flex-1 border border-slate-300 font-[600] flex justify-center items-center py-1 px-3 rounded-md", children: dish }, index))) }), source &&
                        _jsxs("div", { className: "flex gap-2", children: [_jsx(Link, { to: source.url, target: "_blank", children: _jsx(Earth, {}) }), _jsx("p", { className: "text-muted-foreground", children: source.name })] })] })] }));
});
export default Title;
