import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { resetPassword } from "@/util/auth";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import AuthInput from "./AuthInput";
import Button from "../Theme/Button";
const ForgotPassword = () => {
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: "" } });
    const submitResetPassword = async (data) => {
        try {
            await resetPassword(data.email);
            toast({
                title: "Success!",
                description: "A prompt has been sent to your email.",
                variant: "theme"
            });
        }
        catch (err) {
            toast({
                title: "Error!",
                description: "This email does not exist in our system.",
                variant: "destructive"
            });
        }
    };
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx("button", { className: "text-center text-orange-500 hover:text-orange-600", children: "Forgot your password?" }) }), _jsx(DialogContent, { className: "p-6 w-[450px]", children: _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "font-bold text-xl", children: "Reset Password" }), _jsx(DialogDescription, { className: "font-[600]", children: "Enter an email below to reset its password. Please note that this email must be already in our systems." }), _jsxs("form", { onSubmit: handleSubmit(submitResetPassword), className: "pt-2 space-y-4", children: [_jsx(AuthInput, { id: "email", label: "E-Mail", ...register("email", {
                                        required: "An email is required",
                                        pattern: {
                                            value: /(^[^\s@]+@[^\s@]+\.[^\s@]+$)/,
                                            message: "Not a valid email format"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Cannot exceed 20 characters long"
                                        }
                                    }), errorMessage: errors.email?.message, placeholder: "example@domain.com" }), _jsx(DialogFooter, { children: _jsx(Button, { children: "Reset Password" }) })] })] }) })] }));
};
export default ForgotPassword;
