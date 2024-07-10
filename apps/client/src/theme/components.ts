import { filledInputClasses } from "@mui/material";
import type { Components, Theme } from "@mui/material";

export const components: Components<Omit<Theme, "components">> = {
    MuiButton: {
        defaultProps: { color: "primary", variant: "contained" },
        styleOverrides: { root: { boxShadow: "none", textTransform: "none", borderRadius: "9999px", paddingInline: "1.5rem" } },
    },
    MuiIconButton: {
        defaultProps: { color: "primary" },
        styleOverrides: { root: { borderRadius: "12px" }, sizeMedium: { padding: "6px" } },
    },
    MuiTextField: { defaultProps: { fullWidth: true, variant: "filled" } },
    MuiFilledInput: {
        styleOverrides: {
            root: ({ theme }) => ({
                overflow: "hidden",
                backgroundColor: "transparent",
                borderRadius: "12px",
                border: `1px solid ${theme.palette.divider}`,
                transition: theme.transitions.create(["border-color", "box-shadow"]),
                "&:hover": { backgroundColor: theme.palette.action.hover },
                "&:before": { display: "none" },
                "&:after": { display: "none" },
                [`&.${filledInputClasses.disabled}`]: { backgroundColor: "transparent" },
                [`&.${filledInputClasses.focused}`]: {
                    backgroundColor: "transparent",
                    borderColor: theme.palette.primary.main,
                },
                [`&.${filledInputClasses.error}`]: { borderColor: theme.palette.error.main },
            }),
        },
    },
    MuiFormLabel: { styleOverrides: { root: { marginTop: "2px" } } },
    MuiAvatar: { defaultProps: { variant: "rounded" }, styleOverrides: { rounded: { borderRadius: 16 } } },
    MuiCardContent: { styleOverrides: { root: { padding: 16, "&:last-child": { paddingBottom: 16 } } } },
};
