import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Typography } from "@mui/material";

export default function Hero() {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: "url('/hero.avif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                color: "white",
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    zIndex: 1,
                }}
            />
            <Box sx={{ position: "relative", zIndex: 2, maxWidth: 608 }}>
                <Typography variant="h3" fontWeight={700}>
                    Welcome to Mealthy
                </Typography>
                <Typography mt={1}>
                    A meal management system. Where you can manage your office meals effortlessly. Our system provides a seamless
                    experience.
                </Typography>
                <Box display="flex" justifyContent="center" gap={3} marginTop={4}>
                    {user && user?.id ? (
                        <>
                            {/* @ts-ignore */}
                            <Button color="primary" LinkComponent={Link} to="/dashboard" size="large">
                                Dashboard
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* @ts-ignore */}
                            <Button color="primary" LinkComponent={Link} to="/signin" size="large">
                                Sign In
                            </Button>
                            {/* @ts-ignore */}
                            <Button color="secondary" LinkComponent={Link} to="/signup" size="large">
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
