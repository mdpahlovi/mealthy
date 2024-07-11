import { Close } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { IconButton, TextField } from "@mui/material";

export type TablePaginationProps = { total: number; page: number; size: number };

export default function TableSearch({ search, label }: { search: string; label: string }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputProps = { label: `Search ${label}`, value: search, sx: { flex: 1, maxWidth: 512 } };

    return (
        <TextField
            {...inputProps}
            onChange={(e) => setSearchParams({ search: e.target.value })}
            InputProps={{
                endAdornment: search ? (
                    <IconButton
                        color="default"
                        onClick={() => {
                            searchParams.delete("search");
                            setSearchParams(searchParams);
                        }}
                    >
                        <Close />
                    </IconButton>
                ) : null,
            }}
        />
    );
}
