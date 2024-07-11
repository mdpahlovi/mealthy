import * as yup from "yup";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { Form, FormInput, FormSubmit } from "@/components/form";

import type { User } from "@prisma/client";
import type { IApiResponse } from "@/types";

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
    const params = useParams();
    const navigate = useNavigate();
    const baseAxios = useAxiosRequest();
    const queryClient = useQueryClient();
    const [data, setData] = useState<IApiResponse<User>>();

    useEffect(() => {
        baseAxios
            .get(`/user/${params.id}`)
            .then((data: any) => setData(data))
            .catch(() => navigate("/dashboard/users"));
    }, []);

    const editUser = async (credentials: { name: string; email: string; password: string }) => {
        return await baseAxios.patch(`/user/${params.id}`, credentials);
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
            defaultValues={{
                name: data?.data?.name ? data?.data?.name : "",
                email: data?.data?.email ? data?.data?.email : "",
                password: "",
                c_password: "",
            }}
            validationSchema={createUserSchema}
            onSubmit={({ c_password, ...data }) => mutate(data)}
        >
            <FormInput name="name" label="Full Name" />
            <FormInput type="email" name="email" label="Your Email" />
            <FormInput type="password" name="password" label="Your Password" />
            <FormInput type="password" name="c_password" label="Confirm Password" />
            <FormSubmit loading={editLoading}>Edit User</FormSubmit>
        </Form>
    );
}
