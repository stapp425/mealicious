import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function getFullDay(day) {
    switch (day) {
        case "Su":
            return "Sunday";
        case "Mo":
            return "Monday";
        case "Tu":
            return "Tuesday";
        case "We":
            return "Wednesday";
        case "Th":
            return "Thursday";
        case "Fr":
            return "Friday";
        case "Sa":
            return "Saturday";
        default:
            throw new Error("Invalid day");
    }
}
const DayIcon = ({ className, day, fullDay }) => {
    return (_jsx("div", { className: cn("flex justify-center items-center bg-orange-500 size-[36px] font-[600] rounded-full text-white", className), children: fullDay ? getFullDay(day) : day }));
};
export default DayIcon;
