import { Link } from "@/components/ui";
import { Container, Typography, Box } from "@mui/material";

export default function NotFound() {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Box display={{ xs: "none", md: "block" }}>
                <img
                    src="https://img.freepik.com/premium-vector/man-with-chat-gpt-concept-young-guy-chat-with-ai-artificial-intelligence-machine-learning-knowledge-information-robot-answers-users-questions-cartoon-flat-vector-illustration_118813-16223.jpg"
                    alt=""
                    style={{ width: "100%", maxWidth: 512 }}
                />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="start" p={2}>
                <Typography variant="h1" fontWeight={700}>
                    404
                </Typography>
                <Typography variant="h6">Aha! You see! You can be wrong!</Typography>
                <Typography variant="body2" color="text.secondary">
                    (or it could be us)...
                </Typography>
                <Typography mt={1}>...either way, you should probably</Typography>
                <Link to="/">go back to the homepage</Link>
            </Box>
        </Container>
    );
}
