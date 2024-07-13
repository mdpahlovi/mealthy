import { IconButton } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";

// "desc" "asc"

export default function TableSort({ isSelected, sortBy, sortOrder }: { isSelected: boolean; sortBy: string; sortOrder: string }) {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <IconButton
            color={isSelected ? "primary" : "default"}
            style={{ marginLeft: 8, maxWidth: 28, height: 28 }}
            onClick={() => {
                searchParams.set("sortBy", sortBy);
                searchParams.set("sortOrder", sortOrder === "asc" ? "desc" : "asc");
                setSearchParams(searchParams);
            }}
        >
            {sortOrder === "asc" ? <KeyboardDoubleArrowDown sx={{ fontSize: 18 }} /> : <KeyboardDoubleArrowUp sx={{ fontSize: 18 }} />}
        </IconButton>
    );
}
