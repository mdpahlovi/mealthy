import * as yup from "yup";
import toast from "react-hot-toast";
import { Link } from "@/components/ui";
import AuthLayout from "@/layouts/auth";
import { useMutation } from "react-query";
import { baseAxios } from "@/utilities/axios";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/auth/authSlice";
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

export default function Signin() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { mutate, isLoading } = useMutation(
        async (credentials: { email: string; password: string }) => await baseAxios.post("/auth/signin", credentials),
        {
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
        }
    );

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
