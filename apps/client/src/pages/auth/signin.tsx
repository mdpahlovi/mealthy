import axios from "axios";
import * as yup from "yup";
import { Link } from "@/components/ui";
import AuthLayout from "@/layouts/auth";
import { useMutation } from "react-query";
import { Stack, Typography } from "@mui/material";
import { Form, FormInput, FormSubmit } from "@/components/form";

const signinSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
});

const signinUser = async (credentials: { email: string; password: string }) => {
    const response = await axios.post("/auth/signin", credentials);
    return response.data;
};

export default function Signin() {
    const { mutate, isLoading } = useMutation(signinUser, {
        onSuccess: (data) => {
            console.log("Sign-in successful:", data);
        },
        onError: (error) => {
            console.error("Sign-in error:", error);
        },
    });

    return (
        <AuthLayout>
            <Stack gap={1}>
                <Typography variant="h4" fontWeight={800}>
                    Signin
                </Typography>
                <Typography color="text.secondary">
                    Don&apos;t have an account? <Link to="/signup">Signup</Link>
                </Typography>
            </Stack>

            <Form defaultValues={{ email: "", password: "" }} validationSchema={signinSchema} onSubmit={(data) => mutate(data)}>
                <FormInput type="email" name="email" label="Your Email" />
                <FormInput type="password" name="password" label="Your Password" />
                <Link to="/signin" sx={{ mt: 1, ml: "auto" }}>
                    Forget Password
                </Link>
                <FormSubmit loading={isLoading}>Signin</FormSubmit>
            </Form>
        </AuthLayout>
    );
}
