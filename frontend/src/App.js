import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
// @ts-ignore
import { auth } from "../../firebaseConfig";
import { useMediaQuery } from "usehooks-ts";
import Login from "./components/Auth/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./components/Meals/Dashboard";
import NewRecipeSearch from "./components/NewRecipeSearch/NewRecipeSearch";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./components/Auth/Register";
import AllRecipes from "./components/AllRecipes/AllRecipes";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import CreateRecipe from "./components/RecipeTools/CreateRecipe";
import EditRecipe from "./components/RecipeTools/EditRecipe";
import MealCalendar from "./components/Calendar/MealCalendar";
import AllMeals from "./components/AllMeals/AllMeals";
import MealTools from "./components/MealTools/MealTools";
import { now } from "./util/hooks";
export const AppContext = createContext({
    date: now,
    user: null,
    screenSizes: {
        any: false, sm: false,
        md: false, lg: false,
        xl: false, xxl: false
    }
});
export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const matches = {
        any: useMediaQuery("(min-width: 0px)"),
        sm: useMediaQuery("(min-width: 640px)"),
        md: useMediaQuery("(min-width: 768px)"),
        lg: useMediaQuery("(min-width: 1024px)"),
        xl: useMediaQuery("(min-width: 1280px)"),
        xxl: useMediaQuery("(min-width: 1536px)")
    };
    useEffect(() => {
        document.title = "Mealicious";
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user?.uid) {
                setCurrentUser(user);
                location.pathname.match(/^\/(auth\/.+)?$/) && navigate("/dashboard", { replace: true });
            }
            else {
                setCurrentUser(null);
                navigate("/auth/login", { replace: true });
            }
        });
        return unsubscribe;
    }, []);
    return (_jsx(AppContext.Provider, { value: {
            date: now,
            user: currentUser,
            screenSizes: matches,
        }, children: _jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { path: "dashboard", element: _jsx(Dashboard, {}) }), _jsxs(Route, { path: "meals", children: [_jsx(Route, { path: "all", element: _jsx(AllMeals, {}) }), _jsx(Route, { path: "create", element: _jsx(MealTools, { mode: "create" }) }), _jsx(Route, { path: "edit/:mealId", element: _jsx(MealTools, { mode: "edit" }) }), _jsx(Route, { path: "calendar", element: _jsx(MealCalendar, {}) })] }), _jsxs(Route, { path: "recipes", children: [_jsx(Route, { index: true, element: _jsx(AllRecipes, {}) }), _jsx(Route, { path: "search", element: _jsx(NewRecipeSearch, {}) }), _jsx(Route, { path: "create", element: _jsx(CreateRecipe, {}) }), _jsx(Route, { path: "edit", children: _jsx(Route, { path: ":recipeId", element: _jsx(EditRecipe, {}) }) }), _jsx(Route, { path: ":recipeId", element: _jsx(RecipeDetails, {}) })] })] }), _jsxs(Route, { path: "/auth", element: _jsx(AuthLayout, {}), children: [_jsx(Route, { path: "login", element: _jsx(Login, {}) }), _jsx(Route, { path: "register", element: _jsx(Register, {}) })] })] }) }));
}
