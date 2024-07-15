import { ScreenContext } from "@/App"
import { Breakpoints } from "@/types/other"
import { useContext } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { nanoid } from "nanoid"
export default function Loading(): React.ReactElement {
  const { xl } = useContext<Breakpoints>(ScreenContext)
  
  return (
    <>
      { xl ? new Array(4).fill(undefined).map((_ => <List key={nanoid()}/>)) : new Array(4).fill(undefined).map((_ => <Square key={nanoid()}/>)) }
    </>
  )
}

function List(): React.ReactElement {
  return <Skeleton className="min-h-[225px] w-full rounded-lg bg-slate-300"/>
}

function Square(): React.ReactElement {
  return <Skeleton className="aspect-square min-h-[225px] w-full rounded-lg bg-slate-300"/>
}