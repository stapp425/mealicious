import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { AppContext } from "@/App";
import { signOut } from "@/util/auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import siteLogo from "@/img/logo/mealicious-logo.svg";
import defaultProfilePicture from "@/img/default-pfp.svg";
export default function Header() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const profilePicture = user?.photoURL || defaultProfilePicture;
    function styleResults() {
        if (user) {
            return (_jsx("div", { children: _jsxs(Popover, { modal: true, children: [_jsx(PopoverTrigger, { children: _jsx("img", { src: profilePicture, alt: "Profile Picture", className: "w-14 rounded-full hover:scale-110 transition" }) }), _jsxs(PopoverContent, { align: "end", className: "overflow-hidden mt-3 p-0", children: [_jsxs("div", { className: "relative w-full h-1/4 shadow-lg", children: [_jsx("div", { className: "bg-blue-700 h-28 shadow-inner" }), _jsx("img", { src: profilePicture, alt: "Profile Picture", className: "absolute bg-white bottom-0 left-5 translate-y-1/2 w-20 rounded-full" })] }), _jsxs("div", { className: "flex flex-col mt-6 p-5 gap-2", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-bold text-2xl", children: user?.displayName }), _jsx("p", { className: "text-sm text-muted-foreground", children: user?.email })] }), _jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { children: _jsx(Button, { variant: "destructive", className: "w-full", children: "Sign Out" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Warning!" }), _jsx(AlertDialogDescription, { children: "Are you sure? Any unsaved changes will be lost." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: signOut, children: "Continue" })] })] })] })] })] })] }) }));
        }
        else {
            return (_jsx(Button, { onClick: () => navigate("/auth/login"), children: "Login" }));
        }
    }
    return (_jsx("div", { className: "sticky top-0 left-0 z-50 bg-white shadow-md h-[150px]", children: _jsxs("div", { className: "relative flex justify-between items-center py-8 px-8", children: [_jsx("div", { className: "relative left-1/2 -translate-x-1/2 flex justify-center items-center gap-16", children: _jsx("img", { src: siteLogo, alt: "Mealicious Logo", className: "w-[150px]" }) }), styleResults()] }) }));
}
