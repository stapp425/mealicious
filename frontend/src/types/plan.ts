import { formatMeals, isMeal, type Meal } from "./meal"
import { Timestamp } from "firebase/firestore"

export type Macronutrient = {
  amount: number
  unit: string
}

export type Plan = {
  date: Date
  title: string
  description?: string
  tags?: string[]
  meals: Meal[]
  id?: string
  userId?: string
}

export const defaultPlan: Plan = {
  date: new Date(),
  title: "",
  description: "",
  tags: [],
  meals: [],
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date
}

export function isTimestamp(value: unknown): value is Timestamp {
  return value instanceof Timestamp
}

export function isPlan(value: unknown): value is Plan {
  const planVal = value as Plan
  
  return (
    planVal != null &&
    typeof planVal === "object" &&
    "date" in planVal && planVal.date instanceof Date &&
    "title" in planVal && typeof planVal.title === "string" &&
    (planVal.description === undefined || typeof planVal.description === "string") &&
    (
      planVal.tags === undefined || 
      (Array.isArray(planVal.tags) && planVal.tags.every(tag => typeof tag === "string"))
    ) &&
    (
      "meals" in planVal &&
      Array.isArray(planVal.meals) &&
      planVal.meals.every(meal => isMeal(meal) || typeof meal === "string")
    ) &&
    (planVal.id === undefined || typeof planVal.id === "string") &&
    (planVal.userId === undefined || typeof planVal.userId === "string")
  )
}

export function formatDate(date: Date | Timestamp) {
  if(isDate(date))
    return date
  else if(isTimestamp(date))
    return date.toDate()
  
  throw new Error("Unrecognized date type found")
}

export async function formatPlan(plan: Plan) {
  return {
    ...plan,
    date: formatDate(plan.date),
    meals: await formatMeals(plan.meals)
  }
}

export async function formatPlans(plans: Plan[]): Promise<Plan[]> {
  return await Promise.all(plans.map(plan => formatPlan(plan)))
}
