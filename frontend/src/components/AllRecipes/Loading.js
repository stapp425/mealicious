import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { AppContext } from "@/App";
import { useContext } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { nanoid } from "nanoid";
export default function Loading() {
    const { screenSizes: { xl } } = useContext(AppContext);
    return (_jsx(_Fragment, { children: xl ? new Array(4).fill(undefined).map((_ => _jsx(List, {}, nanoid()))) : new Array(4).fill(undefined).map((_ => _jsx(Square, {}, nanoid()))) }));
}
function List() {
    return _jsx(Skeleton, { className: "min-h-[225px] w-full rounded-lg bg-slate-300" });
}
function Square() {
    return _jsx(Skeleton, { className: "aspect-square min-h-[225px] w-full rounded-lg bg-slate-300" });
}
