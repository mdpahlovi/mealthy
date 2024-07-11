import * as yup from "yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormInput, FormSubmit } from "@/components/form";

const createUserSchema = yup.object().shape({
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

export default function EditUser() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const baseAxios = useAxiosRequest();
    const queryClient = useQueryClient();

    useEffect(() => {
        !state || !state?.id ? navigate("/dashboard/users") : null;
    }, [state]);

    const editUser = async (data: { name: string; email: string; password: string }) => {
        return await baseAxios.patch(`/user/${state?.id}`, data);
    };

    const { mutate, isLoading: editLoading } = useMutation(editUser, {
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
            defaultValues={{ name: state?.name ? state?.name : "", email: state?.email ? state?.email : "", password: "", c_password: "" }}
            validationSchema={createUserSchema}
            onSubmit={({ c_password, ...data }) => mutate(data)}
        >
            <FormInput name="name" label="Full Name" />
            <FormInput type="email" name="email" label="Your Email" disabled />
            <FormInput type="password" name="password" label="Your Password" />
            <FormInput type="password" name="c_password" label="Confirm Password" />
            <FormSubmit loading={editLoading}>Edit User</FormSubmit>
        </Form>
    );
}
