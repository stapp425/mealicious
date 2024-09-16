declare const _default: {
    resultIndex: number;
    title: string;
    image: string;
    description: string;
    source: {
        name: string;
        url: string;
    };
    diets: string[];
    dishTypes: string[];
    isHealthy: boolean;
    times: {
        prepTime: number;
        cookTime: number;
        readyTime: number;
    };
    servingSize: {
        amount: number;
        unit: string;
    };
    nutrition: {
        name: string;
        amount: number;
        unit: string;
    }[];
    ingredients: {
        name: string;
        amount: number;
        unit: string;
    }[];
    instructions: {
        number: number;
        step: string;
        ingredients: {
            name: string;
            image: string;
        }[];
    }[];
}[];
export default _default;
export declare const firestoreData: {
    title: string;
    source: {
        url: string;
        name: string;
    };
    ingredients: {
        name: string;
        amount: number;
        unit: string;
    }[];
    userId: string;
    instructions: {
        number: number;
        ingredients: {
            image: string;
            name: string;
        }[];
        step: string;
    }[];
    dishTypes: string[];
    times: {
        cookTime: number;
        prepTime: number;
        readyTime: number;
    };
    servingSize: {
        unit: string;
        amount: number;
    };
    image: string;
    diets: string[];
    description: string;
    nutrition: {
        amount: number;
        unit: string;
        name: string;
    }[];
    isHealthy: boolean;
    id: string;
}[];
export declare const sampleFullRecipe: {
    source: {
        url: string;
        name: string;
    };
    diets: string[];
    isHealthy: boolean;
    isFavorite: boolean;
    servingSize: {
        amount: number;
        unit: string;
    };
    description: string;
    times: {
        prepTime: number;
        cookTime: number;
        readyTime: number;
    };
    nutrition: {
        amount: number;
        name: string;
        unit: string;
    }[];
    ingredients: {
        unit: string;
        name: string;
        amount: number;
    }[];
    instructions: {
        number: number;
        ingredients: {
            image: string;
            name: string;
        }[];
        step: string;
    }[];
    title: string;
    userId: string;
    dishTypes: string[];
    image: string;
    id: string;
};
