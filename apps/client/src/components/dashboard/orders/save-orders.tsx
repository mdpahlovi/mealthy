import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import { Button } from "@mui/material";
import { useMutation } from "react-query";
import type { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

type OrderInput = { date: string; mealId: string | null };

type SaveOrdersProps = {
    date: Dayjs;
    mealId: string | null;
    setMealId: React.Dispatch<React.SetStateAction<string | null>>;
    baseAxios: AxiosInstance;
};

export default function SaveOrders({ date, mealId, setMealId, baseAxios }: SaveOrdersProps) {
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const { user, token } = useAppSelector((state) => state.auth);

    useEffect(() => {
        baseAxios
            .get("/order", {
                headers: { authorization: token },
                params: { userId: user?.id, date: dayjs(date).format("YYYY-MM-DD") },
            })
            .then(({ data }) => (data?.length ? setMealId(data[0]?.mealId) : setMealId(null)))
            .finally(() => setLoading(false));
    }, [date]);

    const { mutate, isLoading } = useMutation(async (data: OrderInput) => await baseAxios.post("/order/create", data), {
        onSuccess: (data) => {
            setRefresh(!refresh);
            // @ts-ignore
            toast.success(data?.message);
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(error?.message);
        },
    });

    return loading ? null : (
        <Button
            sx={{ mt: 3 }}
            onClick={() => mutate({ date: dayjs(date).format("YYYY-MM-DD"), mealId: mealId || null })}
            fullWidth
            disabled={isLoading}
        >
            Save Order
        </Button>
    );
}
