import * as yup from "yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormInput, FormSelect, FormSubmit } from "@/components/form";

const createItemSchema = yup.object().shape({
    name: yup.string().required("Item Name is required"),
    category: yup.string().required("Category is required"),
});

export default function EditItem() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const baseAxios = useAxiosRequest();
    const queryClient = useQueryClient();

    useEffect(() => {
        !state || !state?.id ? navigate("/dashboard/items") : null;
    }, [state]);

    const editItem = async (data: { name: string; category: string }) => {
        return await baseAxios.patch(`/item/${state?.id}`, data);
    };

    const { mutate, isLoading: editLoading } = useMutation(editItem, {
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
        <Form
            defaultValues={{ name: state?.name ? state?.name : "", category: state?.category ? state?.category : "" }}
            validationSchema={createItemSchema}
            onSubmit={(data) => mutate(data)}
        >
            <FormInput name="name" label="Item Name" />
            <FormSelect name="category" label="Category" items={["PROTEIN", "STARCH", "VEG", "OTHER"]} />
            <FormSubmit loading={editLoading}>Edit Item</FormSubmit>
        </Form>
    );
}
