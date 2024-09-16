import { type Plan as PlanType } from "@/types/plan";
import { type UseFormRegister } from "react-hook-form";
import { PlanQueries } from "./RemoveEvent";
import { type RequiredFieldArray } from "@/types/form";
type PlansProps = {
    plans: PlanType[];
    register: UseFormRegister<PlanQueries>;
} & React.FormHTMLAttributes<HTMLFormElement> & Omit<RequiredFieldArray<PlanQueries>, "setValue" | "error">;
declare const Plans: React.FC<PlansProps>;
export default Plans;
