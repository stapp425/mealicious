import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from "lucide-react";
const Error = ({ children }) => (_jsxs("div", { className: "flex gap-2 border bg-red-200 border-red-500 p-3 rounded-sm mt-2", children: [_jsx(Info, {}), children] }));
export default Error;
