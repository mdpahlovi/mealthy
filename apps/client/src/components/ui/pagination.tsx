import { useSearchParams } from "react-router-dom";
import { Pagination as MuiPagination } from "@mui/material";

export default function pagination({ page, totalPage }: { page: number; totalPage: number }) {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <MuiPagination
            count={totalPage}
            page={page}
            onChange={(_, page) => {
                searchParams.set("page", page.toString());
                setSearchParams(searchParams);
            }}
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            color="primary"
        />
    );
}
