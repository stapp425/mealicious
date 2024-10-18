import { useState, useRef, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { type Recipe, type Query } from "@/util/types/recipe"
import Search from "@/components/new-recipe-search/Search"
import SearchResults from "@/components/new-recipe-search/SearchResults"
import { Toaster } from "@/components/ui/toaster"
import fetchFromAPI from "@/util/fetch"
import Container from "../theme/Container"

const NewRecipeSearch: React.FC = () => {
  const { toast } = useToast()
  const [searchResults, setSearchResults] = useState<Recipe[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const originalSearchQuery = useRef<string>("")

  async function searchRecipes(searchParams: Query) {
    originalSearchQuery.current = searchParams.query
    setSearchResults([])

    if(!searchParams.query) {
      alert("Search query is empty.")
      return
    }

    try {
      setIsFetching(true)
      const results: Recipe[] = await fetchFromAPI("GET", "/search", searchParams)
      setSearchResults(results)
    } catch (err:any) {
      console.error(err.message)
      toast({
        title: "Error!",
        description: "Failed to fetch search results.",
        variant: "destructive"
      })
    } finally {
      setIsFetching(false)
    }
  }
  
  useEffect(() => {
    document.title = "Search | Mealicious"
  }, [])

  return (
    <Container className="space-y-6">
      <Search searchRecipes={searchRecipes}/>
      <SearchResults
        results={searchResults}
        query={originalSearchQuery.current}
        isFetching={isFetching}
      />
      <div className="absolute bottom-0 right-0">
        <Toaster/>
      </div>
    </Container>
  )
}

export default NewRecipeSearch