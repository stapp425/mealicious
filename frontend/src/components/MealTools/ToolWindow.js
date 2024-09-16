import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from "./Title";
import Description from "./Description";
import Time from "./Time";
import Tag from "./Tag";
import RecipeList from "./RecipeList";
import Errors from "./Errors";
const ToolWindow = (props) => {
    return (_jsxs("div", { className: "relative flex-1 flex flex-col gap-2", children: [_jsx(Title, { register: props.register, className: "px-4 pt-4" }), _jsx(Tag, { control: props.control, setValue: props.setValue, className: "px-4" }), _jsx(Description, { register: props.register, className: "px-4" }), _jsx(Time, { setValue: props.setValue, control: props.control, setError: props.setError, clearErrors: props.clearErrors, error: props.error, className: "px-4" }), _jsx(RecipeList, { control: props.control, setValue: props.setValue, setError: props.setError, clearErrors: props.clearErrors, error: props.error, className: "flex-1", contentClassName: "h-1/2 px-4 py-2" }), _jsx(Errors, { errors: props.error, className: "absolute top-4 right-4" })] }));
};
export default ToolWindow;
