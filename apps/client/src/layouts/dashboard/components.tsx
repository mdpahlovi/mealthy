import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "@/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Person2Rounded from "@mui/icons-material/Person2Rounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Box, Drawer, IconButton, Typography, Avatar, Button } from "@mui/material";

type SideBarStateProps = { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> };

export function SideBarButton({ setOpen }: SideBarStateProps) {
    return (
        <IconButton onClick={() => setOpen(true)} sx={{ display: { md: "none" } }}>
            <MenuIcon />
        </IconButton>
    );
}

export function TemporarySideBar({ open, setOpen, children }: SideBarStateProps & React.PropsWithChildren) {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={() => setOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: 264 },
            }}
        >
            {children}
        </Drawer>
    );
}

export function PermanentSideBar({ children }: React.PropsWithChildren) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: 264 },
            }}
            open
        >
            {children}
        </Drawer>
    );
}

export function ProfileCard() {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <Box sx={{ mt: 1.25, mb: 3, display: "flex", alignItems: "center", border: 1, borderColor: "divider", borderRadius: 3 }}>
            <Avatar src={""} alt="" sx={{ m: 1, width: 48, height: 48 }} />
            <Typography fontWeight={600}>{user?.name}</Typography>
        </Box>
    );
}

export function SignOutButton() {
    const dispatch = useAppDispatch();

    return (
        <Button
            fullWidth
            size="large"
            color="error"
            variant="outlined"
            onClick={() => dispatch(signOut())}
            startIcon={<LogoutRoundedIcon />}
            sx={{ justifyContent: "start" }}
        >
            Sign Out
        </Button>
    );
}

export function ProfileButton() {
    return (
        <Button
            fullWidth
            size="large"
            variant="outlined"
            LinkComponent={Link}
            href="/dashboard/profile"
            startIcon={<Person2Rounded />}
            sx={{ mb: 1, justifyContent: "start" }}
        >
            Profile
        </Button>
    );
}
