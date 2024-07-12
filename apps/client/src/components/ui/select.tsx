import { Box } from "@mui/material";
import { Done } from "@mui/icons-material";
import type { BoxProps, SxProps, Theme } from "@mui/material";

export function SelectContainer({ isSelected, ...props }: { isSelected: boolean } & BoxProps) {
    const optionContainerStyle: SxProps<Theme> = ({ palette: { primary, background, divider } }) => ({
        cursor: "pointer",
        border: "1px solid",
        borderColor: isSelected ? primary.main : divider,
        backgroundColor: isSelected ? "#F0F8F8" : background.default,
        px: 2,
        pt: 0.5,
        pb: 1.5,
        borderRadius: 1.5,
        maxWidth: "max-content",
    });

    return <Box sx={optionContainerStyle} {...props} />;
}

export function SelectTick({ isSelected }: { isSelected: boolean }) {
    const optionTickStyle: SxProps<Theme> = ({ palette: { primary, background, divider } }) => ({
        width: 18,
        height: 18,
        border: "1px solid",
        borderRadius: 9999,
        borderColor: isSelected ? primary.main : divider,
        backgroundColor: isSelected ? primary.main : background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: background.default,
    });

    return (
        <Box sx={optionTickStyle}>
            <Done sx={{ fontSize: 14 }} />
        </Box>
    );
}
