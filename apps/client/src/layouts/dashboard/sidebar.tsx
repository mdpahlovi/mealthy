import { createElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { SignOutButton } from "@/layouts/dashboard/components";
import { Stack, Box, Button, ButtonProps, Typography } from "@mui/material";
import { useDashboardRoutes } from "@/layouts/dashboard/useDashboardRoutes";

type StyledLinkButtonProps = { href?: string; selected?: boolean; children?: React.ReactNode } & ButtonProps;

function SideBarItems() {
    const { pathname } = useLocation();
    const routes = useDashboardRoutes();

    const StyledLinkButton = styled((props: StyledLinkButtonProps) => {
        const { selected, ...others } = props;
        return <Button size="large" variant="text" color="inherit" component={Link} {...others} fullWidth />;
    })(({ theme, selected }) => ({
        justifyContent: "start",
        backgroundColor: selected ? alpha(theme.palette.primary.main, 0.25) : "",
        "&:hover": { backgroundColor: selected ? alpha(theme.palette.primary.main, 0.5) : "" },
    }));

    return routes.map(({ href, text, icon }, idx) => (
        <StyledLinkButton key={idx} href={href} selected={href === pathname} startIcon={createElement(icon)}>
            {text}
        </StyledLinkButton>
    ));
}

export default function SideBar() {
    return (
        <Stack minHeight="100vh" display="flex" direction="column" justifyContent="space-between" px={2} py={3}>
            <Box>
                <Link to="/" style={{ display: "flex", marginBottom: 20 }}>
                    <img src="/logo.png" alt="logo" width={128} />
                </Link>
                <Typography sx={{ ml: 2.75, mb: 0.5, fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: "text.secondary" }}>
                    Routes
                </Typography>
                <SideBarItems />
            </Box>

            <SignOutButton />
        </Stack>
    );
}
