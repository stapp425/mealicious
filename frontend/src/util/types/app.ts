import { type User } from "firebase/auth"
import { collection, limit, query, Query, where } from "firebase/firestore"
import { firestore } from "@/../firebaseConfig"
import { LucideProps } from "lucide-react"

export type Operation = "create" | "replace" | "update" | "remove"
export type ActiveSection = "dashboard" | "recipes" | "meals" | "plans"
type Option = "add" | "remove" | "update" | "format"

export type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export type RefComponent<T, K> = React.ForwardRefExoticComponent<K & React.RefAttributes<T>>

export type LucideIcon = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>

export function modifyData<T extends { id?: string }>(original: T[], option: Option, data?: T): T[] {
  if(option === "format") {
    if(data) throw new Error("Formatting does not require a target data for processing")
    return original
  } else {
    if(!data) throw new Error("A modification to the original list must require data")
  }

  let temp = [...original]

  if(data) {
    switch(option) {
      case "add":
        temp.push(data)
        break
      case "remove":
        temp = original.filter(d => d.id !== data.id)
        break
      case "update":
        temp = original.map(d => d.id === data.id ? data : d)
        break
    }
  }

  return temp
}

export type FetchQueries = {[K in FirestoreCollection]?: Query | undefined}

export type Obj = {[key: string]: unknown}

export type CurrentUser = User | null

export type Layout = "list" | "card" | "square"

export type Breakpoints = {
  any: boolean; sm: boolean
  md: boolean; lg: boolean
  xl: boolean; xxl: boolean
}

export type App = {
  activeSection: ActiveSection
  changeActiveSection: (value: ActiveSection) => void,
  date: Date,
  user: CurrentUser
  screenSizes: Breakpoints
}

export type Image = {
  file: File | undefined
  name: string
  type: string
  url: string
}

export type FirestoreCollection = "recipes" | "meals" | "users" | "plans"

export function createQuery(user: User, path: FirestoreCollection, options?: { limit?: number }): Query {
  if(options && options.limit)
    return query(collection(firestore, path), where("userId", "==", user.uid), limit(options.limit))
  
  return query(collection(firestore, path), where("userId", "==", user.uid))
}