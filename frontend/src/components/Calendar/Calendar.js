import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEventCalendar } from "@/util/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs";
import Month from "./month/Month";
import Day from "./day/Day";
const Calendar = ({ className, plans }) => {
    const { currentDay, setDay, setMonth, getEventsOfInterval, adjacentDates, calendar, currentEvents } = useEventCalendar(plans);
    return (_jsxs(Tabs, { defaultValue: "month", className: className, children: [_jsxs(TabsList, { className: "w-full flex justify-around mb-6 *:flex-1", children: [_jsx(TabsTrigger, { value: "day", children: "Day" }), _jsx(TabsTrigger, { value: "month", children: "Month" })] }), _jsx(TabsContent, { value: "day", children: _jsx(Day, { currentDay: currentDay, setDay: setDay, events: currentEvents.day }) }), _jsx(TabsContent, { value: "month", children: _jsx(Month, { currentMonth: currentDay, days: calendar.month, getEventsOfInterval: getEventsOfInterval, previousMonth: adjacentDates.month.previous, nextMonth: adjacentDates.month.next, setMonth: setMonth }) })] }));
};
export default Calendar;
