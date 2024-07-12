import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

export default function UserRoute({ children }: React.PropsWithChildren) {
    const { user } = useAppSelector((state) => state.auth);

    if (user?.role !== "USER") return <Navigate to="/dashboard" replace={true} />;

    return children;
}
