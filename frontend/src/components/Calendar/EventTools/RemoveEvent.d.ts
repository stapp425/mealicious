import { type Plan } from "@/types/plan";
type Props = {
    plans: Plan[];
    setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
};
export type PlanQueries = {
    plans: (Plan & {
        selected: boolean;
    })[];
};
declare const RemoveEvent: React.FC<Props>;
export default RemoveEvent;
