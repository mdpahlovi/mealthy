import { Link, useLocation } from "react-router-dom";
import { Box, Divider, Grid, Typography } from "@mui/material";

export default function AuthLayout({ children }: React.PropsWithChildren) {
    const { pathname } = useLocation();
    const gap = { xs: 3, sm: 8, md: 4, lg: 6 };
    const mdHidden = { xs: "none", md: "flex" };

    return (
        <Grid container alignItems="center" flexWrap="nowrap" gap={gap} px={gap} sx={{ minHeight: "100vh" }}>
            <Grid md={5} lg={6} display={mdHidden} direction="column" alignItems="center" gap={4}>
                <Typography variant="h4" fontWeight="800">
                    {pathname.includes("signin") ? " Hi, Welcome Back" : "Create Your Account"}
                </Typography>
                <img src="/images/auth.png" alt="" />
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ display: mdHidden }} />
            <Grid xs={12} md={7} lg={6} display="flex" direction="column" gap={4} sx={{ minHeight: "100vh", py: 4 }}>
                <Link to="/" style={{ display: "flex" }}>
                    <img src="/logo.png" alt="logo" width={160} />
                </Link>
                <Box flex={1} display="flex" flexDirection="column" justifyContent="center" gap={2.5}>
                    {children}
                </Box>
                <Typography variant="body2" align="center">
                    &copy; {new Date().getFullYear()} Mealthy, All Rights Reserved.
                </Typography>
            </Grid>
        </Grid>
    );
}
