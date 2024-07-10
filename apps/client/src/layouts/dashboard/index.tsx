import { useState } from "react";
import { Box, Divider } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import SideBar from "@/layouts/dashboard/sidebar";
import { PermanentSideBar, TemporarySideBar, SideBarButton } from "@/layouts/dashboard/components";

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);

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
            <Box width={{ md: `calc(100% - 264px)` }} flexGrow={1}>
                <Box height={64} display="flex" alignItems="center" mx={3} gap={3}>
                    <SideBarButton open={open} setOpen={setOpen} />
                    <Link to="/" style={{ display: "flex" }}>
                        <img src="/logo.png" alt="logo" width={160} />
                    </Link>
                    <Box width="100%" />
                </Box>
                <Divider />
                <Box m={3}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
