import { type Nutrition } from "@/types/recipe";
type Props = {
    className?: string;
    servingSize: {
        amount: number;
        unit: string;
    };
    nutrition: Nutrition[];
};
declare const Nutrition: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLDivElement>>;
export default Nutrition;
