import { type DocumentSnapshot, type Query, Timestamp } from "firebase/firestore";
import { type FirestoreCollection, type Obj } from "@/types/app";
interface HasDate extends Obj {
    date: Date | Timestamp;
}
export declare const now: Date;
type Adjacent = {
    previous: string;
    next: string;
};
export declare function useEventCalendar<T extends HasDate>(data: T[]): {
    currentDay: Date;
    setDay: (input: number) => void;
    setWeek: (input: number) => void;
    setMonth: (input: number) => void;
    setYear: (input: number) => void;
    getEventsOfInterval: (start: Date, end: Date) => T[];
    adjacentDates: {
        day: Adjacent;
        week: Adjacent;
        month: Adjacent;
        year: Adjacent;
    };
    calendar: {
        day: Date;
        week: Date[];
        month: Date[];
        year: Date[][];
    };
    currentEvents: {
        day: T[];
        week: T[];
        month: T[];
        year: T[];
    };
};
export declare function useFirestoreFetch<T>(query: Query, formatFunction: (value: T[]) => Promise<T[]>, initialData?: T[]): {
    isFetching: boolean;
    data: T[];
    setData: import("react").Dispatch<import("react").SetStateAction<T[]>>;
};
export declare function useFirestoreGet<T>(path: FirestoreCollection, id: string, formatFunction: (value: T) => Promise<T>, initialData: T): {
    isFetching: boolean;
    data: T;
    fetchData: () => Promise<void>;
};
export declare function useFirestoreUpdate<T extends Obj>(): {
    isWorking: boolean;
    updateFirestoreDoc: (path: FirestoreCollection, id: string, data: T) => Promise<void>;
};
export declare function useFirestorePost<T extends Obj>(): {
    isWorking: boolean;
    addFirestoreDoc: (path: FirestoreCollection, data: T) => Promise<DocumentSnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
};
export declare function useFirestoreDelete(): {
    isWorking: boolean;
    deleteFirestoreDoc: (path: FirestoreCollection, id: string) => Promise<void>;
};
export declare function useStorageUpload(): {
    isUploading: boolean;
    uploadFile: (file: File, fileName: string) => Promise<string>;
};
export declare function useStorageDelete(): {
    isDeleting: boolean;
    deleteFile: (fileName: string) => Promise<void>;
};
export declare function useScroll(): {
    x: number;
    y: number;
};
export declare function useInputChange<T extends Obj>(initialInput: T): {
    input: T;
    isEditActive: boolean;
    setIsEditActive: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setInput: import("react").Dispatch<import("react").SetStateAction<T>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
export {};
