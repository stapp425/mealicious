import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "@/util/auth";
import siteLogo from "@/img/logo/mealicious-logo.svg";
import loginImage from "@/img/login-page.jpg";
import { useForm } from "react-hook-form";
import AuthInput from "./AuthInput";
import GoogleButton from "./GoogleButton";
import ForgotPassword from "./ForgotPassword";
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const submitUserInput = async (data) => {
        const { email, password } = data;
        try {
            await signIn(email, password);
        }
        catch (err) {
            toast({
                title: "Uh Oh!",
                description: "Invalid username/password." || err.message,
                variant: "destructive"
            });
        }
    };
    useEffect(() => {
        document.title = "Login | Mealicious";
    }, []);
    return (_jsxs("form", { onSubmit: handleSubmit(submitUserInput), className: "size-full grid grid-cols-1 md:grid-cols-2 gap-x-4 *:py-0", children: [_jsx("div", { className: "justify-self-center", children: _jsx("img", { src: siteLogo, alt: "Mealicious Logo", className: "w-[200px] pt-4" }) }), _jsxs("div", { className: "text-center flex flex-col justify-center items-center -mt-4", children: [_jsx("h1", { className: "font-bold text-3xl", children: "Welcome Back!" }), _jsx("p", { className: "text-muted-foreground", children: "Log In to Continue" })] }), _jsx(AuthInput, { id: "email", label: "E-Mail", ...register("email", {
                    required: "E-mail is required",
                    pattern: {
                        value: /(^[^\s@]+@[^\s@]+\.[^\s@]+$)/,
                        message: "Not a valid email format"
                    },
                    maxLength: {
                        value: 20,
                        message: "Cannot exceed 20 characters long"
                    }
                }), placeholder: "E-Mail", errorMessage: errors.email?.message, autoFocus: true, className: "px-6" }), _jsx(AuthInput.Password, { id: "password", label: "Password", ...register("password", {
                    required: "A password is required",
                    minLength: {
                        value: 5,
                        message: "Must contain at least 5 characters"
                    },
                    maxLength: {
                        value: 20,
                        message: "Cannot exceed 20 characters"
                    }
                }), placeholder: "Password", errorMessage: errors.password?.message }), _jsx("hr", { className: "or" }), _jsx(GoogleButton, { mode: "login" }), _jsxs("div", { className: "flex flex-col justify-center px-6", children: [_jsx(ForgotPassword, {}), _jsx("button", { type: "submit", className: "self-stretch px-6 py-3 bg-orange-500 hover:bg-orange-700 transition text-white font-bold rounded-md my-2", children: "Log In" })] }), _jsxs("div", { className: "text-center", children: ["Don't have an account? | ", _jsx(Link, { to: "/auth/register", className: "text-orange-500 hover:text-orange-700", children: "Sign Up" })] }), _jsx("div", { className: "hidden md:flex justify-center items-center bg-orange-500 row-start-1 col-start-2 row-span-8 rounded-lg overflow-hidden", children: _jsx("img", { src: loginImage, alt: "Credit: Julie Aagaard (https://www.pexels.com/photo/salad-on-a-plate-2097090/)", className: "h-full" }) })] }));
}
