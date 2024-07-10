import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/main";
import Home from "@/pages/main/home";

import Signup from "@/pages/auth/signup";
import Signin from "@/pages/auth/signin";

import DashboardLayout from "@/layouts/dashboard";
import Dashboard from "@/pages/dashboard/home";
import ProtectedRoute from "@/router/ProtectedRoute";

import NotFound from "@/pages/not-found";

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
        ],
    },
    { path: "*", element: <NotFound /> },
]);
