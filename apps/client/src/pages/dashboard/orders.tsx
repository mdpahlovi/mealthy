import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { useQuery, useMutation, useQueryClient } from "react-query";

import type { IApiResponse } from "@/types";
import type { Item, MealItem, Meal, Order } from "@prisma/client";

type IMeal = { mealItems: ({ item: Item } & MealItem)[] } & Meal;
type OrderInput = { day: string; mealId: string | null };

export default function Orders() {
    const baseAxios = useAxiosRequest();
    const queryClient = useQueryClient();

    const { data: meals, isLoading: isLoadingMeals } = useQuery<IApiResponse<IMeal[]>>({
        queryKey: "meal",
        queryFn: async () => await baseAxios.get("/meal"),
    });

    const { data: orders, isLoading: isLoadingOrders } = useQuery<IApiResponse<Order[]>>({
        queryKey: "order",
        queryFn: async () => await baseAxios.get("/order"),
    });

    const mutation = useMutation(async (order: OrderInput) => await baseAxios.post("/order/create", order), {
        onSuccess: () => {
            queryClient.invalidateQueries("order");
        },
    });

    const [selectedMeals, setSelectedMeals] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (orders?.data) {
            const initialSelectedMeals: { [key: string]: string } = {};
            orders.data.forEach((order) => {
                initialSelectedMeals[order.day] = order.mealId || "NO_MEAL";
            });
            setSelectedMeals(initialSelectedMeals);
        }
    }, [orders]);

    const handleMealChange = (day: string, mealId: string) => {
        if (dayjs(day).isBefore(dayjs(), "day")) return;
        setSelectedMeals((prev) => ({ ...prev, [day]: mealId }));
        mutation.mutate({ day, mealId: mealId === "NO_MEAL" ? null : mealId });
    };

    if (isLoadingMeals || isLoadingOrders) return <div>Loading...</div>;

    const daysOfWeek = Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day").format("YYYY-MM-DD"));

    return (
        <div>
            {daysOfWeek.map((day) => (
                <div key={day}>
                    <h2>{dayjs(day).format("dddd, MMMM D")}</h2>
                    <select value={selectedMeals[day] || "NO_MEAL"} onChange={(e) => handleMealChange(day, e.target.value)}>
                        <option value="NO_MEAL">No Meal</option>
                        {meals?.data?.map((meal) => (
                            <option key={meal.id} value={meal.id}>
                                {meal.mealItems.map((mealItem) => mealItem.item.name).join(", ")}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}
