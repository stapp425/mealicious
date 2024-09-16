type Day = "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa";
type Props = {
    className?: string;
    day: Day;
    fullDay?: boolean;
};
declare const DayIcon: React.FC<Props>;
export default DayIcon;
