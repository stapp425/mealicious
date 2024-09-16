import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "@/components/ui/separator";
import Field from "./Field";
import Error from "./Error";
const descriptionPlaceholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh.";
const Description = ({ className, name, register, error }) => {
    return (_jsxs(Field, { className: className, children: [_jsx("div", { className: "flex justify-between gap-3", children: _jsx("h1", { className: "text-2xl font-bold after:content-['*'] after:text-red-500", children: "Description" }) }), _jsx("p", { className: "text-muted-foreground font-[600]", children: "Add basic information about your recipe here." }), _jsx(Separator, { className: "my-1" }), _jsx("textarea", { ...register(name, {
                    required: "A description is required."
                }), spellCheck: false, placeholder: descriptionPlaceholder, autoComplete: "off", className: "min-h-[100px] resize-y leading-normal box-border flex-1 flex rounded-md" }), error.description &&
                _jsx(Error, { children: error.description.message })] }));
};
export default Description;
