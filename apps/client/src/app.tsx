import { router } from "@/router";
import { RouterProvider } from "react-router-dom";
import ToastProvider from "@/layouts/ToastProvider";

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
            <ToastProvider />
        </>
    );
}
