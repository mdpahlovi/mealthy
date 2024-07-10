import { useAppSelector } from "@/redux/hooks";
import { DashboardRounded } from "@mui/icons-material";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type RouteType = { href: string; text: string; icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string } };

export function useDashboardRoutes(): RouteType[] {
    const { user } = useAppSelector((state) => state.auth);

    let routes: RouteType[] = [];
    switch (user?.role) {
        case "USER":
            routes = [];
            break;
        case "ADMIN":
            routes = [];
            break;
    }

    return [dashboard, ...routes];
}

// All Dashboard Routes
const dashboard = { href: "/dashboard", text: "Dashboard", icon: DashboardRounded };
