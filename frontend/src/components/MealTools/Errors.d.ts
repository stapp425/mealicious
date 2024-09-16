import { Meal } from "@/types/meal";
import { FieldErrors } from "react-hook-form";
type Props<T extends {
    [key: string]: unknown;
}> = {
    className?: string;
    errors: FieldErrors<T>;
};
declare const Errors: React.FC<Props<Meal>>;
export default Errors;
