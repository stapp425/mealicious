import { type Obj } from "@/types/app";
import { type RequiredFieldArray as SelectField } from "@/types/form";
import { type Meal } from "@/types/meal";
import { type UseFormSetValue } from "react-hook-form";
interface Props<T extends Obj> extends SelectField<T> {
    className?: string;
    setValue: UseFormSetValue<T>;
}
declare const Time: React.FC<Props<Meal>>;
export default Time;
