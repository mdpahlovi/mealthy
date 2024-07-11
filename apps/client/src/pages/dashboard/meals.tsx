import { useState } from "react";
import { useQuery } from "react-query";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMeals, useAddMeal, useDeleteMeal } from "@/components/dashboard/meals/useMeals";

import type { Item } from "@prisma/client";
import type { IApiResponse } from "@/types";
import { setMealItems } from "@/redux/mealItems/mealItemsSlice";

export default function Meals() {
    const dispatch = useAppDispatch();
    const baseAxios = useAxiosRequest();
    const { data: meals, isLoading, error } = useMeals(baseAxios);
    const { mutate: addMeal, isLoading: addMealLoading } = useAddMeal(baseAxios);
    const { mutate: deleteMeal } = useDeleteMeal(baseAxios);
    const mealItems = useAppSelector((state) => state.mealItems.items);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [day, setDay] = useState<string>("");
    const [mealError, setMealError] = useState<string>("");

    useQuery<IApiResponse<Item[]>>({
        queryKey: ["item"],
        queryFn: async () => await baseAxios.get("/item"),
        onSuccess: ({ data }) => {
            data ? dispatch(setMealItems(data)) : null;
        },
    });

    const handleAddMeal = () => {
        if (!validateMeal(selectedItems)) return;

        addMeal({ day, items: selectedItems });
        setDay("");
        setSelectedItems([]);
        setMealError("");
    };

    const handleDeleteMeal = (id: string) => {
        deleteMeal(id);
    };

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const itemId = e.target.value;
        setSelectedItems((prevItems) =>
            prevItems.includes(itemId) ? prevItems.filter((item) => item !== itemId) : [...prevItems, itemId]
        );
    };

    const validateMeal = (items: string[]): boolean => {
        const riceItem = items.some((id) => {
            const item = mealItems.find((item) => item.id === id);
            return item?.category === "STARCH";
        });

        const proteinItems = items.filter((id) => {
            const item = mealItems.find((item) => item.id === id);
            return item?.category === "PROTEIN";
        });

        if (!riceItem) {
            setMealError("A meal must have a rice item to be complete.");
            return false;
        }
        if (items.length < 3) {
            setMealError("A meal must have at least 3 items to be complete.");
            return false;
        }
        if (proteinItems.length > 1) {
            setMealError("A meal cannot have two protein sources at a time.");
            return false;
        }

        // Check if the same meal is repeated more than twice a week
        const mealCount =
            meals?.data?.filter(
                ({ mealItems }) =>
                    mealItems
                        .map(({ item }) => item.id)
                        .sort()
                        .toString() === items.sort().toString()
            ).length || 0;
        if (mealCount >= 2) {
            setMealError("The same meal can only be repeated a maximum of two days in a week.");
            return false;
        }

        return true;
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching meals</div>;

    return (
        <div>
            <h1>Meal Management</h1>
            {mealError && <div style={{ color: "red" }}>{mealError}</div>}
            <div>
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">Select Day</option>
                    <option value="SUNDAY">Sunday</option>
                    <option value="MONDAY">Monday</option>
                    <option value="TUESDAY">Tuesday</option>
                    <option value="WEDNESDAY">Wednesday</option>
                    <option value="THURSDAY">Thursday</option>
                </select>
                <div>
                    {mealItems.map((item) => (
                        <div key={item.id}>
                            <input type="checkbox" value={item.id} checked={selectedItems.includes(item.id)} onChange={handleItemChange} />
                            {item.name}
                        </div>
                    ))}
                </div>
                <button onClick={handleAddMeal}>Add Meal</button>
                {addMealLoading ? "Loading" : null}
            </div>
            <div>
                <h2>Meals</h2>
                {meals?.data?.map(({ id, day, mealItems }) => (
                    <div key={id}>
                        <h3>{day}</h3>
                        <ul>
                            {mealItems?.map(({ item: { id, name } }) => (
                                <li key={id}>{name}</li>
                            ))}
                        </ul>
                        <button onClick={() => handleDeleteMeal(id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
