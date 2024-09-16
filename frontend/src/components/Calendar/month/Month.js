import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as dateFns from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate, stagger } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Box from "./Box";
import DayIcon from "./DayIcon";
const Month = ({ days, currentMonth, previousMonth, nextMonth, className, setMonth, getEventsOfInterval }) => {
    const calendarRef = useRef(null);
    useEffect(() => {
        const days = [...document.getElementsByClassName("day")];
        if (calendarRef.current && days.length > 0) {
            animate(calendarRef.current, { opacity: [0, 100] }, {
                ease: "easeOut",
                duration: 0.5
            });
            animate(days, {
                y: [50, 0],
                opacity: [0, 100]
            }, {
                ease: "easeOut",
                duration: 0.015,
                delay: stagger(0.02)
            });
        }
    }, [currentMonth]);
    return (_jsx(motion.div, { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 100, opacity: 0 }, transition: { ease: "easeInOut", duration: 0.35 }, className: cn("overflow-hidden border border-slate-400 rounded-md", className), children: _jsxs("div", { ref: calendarRef, className: "flex flex-col justify-between gap-3 p-4", children: [_jsxs("div", { className: "flex justify-between items-center py-2", children: [_jsxs("button", { onClick: () => setMonth(-1), className: "bg-orange-500 flex justify-between items-center text-white rounded-sm p-2 hover:bg-orange-600 active:bg-orange-700 transition-colors", children: [_jsx(ChevronLeft, {}), _jsx("div", { className: "text-left", children: _jsx("h1", { className: "text-left font-[600] leading-5 px-2", children: previousMonth }) })] }), _jsx("h1", { className: "font-bold text-4xl text-center", children: dateFns.format(currentMonth, "MMMM yyyy") }), _jsxs("button", { onClick: () => setMonth(1), className: "bg-orange-500 flex justify-between items-center text-white rounded-sm p-2  hover:bg-orange-600 active:bg-orange-700 transition-colors", children: [_jsx("h1", { className: "text-right font-[600] leading-5 px-2", children: nextMonth }), _jsx(ChevronRight, {})] })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsxs("div", { className: "grid grid-cols-[repeat(7,_75px)] place-items-center gap-2 pb-2 mb-1", children: [_jsx(DayIcon, { day: "Su" }), _jsx(DayIcon, { day: "Mo" }), _jsx(DayIcon, { day: "Tu" }), _jsx(DayIcon, { day: "We" }), _jsx(DayIcon, { day: "Th" }), _jsx(DayIcon, { day: "Fr" }), _jsx(DayIcon, { day: "Sa" })] }), _jsx("div", { className: "overflow-hidden flex-1 grid grid-cols-[repeat(7,_75px)] gap-2", children: days.map((day, index) => {
                                const dailyPlans = getEventsOfInterval(dateFns.startOfDay(day), dateFns.endOfDay(day));
                                const isSameMonth = dateFns.isSameMonth(day, currentMonth);
                                return (_jsxs("div", { className: `day aspect-square border ${dateFns.isToday(day) ? "bg-orange-300 border-orange-300" : "border-slate-400"} p-2 rounded-sm`, children: [_jsx("h1", { className: `${isSameMonth ? "text-black" : "text-slate-400"} font-[600]`, children: dateFns.format(day, "d") }), dailyPlans.length > 0 &&
                                            _jsx(Box, { day: day, children: _jsx("div", { className: "flex flex-col gap-2", children: dailyPlans.map((plan, index) => (_jsxs("div", { className: "border border-slate-400 rounded-md p-3", children: [_jsx("h1", { className: "font-bold text-lg", children: plan.title }), plan.description &&
                                                                _jsx("p", { className: "font-[600] text-xs text-muted-foreground", children: plan.description }), plan.tags &&
                                                                plan.tags.map((tag, index) => _jsx("div", { className: "bg-orange-500 text-xs font-[600] text-white rounded-full px-3", children: tag }, index))] }, index))) }) })] }, index));
                            }) })] })] }) }));
};
export default Month;
