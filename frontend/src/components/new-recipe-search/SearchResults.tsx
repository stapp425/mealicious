import { createContext, useContext, useEffect, useState } from "react"
import { AppContext } from "@/App"
import { type Recipe as RecipeType } from "@/util/types/recipe"
import { ReactState, type Layout } from "@/util/types/app"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import Recipe from "./Recipe"
import searchIcon from "@/img/magnifying-glass.png"
import noResultsImage from "@/img/no-results.png"
import Loading from "./Loading"
import Tip from "../theme/Tip"

const SearchResultsContext = createContext<ReactState<Layout>>(["list" as Layout, () => {}])

type SearchResultsProps = {
  results: RecipeType[]
  query: string
  isFetching: boolean
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query, isFetching }) => {
  const layoutState = useState<Layout>("list")
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  useEffect(() => {
    isFetching && setIsFirstRender(false)
  }, [isFetching])
  
  function controlSearchState() {
    if(results.length > 0)
      return <Results results={results} query={query}/>
    else if(isFetching)
      return <Fetching/>
    else {
      return (
        <>
        {
          isFirstRender
          ? <div className="aspect-square w-[65%] md:size-[500px] flex flex-col justify-center items-center gap-2 text-center border-2 border-dashed border-slate-400 p-6 rounded-2xl">
              <img
                src={searchIcon}
                alt="Magnifying Glass | Credit: svstudioart (https://www.freepik.com/free-vector/magnifying-glass-vector-illustration_178790648.htm#fromView=search&page=1&position=32&uuid=ee9a7ab1-0bd7-4c7b-b1ab-b3af2f5aee09)"
                className="aspect-square w-1/2"
              />
              <h1 className="font-bold text-[5vw] md:text-3xl">Your results will appear here</h1>
              <p className="text-lg">Start searching!</p>
            </div>
          : <NoResults/>
        }
        </>
      )
    }
  }

  return (
    <SearchResultsContext.Provider value={layoutState}>
      <div className="container flex flex-col items-center gap-3">
        {controlSearchState()}
      </div>
    </SearchResultsContext.Provider>
  )
}

const Fetching: React.FC = () => {
  const { screenSizes: { md } } = useContext(AppContext)
  const [selectedLayout, _] = useContext(SearchResultsContext)
  
  return (
    <div className="w-full flex flex-col gap-3 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-20 md:h-12">
        <Skeleton className="w-3/4 h-16 md:h-full"/>
        <Skeleton className="w-[200px] h-14 md:h-full"/>
      </div>
      <Loading layout={(!md && selectedLayout === "list") ? "square" : selectedLayout}/>
    </div>
  )
}

const Results: React.FC<{ results: RecipeType[], query: string }> = ({ results, query }) => {
  const { screenSizes: { md } } = useContext(AppContext)
  const [selectedLayout, setSelectedLayout] = useContext(SearchResultsContext)
  
  useEffect(() => {
    if(!md && selectedLayout === "list")
      setSelectedLayout("square")
  }, [md])
  
  return (
    <Tabs 
      defaultValue={selectedLayout}
      value={selectedLayout}
      onValueChange={value => setSelectedLayout(value as Layout)}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-center font-bold text-2xl my-4">
          {results.length} {results.length != 1 ? "results": "result"} for {`"${query}"`}
        </h1>
        <TabsList className="flex justify-between w-[250px] md:w-auto">
          {md && <TabsTrigger value="list" className="flex-1">List</TabsTrigger>}
          <TabsTrigger value="card" className="flex-1">Card</TabsTrigger>
          <TabsTrigger value="square" className="flex-1">Square</TabsTrigger>
        </TabsList>
      </div>
      <Tip.Label className="font-[600] w-full md:w-fit flex md:block flex-col items-center text-center sm:text-left">Click on a recipe's image to show more details!</Tip.Label>
      <TabsContent value="list">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-6">
          {results.map((recipe, index) => <Recipe key={index} recipe={recipe} layout={md ? "list" : "square"}/>)}
        </div>
      </TabsContent>
      <TabsContent value="card">
        <div className="flex flex-wrap justify-start gap-4 py-6">
          {results.map((recipe, index) => <Recipe key={index} recipe={recipe} layout="card"/>)}
        </div>
      </TabsContent>
      <TabsContent value="square">
        <div className="flex flex-wrap justify-start gap-4 py-6">
          {results.map((recipe, index) => <Recipe key={index} recipe={recipe} layout="square"/>)}
        </div>
      </TabsContent>
    </Tabs>
  )
}

const NoResults: React.FC = () => (
  <div className="flex flex-col items-center gap-2 text-center">
    <img 
      src={noResultsImage}
      alt="No results found image"
      className="w-[350px]"
    />
    <h1 className="font-bold text-3xl">No results found!</h1>
    <p>Try making another search!</p>
  </div>
)

export default SearchResults