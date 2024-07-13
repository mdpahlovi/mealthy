import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Box, Typography } from "@mui/material";
import SideBar from "@/layouts/dashboard/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { PermanentSideBar, TemporarySideBar, SideBarButton } from "@/layouts/dashboard/components";

export default function DashboardLayout() {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);

    return (
        <Box display="flex">
            <Box width={{ md: 264 }} flexShrink={{ md: 0 }}>
                <TemporarySideBar open={open} setOpen={setOpen}>
                    <SideBar />
                </TemporarySideBar>
                <PermanentSideBar>
                    <SideBar />
                </PermanentSideBar>
            </Box>
            <Box width={{ md: `calc(100% - 264px)` }} flexGrow={1} m={3}>
                <Box mb={3} display="flex" alignItems="center" gap={3}>
                    <SideBarButton open={open} setOpen={setOpen} />
                    <Typography variant="h4" fontWeight={700}>
                        {pathname === "/dashboard" ? `Hi, ${user?.name}` : formatPathname(pathname)}
                    </Typography>
                </Box>
                <Outlet />
            </Box>
        </Box>
    );
}

function formatPathname(pathname: string): string {
    const regex = /\/dashboard\/([^\/]+)(?:\/[a-z0-9-]+)?/i;
    const match = pathname.match(regex);

    if (match && match[1]) {
        return match[1]
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    } else {
        return pathname;
    }
}
