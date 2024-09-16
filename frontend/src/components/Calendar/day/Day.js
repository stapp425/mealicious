import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Plan from './Plan';
import * as Placeholder from '@/components/Theme/Placeholder';
const Day = ({ className, setDay, currentDay, events }) => (_jsx(motion.div, { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -100, opacity: 0 }, transition: { ease: "easeInOut", duration: 0.35 }, className: className, children: _jsxs("div", { className: "flex justify-between items-center gap-6", children: [_jsx(ToggleButton, { onClick: () => setDay(-1), className: "rounded-full border border-slate-400 p-2 hover:-translate-x-2 transition-transform", children: _jsx(ChevronLeft, {}) }), _jsx(AnimatePresence, { children: _jsxs(motion.div, { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 100, opacity: 0 }, transition: { ease: "easeInOut", duration: 0.35 }, className: "relative w-[550px] h-[550px] border border-slate-400 flex flex-col rounded-md p-4", children: [_jsx("h1", { className: "text-center font-bold text-3xl", children: format(currentDay, "MMMM dd, yyyy") }), _jsx("h2", { className: "text-center text-muted-foreground font-[600] my-1", children: format(currentDay, "EEEE") }), events && events.length > 0
                            ? _jsxs(ScrollArea, { className: "flex-1", type: "always", children: [events.map((event, index) => _jsx(Plan, { plan: event }, index)), _jsx(ScrollBar, {})] })
                            : _jsx(Placeholder.Root, { icon: _jsx(X, { size: 64 }), className: "my-auto size-full", children: _jsx(Placeholder.Message, { children: "No Meals Found!" }) })] }) }), _jsx(ToggleButton, { onClick: () => setDay(1), className: "rounded-full border border-slate-400 p-2 hover:translate-x-2 transition-transform", children: _jsx(ChevronRight, {}) })] }) }));
const ToggleButton = ({ className, onClick, children }) => (_jsx("button", { onClick: onClick, className: className, children: children }));
export default Day;
