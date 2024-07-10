import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

export default function AdminRoute({ children }: React.PropsWithChildren) {
    const { user } = useAppSelector((state) => state.auth);

    if (!user?.id) return <Navigate to="/signin" replace={true} />;
    if (user?.role !== "ADMIN") return <Navigate to="/dashboard" replace={true} />;

    return children;
}
