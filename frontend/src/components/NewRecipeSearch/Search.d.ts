import { type Query } from "@/types/recipe";
type Props = {
    searchRecipes: (query: Query) => void;
};
export default function Search({ searchRecipes }: Props): React.ReactElement;
export {};
