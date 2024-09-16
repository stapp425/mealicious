import { type Plan } from "@/types/plan";
import { Meal } from "@/types/meal";
type Props = {
    meals: Meal[];
    setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
};
declare const CreateEvent: React.FC<Props>;
export default CreateEvent;
