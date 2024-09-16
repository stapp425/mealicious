import { type User } from "firebase/auth";
import { Query } from "firebase/firestore";
export type Operation = "create" | "replace" | "update" | "remove";
type Option = "add" | "remove" | "update" | "format";
export declare function modifyData<T extends {
    id?: string;
}>(original: T[], option: Option, data?: T): T[];
export type FetchQueries = {
    [K in FirestoreCollection]?: Query | undefined;
};
export type Obj = {
    [key: string]: unknown;
};
export type CurrentUser = User | null;
export type Layout = "list" | "card" | "square";
export type Breakpoints = {
    any: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    xxl: boolean;
};
export type App = {
    date: Date;
    user: CurrentUser;
    screenSizes: Breakpoints;
};
export type Image = {
    file: File | undefined;
    name: string;
    type: string;
    url: string;
};
export type FirestoreCollection = "recipes" | "meals" | "users" | "plans";
export declare function createQuery(user: User, path: FirestoreCollection, options?: {
    limit?: number;
}): Query;
export {};
