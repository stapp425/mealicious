import { ScreenContext } from "@/App"
import { Skeleton } from "@/components/ui/skeleton"
import { Breakpoints, Layout } from "@/types/other"
import { useContext } from "react"

type Props = {
  layout: Layout
}

export default function Loading({ layout }: Props) {
  const matches = useContext<Breakpoints>(ScreenContext)
  
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
            matches.md && 
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
            matches.md && 
              <>
                <SquareSkeleton/>
                <SquareSkeleton/>
              </>
          }
        </div>
      )
  }
}

function ListSkeleton() {
  return (
    <div className="overflow-hidden min-h-[225px] w-full md:w-[650px] flex justify-between gap-4">
      <Skeleton className="basis-1/3 rounded-2xl"/>
      <div className="relative flex flex-col justify-between gap-1 basis-2/3">
        <Skeleton className="h-7 w-3/4"/>
        <Skeleton className="h-7 w-1/2"/>
        <Skeleton className="h-20"/>
        <div className="flex justify-between items-center gap-4">
          <Skeleton className="w-full h-6"/>
          <Skeleton className="h-6 w-6 rounded-full"/>
        </div>
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="grid place-items-center *:size-[calc(100%-15px)] grid-rows-[40%_1fr] grid-cols-1 overflow-hidden justify-between w-[275px] md:w-[225px] h-[500px] rounded-lg">
      <Skeleton/>
      <div className="grid place-items-center grid-rows-6 grid-cols-1 *:h-[calc(100%-15px)] *:w-full">
        <Skeleton className="row-span-1 col-span-1 p-2"/>
        <Skeleton className="row-span-1 col-span-1"/>
        <Skeleton className="row-span-1 col-span-1"/>
        <Skeleton className="row-span-2 col-span-1"/>
        <div className="grid grid-rows-1 grid-cols-[1fr_auto] gap-4">
          <Skeleton className="row-span-1 col-span-1"/>
          <Skeleton className="row-span-1 col-span-1 aspect-square rounded-full"/>
        </div>
      </div>
    </div>
  )
}

function SquareSkeleton() {
  return (
    <div className="flex-1 flex flex-col p-[10px] justify-between gap-4 aspect-square w-3/4 md:w-full">
      <div className="flex justify-between gap-4">
        <Skeleton className="aspect-square w-10"/>
        <Skeleton className="flex-1"/>
        <Skeleton className="aspect-square w-10"/>
      </div>
      <Skeleton className="flex-1"/>
      <Skeleton className="h-12"/>
    </div>
  )
}