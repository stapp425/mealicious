import { RequiredFieldArray } from "@/types/form";
import { type Meal } from "@/types/meal";
import { Plan } from "@/types/plan";
interface Props extends RequiredFieldArray<Plan> {
    meals: Meal[];
}
declare const DragAndDrop: React.FC<Props>;
export default DragAndDrop;
