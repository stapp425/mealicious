import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFirestoreUpdate } from "@/util/hooks";
import { ArrowDownToLine, Heart, Pencil } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useToast } from "@/components/ui/use-toast";
const Options = ({ className, recipe, content, isFavorite, setIsFavorite }) => {
    const { toast } = useToast();
    const { isWorking, updateFirestoreDoc } = useFirestoreUpdate();
    const [isPrinterWindowOpen, setIsPrinterWindowOpen] = useState(false);
    const handlePrint = useReactToPrint({
        documentTitle: recipe.title.toLowerCase().replace(/ /g, "-"),
        content: () => content,
        onBeforePrint: () => setIsPrinterWindowOpen(true),
        onAfterPrint: () => setIsPrinterWindowOpen(false)
    });
    async function toggleFavorite() {
        try {
            setIsFavorite(f => !f);
            await updateFirestoreDoc("recipes", recipe.id, { isFavorite: !recipe.isFavorite });
        }
        catch (err) {
            toast({
                title: "Error!",
                description: err.message,
                variant: "destructive"
            });
        }
    }
    return (_jsxs("div", { className: className, children: [_jsx("h1", { className: "hidden md:flex md:flex-col font-bold text-2xl py-2 mb-2", children: "Options" }), _jsxs("div", { className: "overflow-hidden flex flex-col border border-slate-400 rounded-md", children: [_jsxs(Link, { to: `/recipes/edit/${recipe.id}`, className: "flex justify-between py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all border-b border-b-slate-400", children: [_jsx("span", { className: "font-[600]", children: "Edit Recipe" }), _jsx(Pencil, {})] }), _jsxs("button", { onClick: toggleFavorite, disabled: isWorking, className: "disabled:cursor-wait flex justify-between py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all border-b border-b-slate-400", children: [_jsx("span", { className: "font-[600]", children: isFavorite ? "Unfavorite" : "Favorite" }), _jsx(Heart, {})] }), _jsxs("button", { onClick: handlePrint, disabled: isPrinterWindowOpen, className: "disabled:cursor-wait flex justify-between py-4 px-3 hover:bg-orange-500 hover:text-white hover:font-[600] transition-all", children: [_jsx("span", { className: "font-[600]", children: isPrinterWindowOpen ? "Working on It..." : "Save as PDF" }), _jsx(ArrowDownToLine, {})] })] })] }));
};
export default Options;
