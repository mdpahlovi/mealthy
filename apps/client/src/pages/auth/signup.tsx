import * as yup from "yup";
import { Link } from "@/components/ui";
import AuthLayout from "@/layouts/auth";
import { useMutation } from "react-query";
import { baseAxios } from "@/utilities/axios";
import { Stack, Typography } from "@mui/material";
import { Form, FormInput, FormSubmit } from "@/components/form";

const signupSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
    c_password: yup
        .string()
        .required("Please retype your password.")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const signupUser = async (credentials: { name: string; email: string; password: string }) => {
    return await baseAxios.post("/auth/signup", credentials);
};

export default function Signup() {
    const { mutate, isLoading } = useMutation(signupUser, {
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
                    Signup
                </Typography>
                <Typography color="text.secondary">
                    Already have an account? <Link to="/signin">Signin</Link>
                </Typography>
            </Stack>

            <Form
                defaultValues={{ first_name: "", last_name: "", email: "", password: "", c_password: "" }}
                validationSchema={signupSchema}
                onSubmit={({ first_name, last_name, c_password, ...data }) => mutate({ name: `${first_name} ${last_name}`, ...data })}
            >
                <Stack direction={{ sm: "row" }} gap={3}>
                    <FormInput name="first_name" label="First Name" />
                    <FormInput name="last_name" label="Last Name" />
                </Stack>
                <FormInput type="email" name="email" label="Your Email" />
                <FormInput type="password" name="password" label="Your Password" />
                <FormInput type="password" name="c_password" label="Confirm Password" />
                <FormSubmit loading={isLoading}>Signup</FormSubmit>
            </Form>
        </AuthLayout>
    );
}
