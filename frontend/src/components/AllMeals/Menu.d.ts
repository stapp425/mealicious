import { type Meal } from "@/types/meal";
type Props = {
    meal: Meal;
    removeMeal: (value: Meal) => void;
    id: string;
};
declare const Menu: React.FC<Props>;
export default Menu;
