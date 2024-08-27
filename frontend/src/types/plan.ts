import { now } from "@/util/hooks"
<<<<<<< HEAD
import { defaultMeal, isMeal, type Meal } from "./meal"
=======
import { isMeal, type Meal } from "./meal"
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
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
<<<<<<< HEAD
  meals: Meal[]
=======
  meals: (string | Meal)[]
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
  id?: string
  userId?: string
}

export const defaultPlan: Plan = {
  date: now,
  title: "",
  meals: [],
}

export function isDate(value: Date | Timestamp): value is Date {
  return value instanceof Date
}

export function isTimestamp(value: Date | Timestamp): value is Timestamp {
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
<<<<<<< HEAD

export function formatPlans(plans: Plan[], meals: Meal[]): (Plan & { meals: Meal[] })[] {
  return plans.map(plan => ({
    ...plan,
    meals: plan.meals.map(meal => isMeal(meal) ? meal : meals.find(m => m.id === meal) || defaultMeal)
  }))
}
=======
>>>>>>> 3a832f9e04d7f95afbafe0543fc1043ffd7e7c88
