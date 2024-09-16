import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Field from "./Field";
import Error from "./Error";
const Title = ({ className, name, register, error }) => {
    return (_jsxs(Field, { className: className, children: [_jsx("div", { className: "flex justify-between items-start gap-2 ", children: _jsx("textarea", { ...register(name, {
                        required: "A title is required before submitting."
                    }), spellCheck: false, placeholder: "Title", className: "min-h-[50px] h-[max-content] resize-y flex-1 font-bold text-3xl rounded-md" }) }), _jsx("p", { className: "font-[600] text-muted-foreground mt-3", children: "Add a title to your recipe here." }), error.title &&
                _jsx(Error, { children: error.title.message })] }));
};
export default Title;
