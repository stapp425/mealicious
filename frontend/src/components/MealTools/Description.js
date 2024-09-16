import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const Description = ({ className, register }) => (_jsx("textarea", { ...register("description"), placeholder: "Enter a brief description here. (Optional)", className: cn("font-[600] text-muted-foreground h-8 resize-none", className), autoComplete: "off", spellCheck: false }));
export default Description;
