import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main";
import Home from "@/pages/main/home";

import Signup from "@/pages/auth/signup";
import Signin from "@/pages/auth/signin";

import DashboardLayout from "@/layouts/dashboard";
import Dashboard from "@/pages/dashboard/home";
import AdminRoute from "@/router/AdminRoute";
import ProtectedRoute from "@/router/ProtectedRoute";

import NotFound from "@/pages/not-found";
import Users from "@/pages/dashboard/users";
import Items from "@/pages/dashboard/items";
import Meals from "@/pages/dashboard/meals";
import Schedules from "@/pages/dashboard/schedules";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [{ path: "/", element: <Home /> }],
    },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <AdminRoute>
                        <Users />
                    </AdminRoute>
                ),
            },
            {
                path: "items",
                element: (
                    <AdminRoute>
                        <Items />
                    </AdminRoute>
                ),
            },
            {
                path: "meals",
                element: (
                    <AdminRoute>
                        <Meals />
                    </AdminRoute>
                ),
            },
            {
                path: "schedules",
                element: (
                    <AdminRoute>
                        <Schedules />
                    </AdminRoute>
                ),
            },
        ],
    },
    { path: "*", element: <NotFound /> },
]);
