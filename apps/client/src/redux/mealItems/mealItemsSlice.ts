import { Item } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MealItemsState = { items: Item[] };

const initialState: MealItemsState = { items: [] };

const mealItemsSlice = createSlice({
    name: "mealItems",
    initialState,
    reducers: {
        setMealItems(state, action: PayloadAction<Item[]>) {
            state.items = action.payload;
        },
    },
});

export const { setMealItems } = mealItemsSlice.actions;
export default mealItemsSlice.reducer;
