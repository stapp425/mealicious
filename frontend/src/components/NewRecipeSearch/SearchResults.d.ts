import { type Recipe as RecipeType } from "@/types/recipe";
type Props = {
    results: RecipeType[];
    query: string;
    isFetching: boolean;
};
export default function SearchResults({ results, query, isFetching }: Props): React.ReactElement;
export {};
