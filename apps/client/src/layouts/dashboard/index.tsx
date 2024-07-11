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
                        {pathname === "/dashboard" ? `Hi, ${user?.name}` : capitalizeFirstLetter(pathname.replace("/dashboard/", ""))}
                    </Typography>
                </Box>
                <Outlet />
            </Box>
        </Box>
    );
}

function capitalizeFirstLetter(string: string) {
    const strings = string.includes("-") ? string.split(" ") : [string];

    return strings.map((string) => string.charAt(0).toUpperCase() + string.slice(1));
}
