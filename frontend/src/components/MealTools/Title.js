import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Title = ({ className, register }) => {
    return (_jsxs("div", { className: className, children: [_jsx("div", { className: "flex gap-2", children: _jsx("textarea", { ...register("title", {
                        required: "A title is required."
                    }), placeholder: "Meal Title", maxLength: 25, spellCheck: false, className: "w-full max-w-[500px] h-12 font-bold text-4xl resize-none" }) }), _jsx("p", { className: "font-[600] text-slate-600", children: "Enter a title for this meal here." })] }));
};
export default Title;
