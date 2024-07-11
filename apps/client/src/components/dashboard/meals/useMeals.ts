import type { AxiosInstance } from "axios";
import type { IApiResponse } from "@/types";
import type { Item, Meal, MealItem } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "react-query";

type IMeal = { mealItems: ({ item: Item } & MealItem)[] } & Meal;

export const useMeals = (baseAxios: AxiosInstance) => {
    return useQuery<IApiResponse<IMeal[]>>({
        queryKey: "meal",
        queryFn: async () => await baseAxios.get("/meal"),
    });
};

export const useAddMeal = (baseAxios: AxiosInstance) => {
    const queryClient = useQueryClient();

    const addMeal = async (meal: { day: string; items: string[] }) => await baseAxios.post("/meal/create", meal);

    return useMutation(addMeal, {
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries("meal");
        },
        onError: (error) => {
            console.log(error);
        },
    });
};

export const useDeleteMeal = (baseAxios: AxiosInstance) => {
    const queryClient = useQueryClient();

    const deleteMeal = async (id: string) => await baseAxios.delete(`/meal/${id}`);

    return useMutation(deleteMeal, {
        onSuccess: () => {
            queryClient.invalidateQueries("meal");
        },
    });
};
