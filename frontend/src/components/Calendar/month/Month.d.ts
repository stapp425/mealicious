import { type Plan } from "@/types/plan";
type Props<T = Plan> = {
    className?: string;
    days: Date[];
    currentMonth: Date;
    previousMonth: string;
    nextMonth: string;
    getEventsOfInterval: (start: Date, end: Date) => T[];
    setMonth: (value: number) => void;
};
declare const Month: React.FC<Props>;
export default Month;
