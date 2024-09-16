import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import googleLogo from "@/img/logo/google-logo.svg";
import { signInWithGoogle } from "@/util/auth";
const GoogleButton = ({ mode }) => (_jsx("div", { className: "flex justify-center items-stretch", children: _jsxs("button", { type: "button", className: "gsi-material-button", onClick: signInWithGoogle, children: [_jsx("div", { className: "gsi-material-button-state" }), _jsxs("div", { className: "gsi-material-button-content-wrapper", children: [_jsx("img", { src: googleLogo, alt: "Google Icon", className: "gsi-material-button-icon" }), mode === "login" && _jsx("span", { className: "gsi-material-button-contents", children: "Sign in with Google" }), mode === "register" && _jsx("span", { className: "gsi-material-button-contents", children: "Sign up with Google" })] })] }) }));
export default GoogleButton;
