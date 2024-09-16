import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
// import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster";
import { useContext } from "react";
import { AppContext } from "@/App";
import Spinner from "@/components/ui/Spinner";
export default function MainLayout() {
    const { user } = useContext(AppContext);
    return (_jsxs("div", { className: "relative max-w-screen min-h-screen flex flex-col", children: [_jsx(Header, {}), user
                ? _jsx(Outlet, {})
                : _jsxs("div", { className: "h-[calc(100vh-150px)] w-full flex flex-col justify-center items-center gap-4", children: [_jsx(Spinner, { size: 84 }), _jsx("h1", { className: "font-bold text-4xl", children: "Loading..." })] }), _jsx("div", { className: "absolute bottom-0 right-0", children: _jsx(Toaster, {}) })] }));
}
