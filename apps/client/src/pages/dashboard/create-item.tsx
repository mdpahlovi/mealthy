import * as yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import { Form, FormInput, FormSubmit } from "@/components/form";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";

const createItemSchema = yup.object().shape({
    name: yup.string().required("Item Name is required"),
    category: yup.string().required("Category is required"),
});

export default function CreateItem() {
    const navigate = useNavigate();
    const baseAxios = useAxiosRequest();
    const queryClient = useQueryClient();

    const createItem = async (data: { name: string; category: string }) => {
        return await baseAxios.post("/item/create", data);
    };

    const { mutate, isLoading } = useMutation(createItem, {
        onSuccess: (data) => {
            if (data?.data) {
                // @ts-ignore
                toast.success(data?.message);
                queryClient.invalidateQueries("item");
                navigate("/dashboard/items");
            }
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error?.message);
        },
    });

    return (
        <Form defaultValues={{ name: "", category: "" }} validationSchema={createItemSchema} onSubmit={(data) => mutate(data)}>
            <FormInput name="name" label="Item Name" />
            <FormInput name="category" label="Category" />

            <FormSubmit loading={isLoading}>Create Item</FormSubmit>
        </Form>
    );
}
