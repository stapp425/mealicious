import { type Plan as PlanType } from '@/types/plan';
type Props = {
    className?: string;
    currentDay: Date;
    setDay: (value: number) => void;
    events?: PlanType[];
};
declare const Day: React.FC<Props>;
export default Day;
