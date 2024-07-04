import { useState, useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import { Input } from "@/components/ui/input"
import { 
  Bookmark, Clock, 
  Earth, EllipsisVertical, 
  Search, Wheat, 
  ExternalLink, Flag, 
  Zap, Clipboard, Microwave, 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Toaster } from "@/components/ui/toaster"
import fetchFromAPI, { fetchTest } from "@/util/fetch"
import { nanoid } from "nanoid"
import searchIcon from "../img/magnifying-glass.png"
import noResultsImage from "../img/no-results.png"
import { CardSkeleton, ListSkeleton, SquareSkeleton } from "./Skeletons"

export default function NewMealSearchBar() {
  const { toast } = useToast()
  const matches = useMediaQuery("(min-width: 768px)")
  const [searchInput, setSearchInput] = useState<{[key:string]: string}>({ query: "" })
  const [searchResults, setSearchResults] = useState<{[key:string]: any}[] | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [selectedLayout, setSelectedLayout] = useState<string>(matches ? "list" : "square")
  const searchRef = useRef<HTMLButtonElement>(null)
  const originalSearchQuery = useRef<string>()

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setSearchInput({ [name]: value })
  }

  function handleEnterPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter")
      searchRef.current?.click()
  }

  async function searchMeals(searchParams: {[key:string]: any}) {
    originalSearchQuery.current = searchInput.query
    setSearchResults(null)

    // if(!searchParams.query)
    //   return toast({
    //     title: "Error!",
    //     description: "Search query is empty.",
    //     variant: "destructive"
    //   })

    try {
      setIsFetching(true)
      // const results = await fetchFromAPI("GET", "/api/meals/search", searchParams)
      const results = await fetchTest()
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

  function styleRecipeDetails(recipe: {[key: string]: any}) {
    if(matches) {
      return (
        <div className="aspect-[9/10] min-w-[450px] min-h-[550px] max-w-[675px] max-h-[750px]">
          <div className="overflow-hidden row-span-1 col-span-1 grid grid-rows-1 grid-cols-2 p-2 gap-5 rounded-lg size-full">
            <div className="grid grid-rows-[40%_auto_1fr] grid-cols-[100%] row-span-1 gap-3">
              <div className="overflow-hidden row-span-1 col-span-1 rounded-2xl border-none">
                <img
                  src={recipe.image}
                  alt="Sample Image"
                  className="size-full hover:scale-[105%] transition"
                />
              </div>
              <div className="col-span-1 flex justify-between items-center gap-2 rounded-md *:flex-1 *:flex *:flex-col *:p-2 *:justify-center *:items-center *:bg-orange-500 *:text-white *:rounded-md">
                <div className="flex gap-2">
                  <Clock/>
                  <div className="text-center">
                    <p className="text-white">
                      <b>{recipe.time.readyTime}</b> mins
                    </p>
                    <p className="text-sm">Ready Time</p>
                  </div>
                </div>
                <div className="flex gap-2 my-1">
                  <Microwave/>
                  <div className="text-center">
                    <p className="text-white">
                      {recipe.time.cookTime > 0 ? <><b>{recipe.time.cookTime}</b> mins</> : <b>-</b>}
                    </p>
                    <p className="text-sm">Cook Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 my-1">
                  <Clipboard/>
                  <div className="text-center">
                    <p className="text-white">
                      {recipe.time.prepTime > 0 ? <><b>{recipe.time.prepTime}</b> mins</> : <b>-</b>}
                    </p>
                    <p className="text-sm">Prep Time</p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden bg-orange-100 p-4 flex flex-col rounded-lg">
                <h1 className="text-3xl font-bold">Nutrition</h1>
                <p className="text-sm">Serving Size: {`${recipe.servingSize.amount}${recipe.servingSize.unit}`}</p>
                <ScrollArea className="flex-1 pr-[16px]" type="scroll">
                  {
                    recipe.nutrition.map((nutrition: {[key: string]: any}) => (
                      <div key={nanoid()} className="flex justify-between my-2">
                        <h1 className="text-lg">{nutrition.name} <span className="text-sm text-muted-foreground">({nutrition.unit})</span></h1>
                        <h1 className="bg-orange-600 px-4 w-16 font-medium text-white rounded-full text-center pointer-events-none">
                          {Math.round(nutrition.amount)}
                        </h1>
                      </div>
                    ))
                  }
                </ScrollArea>
              </div>
            </div>
            <div className="grid grid-rows-[minmax(0,_auto)_minmax(40%,_1fr)] grid-cols-1 gap-2">
              <div>
                <DialogTitle className="font-bold text-[min(3vw,_36px)] leading-[min(5vh,_2.25rem)]">
                  {recipe.title}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Link to={recipe.source.url} target="_blank" className="flex justify-center items-center size-8 my-2">
                    <Earth size={32} className="text-muted-foreground hover:scale-110 transition"/>
                  </Link>
                  <p>{recipe.source.name}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                  {recipe.diet.map((diet: string) => <Badge key={nanoid()} className="line-clamp-1 pointer-events-none bg-orange-500">{diet}</Badge>)}
                </div>
                <div className="group grid grid-cols-2 gap-2 mt-2 *:border *:border-slate-300 *:rounded-sm group-hover:bg-orange-500">
                  {
                    recipe.dish.map((dish: string, index: number) => (
                      <h1 key={nanoid()} className={`text-[min(1.5vw,_16px)] hover:cursor-default border border-slate-400 hover:bg-orange-500 hover:text-white transition text-center py-[min(2vh,_6px)] px-3${(index === recipe.dish.length - 1 && index % 2 === 0) && " col-span-2"}`}>
                        {dish}
                      </h1>
                    ))
                  }
                </div>
              </div>
              <div className="grid grid-rows-[minmax(0,_auto)_1fr_minmax(0,_auto)] justify-between gap-2">
                <h1 className="text-2xl font-bold mx-0 my-1">Description</h1>
                <ScrollArea className="pr-5" type="scroll">
                  <DialogDescription className="text-base text-black">
                    {recipe.description}
                  </DialogDescription>
                </ScrollArea>
                <div className="grid grid-cols-3 gap-2 *:bg-orange-500">
                  <Button className="group h-auto flex flex-col items-start px-2 hover:bg-orange-700">
                    <Bookmark/>
                    <Separator className="w-3/4 my-2 group-hover:w-full transition-all"/>
                    <span>Save</span>
                  </Button>
                  <Button className="group h-auto flex flex-col items-start px-2 hover:bg-orange-700">
                    <ExternalLink/>
                    <Separator className="w-3/4 my-2 group-hover:w-full transition-all"/>
                    <span>Share</span>
                  </Button>
                  <Button className="group h-auto flex flex-col items-start px-2 hover:bg-orange-700">
                    <Flag/>
                    <Separator className="w-3/4 my-2 group-hover:w-full transition-all"/>
                    <span>Report</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-1 col-span-1 grid grid-rows-1 grid-cols-2 p-2 gap-4 min-h-auto max-h-full rounded-lg">
            <div className="flex flex-col p-4 border-2 border-slate-200 rounded-md">
              <h1 className="font-bold text-2xl">Ingredients</h1>
              <ScrollArea className="flex-1 mt-2" type="scroll">
                <div className="flex flex-col gap-2">
                  {
                    recipe.ingredients.map((ingredient: {[key: string]: any}) => (
                      <div key={nanoid()} className="bg-slate-200 rounded-md text-center py-2 px-1">
                        <p className="font-bold text-sm text-muted-foreground">
                          {ingredient.amount} {ingredient.unit}
                        </p>
                        <h1 className="text-md font-bold text-wrap">{ingredient.name}</h1>
                      </div>
                    ))
                  }
                </div>
              </ScrollArea>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-orange-100 rounded-lg">
              <h1 className="font-bold text-2xl">Instructions</h1>
              <ScrollArea className="flex-1" type="scroll">
                <div className="flex flex-col gap-5">
                  {recipe.instructions.map((instruction: {[key: string]: any}) => (
                    <div key={nanoid()} className="flex items-start gap-3">
                      <div className="sticky top-0 flex justify-center items-center size-8 bg-orange-500 p-4 text-white rounded-full">
                        {instruction.number}
                      </div>
                      <p>
                        {instruction.step}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="w-[350px] h-[600px]">

        </div>
      )
    }
  }

  function styleSearchResults(layout: string) {
    switch(layout) {
      case "list":
        return searchResults?.map((recipe:any) => (
          <div key={nanoid()} className="overflow-hidden min-h-[225px] flex justify-between rounded-lg border-2 border-slate-200">
            <div className="relative group overflow-hidden flex justify-center items-center basis-1/3 shadow-lg">
              <Dialog>
                <DialogTrigger>
                  <div>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="scale-[175%] lg:scale-[200%] group-hover:scale-[175%] transition"
                    />
                    <div className="opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition"></div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <ScrollArea>
                    {styleRecipeDetails(recipe)}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative flex flex-col justify-between gap-1 basis-2/3 py-3 px-4">
              <h1 className="font-bold text-lg mx-0 pr-2">{recipe.title}</h1>
              {
                recipe.diet.length > 0 && 
                <div className="flex gap-[6px]">
                  { recipe.diet.slice(0, 3).map((diet:string) => <Badge key={nanoid()} className="pointer-events-none bg-orange-500">{diet}</Badge>) }
                </div>
              }            
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center gap-2 my-1">
                  <Zap />
                  <span>
                    <b>{Math.round(recipe.nutrition[0].amount)}</b> cal
                  </span>
                </div>
                <div className="flex items-center gap-2 my-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Clock/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ready Time</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span>
                    <b>{recipe.time.readyTime}</b> mins
                  </span>
                </div>
                {
                  recipe.isHealthy &&
                  <div className="flex gap-2 my-1">
                    <Wheat/>
                    <span>Healthy</span>
                  </div>
                }
              </div>
              <div className="absolute top-4 right-2">
                <Popover>
                  <PopoverTrigger>
                    <EllipsisVertical/>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-4 w-40" side="right" align="start">
                    <div className="flex gap-2">
                      <Bookmark />
                      <span>Save</span>
                    </div>
                    <div className="flex gap-2">
                      <ExternalLink />
                      <span>Share</span>
                    </div>
                    <div className="flex gap-2">
                      <Flag />
                      <span>Report</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {
                  recipe.ingredients.slice(0, 3).map((ingredient:{[key:string]: any}) => (
                    <div key={nanoid()} className="pointer-events-none min-w-8 text-sm p-2 border-2 border-slate-300 rounded-md">
                      {ingredient.name}
                    </div>
                  ))
                }
              </div>
              <div>
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground max-w-[90%]">{recipe.dish.slice(0, 5).join(" · ")}</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                    <Link to={recipe.source.url} target="_blank">
                      <Earth color="#1e293b"/>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      {recipe.source.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              </div>
            </div>
          </div>
        ))
      case "card":
        return searchResults?.map((recipe:any) => (
          <div key={nanoid()} className="overflow-hidden flex flex-col justify-between w-[275px] md:w-[225px] h-[500px] rounded-lg border-2 border-slate-200">
            <div className="group relative overflow-hidden basis-[30%]">
              <Dialog>
                <DialogTrigger>
                  <div>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="scale-[175%] lg:scale-[200%] group-hover:scale-[175%] transition"
                    />
                    <div className="opacity-0 absolute top-0 left-0 size-full bg-black group-hover:opacity-25 transition"></div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <ScrollArea>
                    {styleRecipeDetails(recipe)}
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
            <h1 className="text-center font-bold py-3 px-2">{recipe.title}</h1>
            {
              recipe.diet.length > 0 &&
                <div className="flex flex-wrap justify-center items-center gap-[4px]">
                  { recipe.diet.slice(0, 2).map((diet:string) => <Badge key={nanoid()} className="pointer-events-none bg-orange-500">{diet}</Badge>) }
                </div>
            }
            <div className="flex flex-wrap justify-between items-center py-1 px-3 gap-2">
              <div className="flex flex-wrap justify-center items-center gap-2 my-1">
                <Zap/>
                <span>
                  <b>{Math.round(recipe.nutrition[0].amount)}</b> cal
                </span>
              </div>
              <div className="flex items-center gap-2 my-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Clock/>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ready Time</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span>
                  <b>{recipe.time.readyTime}</b> mins
                </span>
              </div>
            </div>
            <ScrollArea>
              <div className="text-center flex-1 flex flex-col justify-between gap-2 px-3 py-2">
                {
                  recipe.ingredients.slice(0, 3).map((ingredient:{[key:string]: any}) => (
                    <div key={nanoid()} className="pointer-events-none min-w-8 text-sm px-2 py-1 border-2 border-slate-300 rounded-md">
                      {ingredient.name}
                    </div>
                  ))
                }
              </div>
            </ScrollArea>
            <div className="flex justify-between items-end px-3 py-2">
              <p className="text-muted-foreground max-w-[90%]">{recipe.dish.slice(0, 5).join(" · ")}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <Link to={recipe.source.url} target="_blank">
                    <Earth color="#1e293b"/>
                  </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    {recipe.source.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))
      case "square":
        return searchResults?.map((recipe:any) => (
          <div key={nanoid()} className="group relative overflow-hidden aspect-square w-3/4 md:w-full rounded-lg shadow-md">
            <img 
              src={recipe.image}
              alt={recipe.title}
              className="absolute aspect-square w-full"
            />
            <div className="relative z-10 size-full flex flex-col justify-between p-2">
              <div className="flex justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="">
                      <Button className="opacity-75 p-0 size-10 bg-white hover:bg-white hover:opacity-100">
                        <Link to={recipe.source.url} target="_blank">
                          <Earth color="#000000"/>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {recipe.source.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Popover>
                  <PopoverTrigger className="peer">
                    <Button className="opacity-75 p-0 size-10 bg-white transition hover:bg-white hover:opacity-100">
                      <EllipsisVertical color="#000000"/>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-4 w-40" side="bottom" align="end">
                    <div className="flex gap-2">
                      <Bookmark />
                      <span>Save</span>
                    </div>
                    <div className="flex gap-2">
                      <ExternalLink />
                      <span>Share</span>
                    </div>
                    <div className="flex gap-2">
                      <Flag />
                      <span>Report</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="opacity-85 backdrop-blur-sm group group-hover:opacity-15 transition flex justify-center items-center min-h-[60px] p-2 bg-white rounded-md">
                <span className="text-center text-sm font-bold">
                  {recipe.title}
                </span>
              </div>
            </div>
          </div>
        ))
      }
  }

  function controlSearchState() {
    if(searchResults) {
      return (
        <div className="w-full flex flex-col justify-between">
          <p className="italic text-muted-foreground text-sm text-center md:text-left">Tip: Click on a recipe's image to show more details!</p>
          <Tabs defaultValue={selectedLayout} value={selectedLayout} onValueChange={(value:string) => setSelectedLayout((!matches && value === "list") ? "square" : value)}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-center font-bold text-2xl my-4">
                {searchResults.length} {searchResults.length != 1 ? "results": "result"} for {`"${originalSearchQuery.current}"`}
              </h1>
              <TabsList className="flex justify-between w-[250px] md:w-auto">
                <TabsTrigger value="list" className="flex-1">List</TabsTrigger>
                <TabsTrigger value="card" className="flex-1">Card</TabsTrigger>
                <TabsTrigger value="square" className="flex-1">Square</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="list">
              {
                searchResults?.length > 0
                  ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {styleSearchResults(matches ? "list" : "square")}
                    </div>
                  : <div className="flex flex-col items-center gap-2 text-center">
                      <img 
                        src={noResultsImage}
                        alt="No results found image"
                        className="w-[350px]"
                      />
                      <h1 className="font-bold text-3xl">No results found!</h1>
                      <p>Try making another search!</p>
                    </div>
              }
            </TabsContent>
            <TabsContent value="card">
              {
                searchResults?.length > 0
                ? <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4">
                    {styleSearchResults("card")}
                  </div>
                : <div className="flex flex-col items-center gap-2 text-center">
                    <img 
                      src={noResultsImage}
                      alt="No results found image"
                      className="w-[350px]"
                    />
                    <h1 className="font-bold text-3xl">No results found!</h1>
                    <p>Try making another search!</p>
                  </div>
              }
            </TabsContent>
            <TabsContent value="square">
              {
                searchResults?.length > 0
                  ? <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6">
                      {styleSearchResults("square")}
                    </div>
                  : <div className="flex flex-col items-center gap-2 text-center">
                      <img 
                        src={noResultsImage}
                        alt="No results found image"
                        className="w-[350px]"
                      />
                      <h1 className="font-bold text-3xl">No results found!</h1>
                      <p>Try making another search!</p>
                    </div>
              }
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
          {loadSkeletons((!matches && selectedLayout === "list") ? "square" : selectedLayout)}
        </div>
      )
    } else {
      return (
        <div className="aspect-square w-[65%] md:size-[500px] flex flex-col justify-center items-center gap-2 text-center border-2 border-dashed border-slate-400 p-6 rounded-2xl">
          <img
            src={searchIcon}
            alt="Magnifying Glass | Credit: svstudioart (https://www.freepik.com/free-vector/magnifying-glass-vector-illustration_178790648.htm#fromView=search&page=1&position=32&uuid=ee9a7ab1-0bd7-4c7b-b1ab-b3af2f5aee09)"
            className="aspect-square w-1/2"
          />
          <h1 className="font-bold text-[5vw] md:text-3xl">Your results will appear here</h1>
          <p className="text-lg">Start searching!</p>
        </div>
      )
    }
  }

  function loadSkeletons(layout: string) {
    switch(layout) {
      case "list":
        return (
          <div className="flex flex-col w-full gap-5">
            <ListSkeleton/>
            <ListSkeleton/>
          </div>
        )
      case "card":
        return (
          <div className="w-full flex flex-col justify-center items-center md:flex-row md:flex-wrap md:justify-between">
            <CardSkeleton/>
            {
              matches && 
              <>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
              </>
            }
            
          </div>
        )
      case "square":
        return (
          <div className="flex flex-col flex-wrap justify-center items-center gap-5 md:flex-row md:justify-between lg:justify-center lg:gap-16 py-5">
            <SquareSkeleton/>
            <SquareSkeleton/>
            {
              matches && 
                <>
                  <SquareSkeleton/>
                  <SquareSkeleton/>
                </>
            }
          </div>
        )
    }
  }
  
  return (
    <div className="flex-1 flex flex-col justify-start items-center *:p-6">
      <div className="overflow-hidden relative flex flex-col gap-4 justify-between items-center w-full">
        <h1 className="font-bold text-4xl">New Meal Search</h1>
        <p className="text-muted-foreground mb-2">
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
            onClick={() => searchMeals(searchInput)}
            ref={searchRef}
          >
            <Search/>
          </Button>
        </div>
      </div>
      <div className="container flex flex-col items-center gap-3">
        {controlSearchState()}
      </div>
      <div className="absolute bottom-0 right-0">
        <Toaster/>
      </div>
    </div>
  )
}