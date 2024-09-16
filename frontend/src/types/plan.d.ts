import { type Meal } from "./meal";
import { Timestamp } from "firebase/firestore";
export type Macronutrient = {
    amount: number;
    unit: string;
};
export type Plan = {
    date: Date;
    title: string;
    description?: string;
    tags?: string[];
    meals: Meal[];
    id?: string;
    userId?: string;
};
export declare const defaultPlan: Plan;
export declare function isDate(value: unknown): value is Date;
export declare function isTimestamp(value: unknown): value is Timestamp;
export declare function isPlan(value: unknown): value is Plan;
export declare function formatDate(date: Date | Timestamp): Date;
export declare function formatPlan(plan: Plan): Promise<{
    date: Date;
    meals: Meal[];
    title: string;
    description?: string;
    tags?: string[];
    id?: string;
    userId?: string;
}>;
export declare function formatPlans(plans: Plan[]): Promise<Plan[]>;
