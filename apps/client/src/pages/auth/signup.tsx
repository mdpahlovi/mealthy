import * as yup from "yup";
import toast from "react-hot-toast";
import { Link } from "@/components/ui";
import AuthLayout from "@/layouts/auth";
import { useMutation } from "react-query";
import { baseAxios } from "@/utilities/axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/auth/authSlice";
import { Stack, Typography } from "@mui/material";
import { Form, FormInput, FormSubmit } from "@/components/form";

const signupSchema = yup.object().shape({
    name: yup.string().required("Full Name is required"),
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

type CredentialInput = { name: string; email: string; password: string };

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { mutate, isLoading } = useMutation(async (credentials: CredentialInput) => await baseAxios.post("/auth/signup", credentials), {
        onSuccess: (data) => {
            if (data?.data) {
                // @ts-ignore
                toast.success(data?.message);
                dispatch(setUser(data?.data));
                navigate("/dashboard");
            }
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error?.message);
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
                defaultValues={{ name: "", email: "", password: "", c_password: "" }}
                validationSchema={signupSchema}
                onSubmit={({ c_password, ...data }) => mutate(data)}
            >
                <FormInput name="name" label="Full Name" />
                <FormInput type="email" name="email" label="Your Email" />
                <FormInput type="password" name="password" label="Your Password" />
                <FormInput type="password" name="c_password" label="Confirm Password" />
                <FormSubmit loading={isLoading}>Signup</FormSubmit>
            </Form>
        </AuthLayout>
    );
}
