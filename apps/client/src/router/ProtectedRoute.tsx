import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
    const { user } = useAppSelector((state) => state.auth);

    if (!user?.id) return <Navigate to="/signin" replace={true} />;

    return children;
}
