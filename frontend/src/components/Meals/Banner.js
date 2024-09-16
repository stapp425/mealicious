import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { AppContext } from "@/App";
import { signOut } from "@/util/auth";
import defaultProfilePicture from "@/img/default-pfp.svg";
export default function Banner() {
    const { user } = useContext(AppContext);
    const profilePicture = user?.photoURL || defaultProfilePicture;
    return (_jsx("div", { className: "col-span-3 xl:col-span-2 relative flex items-center border-b border-slate-300 p-4", children: _jsxs("div", { className: "flex items-stretch gap-6", children: [_jsx("img", { src: profilePicture, alt: "Profile Picture", className: "rounded-full size-20" }), _jsxs("div", { className: "flex flex-col justify-around", children: [_jsxs("h1", { className: "font-bold text-3xl", children: ["Welcome, ", user?.displayName] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("button", { className: "text-sm text-white font-[600] py-1 px-3 bg-red-500 rounded-sm", onClick: signOut, children: "Sign Out" }) })] })] }) }));
}
