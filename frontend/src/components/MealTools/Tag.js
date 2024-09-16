import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { useWatch } from "react-hook-form";
import { useInputChange } from "@/util/hooks";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
const Tag = ({ control, className, setValue }) => {
    const { input, handleChange, isEditActive, setIsEditActive } = useInputChange({ tag: "" });
    const tags = useWatch({
        control,
        name: "tags"
    });
    function handleEnterPress(event) {
        if (input.tag && tags && event.key === "Enter")
            setValue("tags", [...tags, input.tag]);
    }
    return (_jsx("div", { className: cn("flex items-center gap-2", className), children: _jsxs(AnimatePresence, { children: [tags?.map((tag, index) => (_jsx(motion.button, { initial: { scale: 0 }, animate: { scale: 1 }, exit: { scale: 0 }, type: "button", onClick: () => { setValue("tags", tags.filter(t => t !== tag)); }, className: "h-5 bg-orange-500 hover:bg-red-500 text-white text-xs font-[600] px-2 rounded-full transition-colors", children: tag }, index))), isEditActive
                    ? _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "flex gap-2 items-center", children: [_jsx("input", { name: "tag", value: input.tag, onChange: handleChange, onKeyDown: handleEnterPress, autoComplete: "off", className: "h-5 w-[125px] bg-orange-500 text-white font-[600] text-xs rounded-full px-2" }), _jsx("button", { type: "submit", onClick: () => setIsEditActive(false), className: "text-red-500 text-sm font-[600]", children: "Cancel" })] })
                    : _jsx(motion.button, { type: "button", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setIsEditActive(true), className: "size-5 flex justify-center items-center bg-orange-500 text-white rounded-sm hover:bg-orange-700 active:bg-orange-800 transition-colors", children: _jsx(Plus, { size: 14 }) })] }) }));
};
export default Tag;
