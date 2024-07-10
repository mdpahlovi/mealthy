import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "@/layouts/dashboard/sidebar";
import { PermanentSideBar, TemporarySideBar } from "@/layouts/dashboard/components";

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
            <Box width={{ md: `calc(100% - 264px)` }} flexGrow={1} m={3}>
                <Outlet />
            </Box>
        </Box>
    );
}
