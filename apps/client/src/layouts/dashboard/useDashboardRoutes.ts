import { useAppSelector } from "@/redux/hooks";
import type { SvgIconTypeMap } from "@mui/material/SvgIcon";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { DashboardRounded, ManageAccounts, Inventory, FoodBank, EventNote, Bookmark } from "@mui/icons-material";

type RouteType = { href: string; text: string; icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string } };

export function useDashboardRoutes(): RouteType[] {
    const { user } = useAppSelector((state) => state.auth);

    let routes: RouteType[] = [];
    switch (user?.role) {
        case "USER":
            routes = [{ href: "/dashboard/orders", text: "Order Meal", icon: Bookmark }];
            break;
        case "ADMIN":
            routes = [
                { href: "/dashboard/users", text: "Manage Users", icon: ManageAccounts },
                { href: "/dashboard/items", text: "Manage Items", icon: Inventory },
                { href: "/dashboard/meals", text: "Manage Meals", icon: FoodBank },
                { href: "/dashboard/schedules", text: "Meal Schedules", icon: EventNote },
            ];
            break;
    }

    return [{ href: "/dashboard", text: "Dashboard", icon: DashboardRounded }, ...routes];
}
