import { Link, useLocation } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

export default function AuthLayout({ children }: React.PropsWithChildren) {
    const { pathname } = useLocation();

    return (
        <Box sx={{ height: "100vh", display: "grid", gridTemplateColumns: { lg: "1fr 1fr" }, bgcolor: "#F5F5F5" }}>
            <Box sx={{ display: { xs: "none", lg: "flex" }, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h4" fontWeight="800">
                    {pathname.includes("signin") ? " Hi, Welcome Back" : "Create Your Account"}
                </Typography>
                <img src="/auth.png" alt="" style={{ maxWidth: 512 }} />
            </Box>
            <Paper sx={{ m: { sm: 4 }, display: "flex", flexDirection: "column", gap: 4, p: 4 }}>
                <Link to="/" style={{ display: "flex" }}>
                    <img src="/logo.png" alt="logo" width={160} />
                </Link>
                <Box flex={1} display="flex" flexDirection="column" justifyContent="center" gap={2.5}>
                    {children}
                </Box>
                <Typography variant="body2" color="text.secondary" align="center">
                    &copy; {new Date().getFullYear()} Mealthy, All Rights Reserved.
                </Typography>
            </Paper>
        </Box>
    );
}
