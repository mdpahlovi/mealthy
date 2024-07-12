import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { validate } from "@/components/dashboard/meals/validate";
import { useMutation, useQuery, useQueryClient } from "react-query";

import type { Item } from "@prisma/client";
import type { IApiResponse } from "@/types";

import { Box, Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import SelectItem from "@/components/dashboard/meals/select-item";

export type Error = { day: string; items: string };
export type Value = { day: string; items: string[] };

export default function CreateMeal() {
    const navigate = useNavigate();
    const baseAxios = useAxiosRequest();
    const queryClient = useQueryClient();

    const [error, setError] = useState<Error>({ day: "", items: "" });
    const [value, setValue] = useState<Value>({ day: "", items: [] });

    const { data } = useQuery<IApiResponse<Item[]>>({
        queryKey: ["item"],
        queryFn: async () => await baseAxios.get("/item"),
    });

    const createMeal = async (value: Value) => {
        return await baseAxios.post("/meal/create", value);
    };
    const { mutate, isLoading } = useMutation(createMeal, {
        onSuccess: (data) => {
            if (data?.data) {
                // @ts-ignore
                toast.success(data?.message);
                queryClient.invalidateQueries("meal");
                navigate("/dashboard/meals");
            }
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error?.message);
        },
    });

    const handleCreateMeal = () => {
        if (!validate({ value, setError, mealItems: data?.data || [] })) return;

        mutate(value);
        setError({ day: "", items: "" });
        setValue({ day: "", items: [] });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label="Day"
                value={value?.day}
                onChange={(e) => {
                    setValue((value) => ({ ...value, day: e.target.value }));
                    setError((error) => ({ ...error, day: "" }));
                }}
                error={error?.day ? true : false}
                helperText={error?.day}
                select
            >
                {["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"].map((item, idx) => (
                    <MenuItem key={idx} value={item}>
                        {item.charAt(0) + item.slice(1).toLowerCase()}
                    </MenuItem>
                ))}
            </TextField>
            <SelectItem error={error} value={value} setValue={setValue} mealItems={data?.data || []} />
            <Button onClick={handleCreateMeal} sx={{ mt: 1 }} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <CircularProgress size={20} sx={{ mr: 1 }} /> Loading
                    </>
                ) : (
                    "Create Meal"
                )}
            </Button>
        </Box>
    );
}
