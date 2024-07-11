import * as yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { Form, FormInput, FormSubmit } from "@/components/form";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";

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

export default function CreateUser() {
    const navigate = useNavigate();
    const baseAxios = useAxiosRequest();
    const queryClient = useQueryClient();

    const createUser = async (data: { name: string; email: string; password: string }) => {
        return await baseAxios.post("/user/create", data);
    };

    const { mutate, isLoading } = useMutation(createUser, {
        onSuccess: (data) => {
            if (data?.data) {
                // @ts-ignore
                toast.success(data?.message);
                queryClient.invalidateQueries("user");
                navigate("/dashboard/users");
            }
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error?.message);
        },
    });

    return (
        <Form
            defaultValues={{ name: "", email: "", password: "", c_password: "" }}
            validationSchema={signupSchema}
            onSubmit={({ c_password, ...data }) => mutate(data)}
        >
            <FormInput name="name" label="Full Name" />
            <FormInput type="email" name="email" label="Your Email" />
            <FormInput type="password" name="password" label="Your Password" />
            <FormInput type="password" name="c_password" label="Confirm Password" />
            <FormSubmit loading={isLoading}>Create User</FormSubmit>
        </Form>
    );
}
