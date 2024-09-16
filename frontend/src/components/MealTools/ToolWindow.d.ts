import { type Meal } from "@/types/meal";
import { type UseFormReset } from "react-hook-form";
import { type RequiredFieldArray, type RequiredSingleField } from "@/types/form";
import { type Obj } from "@/types/app";
interface Props<T extends Obj> extends RequiredSingleField<T>, RequiredFieldArray<T> {
    reset: UseFormReset<T>;
}
declare const ToolWindow: React.FC<Props<Meal>>;
export default ToolWindow;
