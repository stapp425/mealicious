import { RequiredSingleField } from "@/types/form";
import { Recipe } from "@/types/recipe";
import { type Image } from "@/types/app";
import { type UseFormSetValue } from "react-hook-form";
type RequiredWithSet = RequiredSingleField<Recipe> & {
    setValue: UseFormSetValue<Recipe>;
    image: Image;
    setImage: React.Dispatch<React.SetStateAction<Image>>;
};
declare const Image: React.FC<RequiredWithSet>;
export default Image;
