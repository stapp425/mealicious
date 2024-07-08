import { type User } from "firebase/auth"

export type CurrentUser = User | null

export type Layout = "list" | "card" | "square"

export type Breakpoints = {
  any: boolean; sm: boolean
  md: boolean; lg: boolean
  xl: boolean; xxl: boolean
}