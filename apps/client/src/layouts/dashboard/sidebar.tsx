import { createElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Divider, Stack, Box, Button, ButtonProps } from "@mui/material";
import { useDashboardRoutes } from "@/layouts/dashboard/useDashboardRoutes";
import { ProfileButton, ProfileCard, SignOutButton } from "@/layouts/dashboard/components";

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
                <ProfileCard />
                <SideBarItems />
            </Box>
            <Box>
                <Divider sx={{ mb: 3 }} />
                <ProfileButton />
                <SignOutButton />
            </Box>
        </Stack>
    );
}
