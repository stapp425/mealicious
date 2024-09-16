import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/App";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { nanoid } from "nanoid";
import Recipe from "./Recipe";
import searchIcon from "@/img/magnifying-glass.png";
import noResultsImage from "@/img/no-results.png";
import Loading from "./Loading";
export default function SearchResults({ results, query, isFetching }) {
    const { screenSizes: matches } = useContext(AppContext);
    const [selectedLayout, setSelectedLayout] = useState(matches.md ? "list" : "square");
    const [isFirstRender, setIsFirstRender] = useState(true);
    useEffect(() => {
        isFetching && setIsFirstRender(false);
    }, [isFetching]);
    function controlSearchState() {
        if (results[0].title) {
            return (_jsxs("div", { className: "w-full flex flex-col justify-between", children: [_jsxs("p", { className: "italic text-muted-foreground text-sm text-center md:text-left", children: [_jsx("span", { className: "text-orange-500 font-bold text-xl", children: "Tip" }), " : Click on a recipe's image to show more details!"] }), _jsxs(Tabs, { defaultValue: selectedLayout, value: selectedLayout, onValueChange: (value) => {
                            const layoutValue = value;
                            setSelectedLayout((!matches.md && layoutValue === "list") ? "square" : layoutValue);
                        }, children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [_jsxs("h1", { className: "text-center font-bold text-2xl my-4", children: [results.length, " ", results.length != 1 ? "results" : "result", " for ", `"${query}"`] }), _jsxs(TabsList, { className: "flex justify-between w-[250px] md:w-auto", children: [_jsx(TabsTrigger, { value: "list", className: "flex-1", children: "List" }), _jsx(TabsTrigger, { value: "card", className: "flex-1", children: "Card" }), _jsx(TabsTrigger, { value: "square", className: "flex-1", children: "Square" })] })] }), _jsx(TabsContent, { value: "list", children: _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: results.map((recipe) => _jsx(Recipe, { recipe: recipe, layout: "list" }, nanoid())) }) }), _jsx(TabsContent, { value: "card", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4", children: results.map((recipe) => _jsx(Recipe, { recipe: recipe, layout: "card" }, nanoid())) }) }), _jsx(TabsContent, { value: "square", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6", children: results.map((recipe) => _jsx(Recipe, { recipe: recipe, layout: "square" }, nanoid())) }) })] })] }));
        }
        else if (isFetching) {
            return (_jsxs("div", { className: "w-full flex flex-col gap-3 py-4", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-6 md:gap-20 md:h-12", children: [_jsx(Skeleton, { className: "w-3/4 h-16 md:h-full" }), _jsx(Skeleton, { className: "w-[200px] h-14 md:h-full" })] }), _jsx(Loading, { layout: (!matches.md && selectedLayout === "list") ? "square" : selectedLayout })] }));
        }
        else {
            return (_jsx(_Fragment, { children: isFirstRender
                    ? _jsxs("div", { className: "aspect-square w-[65%] md:size-[500px] flex flex-col justify-center items-center gap-2 text-center border-2 border-dashed border-slate-400 p-6 rounded-2xl", children: [_jsx("img", { src: searchIcon, alt: "Magnifying Glass | Credit: svstudioart (https://www.freepik.com/free-vector/magnifying-glass-vector-illustration_178790648.htm#fromView=search&page=1&position=32&uuid=ee9a7ab1-0bd7-4c7b-b1ab-b3af2f5aee09)", className: "aspect-square w-1/2" }), _jsx("h1", { className: "font-bold text-[5vw] md:text-3xl", children: "Your results will appear here" }), _jsx("p", { className: "text-lg", children: "Start searching!" })] })
                    : _jsx(NoResults, {}) }));
        }
    }
    return (_jsx("div", { className: "container flex flex-col items-center gap-3", children: controlSearchState() }));
}
function NoResults() {
    return (_jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [_jsx("img", { src: noResultsImage, alt: "No results found image", className: "w-[350px]" }), _jsx("h1", { className: "font-bold text-3xl", children: "No results found!" }), _jsx("p", { children: "Try making another search!" })] }));
}
