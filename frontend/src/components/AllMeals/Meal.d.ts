import { type Meal } from "@/types/meal";
type Props = {
    meal: Meal;
    removeMeal: (targetMeal: Meal) => void;
};
declare const Meal: React.FC<Props>;
export default Meal;
