import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import Error from "./Error";
const Errors = ({ className, errors }) => {
    return (_jsx(_Fragment, { children: errors &&
            _jsxs("div", { className: cn("size-fit flex flex-col gap-2", className), children: [errors.title && _jsx(Error, { children: errors.title.message }), errors.time && _jsx(Error, { children: errors.time.message }), errors.contents && _jsx(Error, { children: errors.contents.message })] }) }));
};
export default Errors;
