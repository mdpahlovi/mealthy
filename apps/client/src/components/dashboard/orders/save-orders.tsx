import dayjs, { Dayjs } from "dayjs";
import { Button } from "@mui/material";
import type { AxiosInstance } from "axios";
import type { Order } from "@prisma/client";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

type OrderInput = { date: Dayjs; mealId: string | null };

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

    const { refetch } = useQuery({
        queryKey: "order",
        queryFn: async () => await baseAxios.get("/order"),
        onSuccess: (data) => {
            setOrders(data?.data);
            setLoading(false);
        },
    });

    useEffect(() => {
        loading ? refetch() : null;
    }, []);

    useEffect(() => {
        const order = orders?.find((order) => dayjs(order?.date).isSame(date));
        order && order?.mealId !== undefined ? setMealId(order?.mealId) : null;
    }, [orders, date]);

    const { mutate, isLoading } = useMutation(async (data: OrderInput) => await baseAxios.post("/order/create", data), {
        onSuccess: () => {
            refetch();
        },
    });

    return loading ? null : (
        <Button sx={{ mt: 3 }} onClick={() => mutate({ date, mealId: mealId || null })} fullWidth disabled={isLoading}>
            Save Order
        </Button>
    );
}
