import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/App"
import { type Recipe as RecipeType } from "@/util/types/recipe"
import { type Layout } from "@/util/types/app"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { nanoid } from "nanoid"
import Recipe from "./Recipe"
import searchIcon from "@/img/magnifying-glass.png"
import noResultsImage from "@/img/no-results.png"
import Loading from "./Loading"

type Props = {
  results: RecipeType[]
  query: string
  isFetching: boolean
}

export default function SearchResults({ results, query, isFetching }: Props): React.ReactElement {
  const { screenSizes: matches } = useContext(AppContext)
  const [selectedLayout, setSelectedLayout] = useState<Layout>(matches.md ? "list" : "square")
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  
  useEffect(() => {
    isFetching && setIsFirstRender(false)
  }, [isFetching])
  
  function controlSearchState() {
    if(results.length > 0) {
      return (
        <div className="w-full flex flex-col justify-between">
          <p className="italic text-muted-foreground text-sm text-center md:text-left">
            <span className="text-orange-500 font-bold text-xl">Tip</span> : Click on a recipe's image to show more details!
          </p>
          <Tabs defaultValue={selectedLayout} value={selectedLayout} onValueChange={(value: string) => {
            const layoutValue = value as Layout
            setSelectedLayout((!matches.md && layoutValue === "list") ? "square" : layoutValue)}
          }>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-center font-bold text-2xl my-4">
                {results.length} {results.length != 1 ? "results": "result"} for {`"${query}"`}
              </h1>
              <TabsList className="flex justify-between w-[250px] md:w-auto">
                <TabsTrigger value="list" className="flex-1">List</TabsTrigger>
                <TabsTrigger value="card" className="flex-1">Card</TabsTrigger>
                <TabsTrigger value="square" className="flex-1">Square</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="list">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {results.map((recipe: RecipeType) => <Recipe key={nanoid()} recipe={recipe} layout="list"/>)}
              </div>
            </TabsContent>
            <TabsContent value="card">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4">
                {results.map((recipe: RecipeType) => <Recipe key={nanoid()} recipe={recipe} layout="card"/>)}
              </div>
            </TabsContent>
            <TabsContent value="square">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
                {results.map((recipe: RecipeType) => <Recipe key={nanoid()} recipe={recipe} layout="square"/>)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )
    } else if(isFetching) {
      return (
        <div className="w-full flex flex-col gap-3 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-20 md:h-12">
            <Skeleton className="w-3/4 h-16 md:h-full"/>
            <Skeleton className="w-[200px] h-14 md:h-full"/>
          </div>
          <Loading layout={(!matches.md && selectedLayout === "list") ? "square" : selectedLayout}/>
        </div>
      )
    } else {
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
    <div className="container flex flex-col items-center gap-3">
      {controlSearchState()}
    </div>
  )
}

function NoResults(): React.ReactElement {
  return (
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
}