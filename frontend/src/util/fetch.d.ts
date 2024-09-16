import { type Recipe } from "@/types/recipe";
export default function fetchFromAPI(httpMethod: string, path: string, queries?: {
    [key: string]: any;
} | null, headers?: any, body?: any): Promise<Recipe[]>;
