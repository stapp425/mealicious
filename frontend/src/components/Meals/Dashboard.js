import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import spoonacularLogo from "@/img/logo/spoonacular-logo.svg";
import { Separator } from "@/components/ui/separator";
import SavedRecipes from "./SavedRecipes";
import * as DailyMeals from "./DailyMeals";
import Banner from "./Banner";
import { useContext, useEffect } from "react";
import { AppContext } from "@/App";
import { Calendar, LayoutGrid, Pencil } from "lucide-react";
export default function Dashboard() {
    const navigate = useNavigate();
    const { date, screenSizes: { xl } } = useContext(AppContext);
    useEffect(() => {
        document.title = "Dashboard | Mealicious";
    }, []);
    return (_jsxs("div", { className: "h-[calc(100vh-150px)] grid grid-rows-[150px_minmax(0,_1fr)_150px] grid-cols-[225px_minmax(0,_1fr)] xl:grid-rows-[150px_minmax(0,_1fr)] xl:grid-cols-[300px_1fr_250px] gap-x-6 gap-y-4 p-4", children: [_jsx(Banner, {}), _jsxs("div", { className: "row-start-3 xl:row-start-1 xl:col-start-3 flex flex-col justify-between items-stretch gap-2 bg-orange-500 p-3 rounded-md", children: [_jsxs("div", { className: "flex flex-col-reverse xl:flex-row justify-between items-center gap-1", children: [_jsx("h1", { className: "text-md xl:text-2xl text-center xl:text-left font-[600] text-white", children: "Search with Spoonacular" }), _jsx("img", { src: spoonacularLogo, alt: "Spoonacular Logo", className: "w-12 xl:w-18" })] }), _jsx(Separator, {}), _jsx("button", { className: "text-black bg-white px-5 py-1 rounded-sm font-[600]", onClick: () => navigate("/recipes/search"), children: "Search" })] }), _jsxs(DailyMeals.Root, { className: "row-start-2 col-start-1 col-span-3 xl:row-span-1 xl:col-span-2", children: [_jsxs(DailyMeals.Header, { className: "relative", children: [_jsx(DailyMeals.Date, { date: date }), _jsxs(DailyMeals.OptionContainer, { className: "absolute top-0 right-0", children: [_jsx(DailyMeals.Option, { to: "create", label: "Create New", children: _jsx(Pencil, { size: xl ? 20 : 18 }) }), _jsx(DailyMeals.Option, { to: "all", label: "All Meals", children: _jsx(LayoutGrid, { size: xl ? 20 : 18 }) }), _jsx(DailyMeals.Option, { to: "calendar", label: "Meal Calendar", children: _jsx(Calendar, { size: xl ? 20 : 18 }) })] })] }), _jsx(DailyMeals.DailyMeals, { className: "flex-1" })] }), _jsx(SavedRecipes, {})] }));
}
