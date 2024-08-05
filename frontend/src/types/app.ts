import { type User } from "firebase/auth"

export type App = {
  user: CurrentUser,
  screenSizes: Breakpoints
}

export type Obj = {[key: string]: unknown}

export type CurrentUser = User | null

export type Layout = "list" | "card" | "square"

export type Section = "title" | "description" | "nutrition" | "ingredients" | "instructions"

export type Breakpoints = {
  any: boolean; sm: boolean
  md: boolean; lg: boolean
  xl: boolean; xxl: boolean
}

export type Image = {
  file: File | undefined
  name: string
  type: string
  url: string
}

export type FirestoreCollection = "recipes" | "meals" | "users"