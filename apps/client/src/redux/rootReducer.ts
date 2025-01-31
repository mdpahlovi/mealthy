import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "@/redux/auth/authSlice";

export const rootReducer = combineReducers({
    auth: authReducer,
});
