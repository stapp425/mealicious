import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Search from "@/components/NewRecipeSearch/Search";
import SearchResults from "@/components/NewRecipeSearch/SearchResults";
import { Toaster } from "@/components/ui/toaster";
import fetchFromAPI from "@/util/fetch";
import { defaultRecipe } from "@/types/recipe";
export default function NewRecipeSearch() {
    const { toast } = useToast();
    const [searchResults, setSearchResults] = useState([defaultRecipe]);
    const [isFetching, setIsFetching] = useState(false);
    const originalSearchQuery = useRef("");
    async function searchRecipes(searchParams) {
        originalSearchQuery.current = searchParams.query;
        setSearchResults([defaultRecipe]);
        if (!searchParams.query)
            return toast({
                title: "Error!",
                description: "Search query is empty.",
                variant: "destructive"
            });
        try {
            setIsFetching(true);
            const results = await fetchFromAPI("GET", "/api/meals/search", searchParams);
            // const results: Recipe[] = await fetchTest()
            setSearchResults(results);
        }
        catch (err) {
            console.error(err.message);
            toast({
                title: "Error!",
                description: "Failed to fetch search results.",
                variant: "destructive"
            });
        }
        finally {
            setIsFetching(false);
        }
    }
    useEffect(() => {
        document.title = "Search | Mealicious";
    }, []);
    return (_jsxs("div", { className: "flex-1 flex flex-col justify-start items-center *:p-6", children: [_jsx(Search, { searchRecipes: searchRecipes }), _jsx(SearchResults, { results: searchResults, query: originalSearchQuery.current, isFetching: isFetching }), _jsx("div", { className: "absolute bottom-0 right-0", children: _jsx(Toaster, {}) })] }));
}
