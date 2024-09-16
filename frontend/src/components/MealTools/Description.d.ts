import { type Obj } from "@/types/app";
import { type Meal } from "@/types/meal";
import { type UseFormRegister } from "react-hook-form";
type Props<T extends Obj> = {
    className?: string;
    register: UseFormRegister<T>;
};
declare const Description: React.FC<Props<Meal>>;
export default Description;
