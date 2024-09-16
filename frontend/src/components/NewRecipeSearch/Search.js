import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
export default function Search({ searchRecipes }) {
    const [searchInput, setSearchInput] = useState({ query: "" });
    const searchRef = useRef(null);
    function handleInput(event) {
        setSearchInput({ query: event.target.value });
    }
    function handleEnterPress(event) {
        if (event.key === "Enter")
            searchRef.current?.click();
    }
    return (_jsxs("div", { className: "overflow-hidden relative flex flex-col gap-4 justify-between items-center w-full", children: [_jsx("h1", { className: "font-bold text-4xl", children: "New Recipe Search" }), _jsxs("p", { className: "text-muted-foreground mb-2 text-center", children: ["Search over 5,000+ Recipes with ", _jsx(Link, { to: "https://spoonacular.com/", target: "_blank", className: "text-orange-500", children: "Spoonacular" })] }), _jsxs("div", { className: "relative h-12 w-64 md:w-[500px]", children: [_jsx(Input, { className: "shadow-inner h-full px-5 rounded-full", placeholder: "Search for a Recipe...", name: "query", value: searchInput.query, onChange: handleInput, onKeyDown: handleEnterPress, autoFocus: true }), _jsx(Button, { className: "absolute top-1/2 right-2 bg-slate-700 rounded-full h-8 w-8 p-2 -translate-y-1/2", onClick: () => searchRecipes(searchInput), ref: searchRef, children: _jsx(SearchIcon, {}) })] })] }));
}
