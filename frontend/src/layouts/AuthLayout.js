import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import authBackground from "@/img/background/auth-background.jpg";
import { Toaster } from "@/components/ui/toaster";
export default function AuthLayout() {
    return (_jsxs(_Fragment, { children: [_jsx("img", { src: authBackground, alt: "Crerdit: Lukas (https://www.pexels.com/photo/sliced-bread-on-brown-wooden-board-349610/)", className: "absolute size-full top-0 left-0" }), _jsx(Toaster, {}), _jsx("div", { className: "bg-white fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden w-[400px] md:w-[800px] h-[700px] p-5 shadow-lg rounded-lg", children: _jsx(Outlet, {}) })] }));
}
