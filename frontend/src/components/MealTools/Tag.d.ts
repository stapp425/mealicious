import { type FieldArray } from "@/types/form";
import { type Meal } from "@/types/meal";
type Tag = {
    tag: "";
};
declare const Tag: React.FC<FieldArray<Meal>>;
export default Tag;
