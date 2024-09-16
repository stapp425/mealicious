import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { AppContext } from "@/App";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading({ layout }) {
    const { screenSizes: matches } = useContext(AppContext);
    switch (layout) {
        case "list":
            return (_jsxs("div", { className: "flex flex-col w-full gap-5", children: [_jsx(ListSkeleton, {}), _jsx(ListSkeleton, {})] }));
        case "card":
            return (_jsxs("div", { className: "w-full flex flex-col justify-center items-center md:flex-row md:flex-wrap md:justify-between", children: [_jsx(CardSkeleton, {}), matches.md &&
                        _jsxs(_Fragment, { children: [_jsx(CardSkeleton, {}), _jsx(CardSkeleton, {}), _jsx(CardSkeleton, {})] })] }));
        case "square":
            return (_jsxs("div", { className: "flex flex-col flex-wrap justify-center items-center gap-5 md:flex-row md:justify-between lg:justify-center lg:gap-16 py-5", children: [_jsx(SquareSkeleton, {}), _jsx(SquareSkeleton, {}), matches.md &&
                        _jsxs(_Fragment, { children: [_jsx(SquareSkeleton, {}), _jsx(SquareSkeleton, {})] })] }));
    }
}
function ListSkeleton() {
    return (_jsxs("div", { className: "overflow-hidden min-h-[225px] w-full md:w-[650px] flex justify-between gap-4", children: [_jsx(Skeleton, { className: "basis-1/3 rounded-2xl" }), _jsxs("div", { className: "relative flex flex-col justify-between gap-1 basis-2/3", children: [_jsx(Skeleton, { className: "h-7 w-3/4" }), _jsx(Skeleton, { className: "h-7 w-1/2" }), _jsx(Skeleton, { className: "h-20" }), _jsxs("div", { className: "flex justify-between items-center gap-4", children: [_jsx(Skeleton, { className: "w-full h-6" }), _jsx(Skeleton, { className: "h-6 w-6 rounded-full" })] })] })] }));
}
function CardSkeleton() {
    return (_jsxs("div", { className: "grid place-items-center *:size-[calc(100%-15px)] grid-rows-[40%_1fr] grid-cols-1 overflow-hidden justify-between w-[275px] md:w-[225px] h-[500px] rounded-lg", children: [_jsx(Skeleton, {}), _jsxs("div", { className: "grid place-items-center grid-rows-6 grid-cols-1 *:h-[calc(100%-15px)] *:w-full", children: [_jsx(Skeleton, { className: "row-span-1 col-span-1 p-2" }), _jsx(Skeleton, { className: "row-span-1 col-span-1" }), _jsx(Skeleton, { className: "row-span-1 col-span-1" }), _jsx(Skeleton, { className: "row-span-2 col-span-1" }), _jsxs("div", { className: "grid grid-rows-1 grid-cols-[1fr_auto] gap-4", children: [_jsx(Skeleton, { className: "row-span-1 col-span-1" }), _jsx(Skeleton, { className: "row-span-1 col-span-1 aspect-square rounded-full" })] })] })] }));
}
function SquareSkeleton() {
    return (_jsxs("div", { className: "flex-1 flex flex-col p-[10px] justify-between gap-4 aspect-square w-3/4 md:w-full", children: [_jsxs("div", { className: "flex justify-between gap-4", children: [_jsx(Skeleton, { className: "aspect-square w-10" }), _jsx(Skeleton, { className: "flex-1" }), _jsx(Skeleton, { className: "aspect-square w-10" })] }), _jsx(Skeleton, { className: "flex-1" }), _jsx(Skeleton, { className: "h-12" })] }));
}
