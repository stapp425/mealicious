export type UserInput = {
    name: {
        first: string;
        last: string;
        display: string;
    };
    email: string;
    password: string;
    confirmPassword: string;
};
export declare function createUser(userInput: UserInput): Promise<void>;
export declare function signIn(email: string, password: string): Promise<void>;
export declare function signInWithGoogle(): Promise<void>;
export declare function signOut(): Promise<void>;
export declare function resetPassword(email: string): Promise<void>;
