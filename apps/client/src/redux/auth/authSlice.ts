import { Role } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { id: string; name: string; role: Role; email: string };
const initialState: { user: User | null; token: string | null } = { user: null, token: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        signOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
