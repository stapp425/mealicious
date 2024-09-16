type Props = {
    isDeleting: boolean;
    deleteRecipe: (id: string) => void;
    id: string;
};
declare const Delete: React.FC<Props>;
export default Delete;
