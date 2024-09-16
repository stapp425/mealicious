import { type Obj } from "@/types/app";
import { type Meal } from "@/types/meal";
import { type UseFormGetValues, type UseFormSetValue } from "react-hook-form";
type Props<T extends Obj> = {
    setValue: UseFormSetValue<T>;
    getValues: UseFormGetValues<T>;
};
declare const AddWindow: React.FC<Props<Meal>>;
export default AddWindow;
