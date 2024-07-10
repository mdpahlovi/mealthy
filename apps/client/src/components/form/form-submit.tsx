import { Button, CircularProgress } from "@mui/material";

export default function FormSubmit({ loading, children }: { loading: boolean } & React.PropsWithChildren) {
    return (
        <Button type="submit" sx={{ mt: 1 }} disabled={loading}>
            {loading ? (
                <>
                    <CircularProgress size={20} sx={{ mr: 1 }} /> Loading
                </>
            ) : (
                children
            )}
        </Button>
    );
}
