import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@/redux/auth/authSlice";
import mealItemsReducer from "@/redux/mealItems/mealItemsSlice";

export const rootReducer = combineReducers({
    auth: authReducer,
    mealItems: mealItemsReducer,
});
