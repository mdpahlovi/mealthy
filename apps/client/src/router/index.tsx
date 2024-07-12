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
import CreateUser from "@/pages/dashboard/create-user";
import CreateItem from "@/pages/dashboard/create-item";
import EditUser from "@/pages/dashboard/edit-user";
import EditItem from "@/pages/dashboard/edit-item";
import CreateMeal from "@/pages/dashboard/create-meal";

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
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: "/dashboard", element: <Dashboard /> },
            {
                path: "users",
                element: (
                    <AdminRoute>
                        <Users />
                    </AdminRoute>
                ),
            },
            {
                path: "create-user",
                element: (
                    <AdminRoute>
                        <CreateUser />
                    </AdminRoute>
                ),
            },
            {
                path: "edit-user/:id",
                element: (
                    <AdminRoute>
                        <EditUser />
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
                path: "create-item",
                element: (
                    <AdminRoute>
                        <CreateItem />
                    </AdminRoute>
                ),
            },
            {
                path: "edit-item/:id",
                element: (
                    <AdminRoute>
                        <EditItem />
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
                path: "create-meal",
                element: (
                    <AdminRoute>
                        <CreateMeal />
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
