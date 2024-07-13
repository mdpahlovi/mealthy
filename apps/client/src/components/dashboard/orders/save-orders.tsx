import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import { Button } from "@mui/material";
import { useMutation } from "react-query";
import type { AxiosInstance } from "axios";
import type { Order } from "@prisma/client";
import { useEffect, useState } from "react";
import supabase from "@/utilities/supabase";
import { useAppSelector } from "@/redux/hooks";

type OrderInput = { date: string; mealId: string | null };

type SaveOrdersProps = {
    date: Dayjs;
    mealId: string | null | undefined;
    orders: Order[];
    setMealId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    baseAxios: AxiosInstance;
};

export default function SaveOrders({ date, mealId, orders, setMealId, setOrders, baseAxios }: SaveOrdersProps) {
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        supabase
            .from("orders")
            .select("*")
            .eq("userId", user?.id)
            .then(({ data }) => {
                data ? setOrders(data) : null;
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const order = orders?.find((order) => order?.date === dayjs(date).format("YYYY-MM-DD"));
        order && order?.mealId !== undefined ? setMealId(order?.mealId) : setMealId(undefined);
    }, [orders, date]);

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
