import { useSearchParams } from "react-router-dom";
import { TablePagination as MuiTablePagination } from "@mui/material";

export default function TablePagination({ total, page, size }: { total: number; page: number; size: number }) {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <MuiTablePagination
            rowsPerPageOptions={[1, 5, 10, 15, 20]}
            component="div"
            count={total}
            rowsPerPage={size}
            page={page - 1}
            onPageChange={(_, page) => {
                searchParams.set("page", (page + 1).toString());
                setSearchParams(searchParams);
            }}
            onRowsPerPageChange={(e) => {
                searchParams.set("size", e.target.value.toString());
                setSearchParams(searchParams);
            }}
        />
    );
}
