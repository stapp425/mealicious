import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search as SearchIcon } from "lucide-react"
import { type Query } from "@/util/types/recipe"

type Props = {
  searchRecipes: (query: Query) => void
}

const Search: React.FC<Props> = ({ searchRecipes }) =>  {
  const [searchInput, setSearchInput] = useState<Query>({ query: "" })
  const searchRef = useRef<HTMLButtonElement>(null)

  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchInput({ query: event.target.value })
  }

  function handleEnterPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter")
      searchRef.current?.click()
  }

  return (
    <div className="overflow-hidden relative flex flex-col gap-4 justify-between items-center w-full">
      <h1 className="font-bold text-4xl">New Recipe Search</h1>
      <p className="text-muted-foreground mb-2 text-center">
        Search over 5,000+ Recipes with <Link to="https://spoonacular.com/" target="_blank" className="text-orange-500">Spoonacular</Link>
      </p>
      <div className="relative h-12 w-64 md:w-[500px]">
        <Input
          className="shadow-inner h-full px-5 rounded-full"
          placeholder="Search for a Recipe..."
          name="query"
          value={searchInput.query}
          onChange={handleInput}
          onKeyDown={handleEnterPress}
          autoFocus
        />
        <Button 
          className="absolute top-1/2 right-2 bg-slate-700 rounded-full h-8 w-8 p-2 -translate-y-1/2"
          onClick={() => searchRecipes(searchInput)}
          ref={searchRef}
        >
          <SearchIcon/>
        </Button>
      </div>
    </div>
  )
}

export default Search