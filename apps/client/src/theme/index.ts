import { createTheme } from "@mui/material";
import { components } from "@/theme/components";
import { primary, secondary } from "@/theme/colors";

export const theme = createTheme({
    palette: { primary, secondary },
    shape: { borderRadius: 8 },
    components,
    typography: { fontFamily: "Roboto" },
});
