import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import Spinner from "../ui/Spinner";
const Delete = ({ isDeleting, id, deleteRecipe }) => {
    return (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { className: "w-full", asChild: true, children: _jsxs("button", { className: "flex justify-between items-center gap-2 py-1 px-2 text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition rounded-md", children: [_jsx("span", { className: "font-[600] text-sm", children: "Delete" }), _jsx(Trash2, { size: 18 })] }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: _jsx("h1", { className: "font-bold text-2xl", children: "Are you sure?" }) }), _jsx(AlertDialogDescription, { children: _jsx("p", { className: "text-base", children: "Deleting this recipe will permanently remove it! This action cannot be undone." }) })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: () => deleteRecipe(id), className: "bg-red-500", children: isDeleting
                                    ? _jsxs("div", { children: [_jsx("span", { children: "Working on it..." }), _jsx(Spinner, {})] })
                                    : "Continue" })] })] })] }));
};
export default Delete;
