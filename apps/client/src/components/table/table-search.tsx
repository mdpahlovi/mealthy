import { useSearchParams } from "react-router-dom";
import { Close, Search } from "@mui/icons-material";
import { Box, IconButton, InputBase, InputBaseProps } from "@mui/material";

export type TablePaginationProps = { total: number; page: number; size: number };

export default function TableSearch({ search, label }: { search: string; label: string }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputProps: InputBaseProps = {
        placeholder: `Search ${label}`,
        value: search,
        sx: ({ palette: { divider } }) => ({
            flex: 1,
            maxWidth: 512,
            height: 42,
            px: 4.5,
            border: `1px solid ${divider}`,
            borderRadius: 9999,
        }),
    };

    return (
        <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search sx={{ position: "absolute", left: 10 }} />
            <InputBase {...inputProps} onChange={(e) => setSearchParams({ search: e.target.value })} />
            {search ? (
                <IconButton
                    color="default"
                    onClick={() => {
                        searchParams.delete("search");
                        setSearchParams(searchParams);
                    }}
                    sx={{ position: "absolute", right: 4 }}
                >
                    <Close />
                </IconButton>
            ) : null}
        </Box>
    );
}
