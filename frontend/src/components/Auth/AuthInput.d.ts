import { ChangeHandler } from "react-hook-form";
import { Input } from "../ui/input";
type ComponentWithRef<T, K> = React.ForwardRefExoticComponent<K & React.RefAttributes<T>>;
type InputProps = {
    className?: string;
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    name: string;
    id: string;
    label: string;
    placeholder?: string;
    errorMessage?: string;
    autoFocus?: boolean;
};
type Input = {
    Password: ComponentWithRef<HTMLInputElement, InputProps>;
} & ComponentWithRef<HTMLInputElement, InputProps>;
declare const AuthInput: Input;
export default AuthInput;
