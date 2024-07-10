import { useAppDispatch } from "@/redux/hooks";
import { signOut } from "@/redux/auth/authSlice";
import { Menu, LogoutRounded } from "@mui/icons-material";
import { Drawer, IconButton, Button } from "@mui/material";

type SideBarStateProps = { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> };

export function SideBarButton({ setOpen }: SideBarStateProps) {
    return (
        <IconButton onClick={() => setOpen(true)} sx={{ display: { md: "none" } }}>
            <Menu />
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

export function SignOutButton() {
    const dispatch = useAppDispatch();

    return (
        <Button
            fullWidth
            size="large"
            color="error"
            variant="text"
            startIcon={<LogoutRounded />}
            sx={{ justifyContent: "start" }}
            onClick={() => dispatch(signOut())}
        >
            Sign Out
        </Button>
    );
}
