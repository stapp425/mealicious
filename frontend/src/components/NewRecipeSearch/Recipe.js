import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Earth, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { AppContext } from "@/App";
import Details from "./Details";
export default function Recipe({ layout, recipe }) {
    switch (layout) {
        case "list":
            return _jsx(List, { recipe: recipe });
        case "card":
            return _jsx(Card, { recipe: recipe });
        case "square":
            return _jsx(Square, { recipe: recipe });
        default:
            return _jsx(List, { recipe: recipe });
    }
}
function List({ recipe }) {
    const { screenSizes: matches } = useContext(AppContext);
    return (_jsxs("div", { className: "overflow-hidden min-h-[225px] flex justify-between rounded-lg border-2 border-slate-200", children: [_jsx("div", { className: "relative group overflow-hidden flex justify-center items-center basis-1/3 shadow-lg", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { children: _jsxs("div", { children: [_jsx("img", { src: recipe.image, alt: recipe.title, className: "scale-[175%] lg:scale-[200%] group-hover:scale-[175%] transition" }), _jsx("div", { className: "opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition" })] }) }), _jsx(DialogContent, { children: _jsxs(ScrollArea, { children: [_jsx(Details, { recipe: recipe, matches: matches.md }), _jsx(ScrollBar, {})] }) })] }) }), _jsxs("div", { className: "relative flex flex-col justify-between gap-1 basis-2/3 py-3 px-4", children: [_jsx("h1", { className: "font-bold text-lg mx-0 pr-2", children: recipe.title }), recipe.diets && recipe.diets.length > 0 &&
                        _jsx("div", { className: "flex gap-[6px]", children: recipe.diets.slice(0, 3).map((diet) => _jsx(Badge, { className: "pointer-events-none bg-orange-500", children: diet }, nanoid())) }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsxs("div", { className: "flex justify-center items-center gap-2 my-1", children: [_jsx(Zap, {}), _jsxs("span", { children: [_jsx("b", { children: Math.round(recipe.nutrition[0].amount) }), " cal"] })] }), _jsxs("div", { className: "flex items-center gap-2 my-1", children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx(Clock, {}) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Ready Time" }) })] }) }), _jsxs("span", { children: [_jsx("b", { children: recipe.times.readyTime }), " mins"] })] })] }), _jsx("div", { className: "flex flex-wrap items-center gap-2", children: recipe.ingredients.slice(0, 3).map((ingredient) => (_jsx("div", { className: "pointer-events-none min-w-8 text-sm p-2 border-2 border-slate-300 rounded-md", children: ingredient.name }, nanoid()))) }), _jsx("div", { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("p", { className: "text-muted-foreground max-w-[90%]", children: recipe.dishTypes?.slice(0, 5).join(" · ") }), recipe.source &&
                                    _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx(Link, { to: recipe.source.url, target: "_blank", children: _jsx(Earth, { color: "#1e293b" }) }) }), _jsx(TooltipContent, { children: recipe.source.name })] }) })] }) })] })] }));
}
function Card({ recipe }) {
    const { screenSizes: matches } = useContext(AppContext);
    return (_jsxs("div", { className: "overflow-hidden flex flex-col justify-between w-[275px] md:w-[225px] h-[500px] rounded-lg border-2 border-slate-200", children: [_jsx("div", { className: "group relative overflow-hidden basis-[30%]", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { children: _jsxs("div", { children: [_jsx("img", { src: recipe.image, alt: recipe.title, className: "scale-[175%] lg:scale-[200%] group-hover:scale-[175%] transition" }), _jsx("div", { className: "opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition" })] }) }), _jsx(DialogContent, { children: _jsx(ScrollArea, { children: _jsx(Details, { recipe: recipe, matches: matches.md }) }) })] }) }), _jsx("h1", { className: "text-center font-bold py-3 px-2", children: recipe.title }), recipe.diets && recipe.diets.length > 0 &&
                _jsx("div", { className: "flex flex-wrap justify-center items-center gap-[4px]", children: recipe.diets.slice(0, 2).map((diet) => _jsx(Badge, { className: "pointer-events-none bg-orange-500", children: diet }, nanoid())) }), _jsxs("div", { className: "flex flex-wrap justify-between items-center py-1 px-3 gap-2", children: [_jsxs("div", { className: "flex flex-wrap justify-center items-center gap-2 my-1", children: [_jsx(Zap, {}), _jsxs("span", { children: [_jsx("b", { children: Math.round(recipe.nutrition[0].amount) }), " cal"] })] }), _jsxs("div", { className: "flex items-center gap-2 my-1", children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx(Clock, {}) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Ready Time" }) })] }) }), _jsxs("span", { children: [_jsx("b", { children: recipe.times.readyTime }), " mins"] })] })] }), _jsx(ScrollArea, { children: _jsx("div", { className: "text-center flex-1 flex flex-col justify-between gap-2 px-3 py-2", children: recipe.ingredients.slice(0, 3).map((ingredient) => (_jsx("div", { className: "pointer-events-none min-w-8 text-sm px-2 py-1 border-2 border-slate-300 rounded-md", children: ingredient.name }, nanoid()))) }) }), _jsxs("div", { className: "flex justify-between items-end px-3 py-2", children: [_jsx("p", { className: "text-muted-foreground max-w-[90%]", children: recipe.dishTypes?.slice(0, 5).join(" · ") }), recipe.source &&
                        _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx(Link, { to: recipe.source.url, target: "_blank", children: _jsx(Earth, { color: "#1e293b" }) }) }), _jsx(TooltipContent, { children: recipe.source.name })] }) })] })] }));
}
function Square({ recipe }) {
    const { screenSizes: matches } = useContext(AppContext);
    return (_jsxs("div", { className: "group relative overflow-hidden aspect-square w-3/4 md:w-full rounded-lg shadow-md", children: [_jsxs(Dialog, { children: [_jsx(DialogTrigger, { children: _jsxs("div", { children: [_jsx("img", { src: recipe.image, alt: recipe.title, className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[150%] lg:scale-[175%] group-hover:scale-[200%] transition" }), _jsx("div", { className: "opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition" })] }) }), _jsx(DialogContent, { children: _jsx(ScrollArea, { children: _jsx(Details, { recipe: recipe, matches: matches.md }) }) })] }), recipe.source &&
                _jsx("div", { className: "absolute top-2 left-2", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx(Button, { className: "opacity-75 p-0 size-10 bg-white hover:bg-white hover:opacity-100", children: _jsx(Link, { to: recipe.source.url, target: "_blank", children: _jsx(Earth, { color: "#000000" }) }) }) }), _jsx(TooltipContent, { children: recipe.source.name })] }) }) }), _jsx("div", { className: "absolute w-[calc(100%-12px)] bottom-2 left-1/2 -translate-x-1/2 opacity-85 backdrop-blur-sm group group-hover:opacity-15 transition flex justify-center items-center min-h-[60px] p-2 bg-white rounded-md", children: _jsx("span", { className: "text-center text-sm font-bold", children: recipe.title }) })] }));
}
