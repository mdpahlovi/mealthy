import * as yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { Form, FormInput, FormSelect, FormSubmit } from "@/components/form";

const createItemSchema = yup.object().shape({
    name: yup.string().required("Item Name is required"),
    category: yup.string().required("Category is required"),
});

export default function CreateItem() {
    const navigate = useNavigate();
    const baseAxios = useAxiosRequest();
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(
        async (data: { name: string; category: string }) => await baseAxios.post("/item/create", data),
        {
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
        }
    );

    return (
        <Form defaultValues={{ name: "", category: "" }} validationSchema={createItemSchema} onSubmit={(data) => mutate(data)}>
            <FormInput name="name" label="Item Name" />
            <FormSelect name="category" label="Category" items={["PROTEIN", "STARCH", "VEG", "OTHER"]} />

            <FormSubmit loading={isLoading}>Create Item</FormSubmit>
        </Form>
    );
}
