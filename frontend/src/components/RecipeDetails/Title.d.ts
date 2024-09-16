type Props = {
    className?: string;
    title: string;
    isFavorite: boolean;
    image: string;
    times: {
        readyTime: number;
        cookTime: number;
        prepTime: number;
    };
    diets?: string[];
    dishTypes?: string[];
    source?: {
        name: string;
        url: string;
    };
};
declare const Title: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLDivElement>>;
export default Title;
