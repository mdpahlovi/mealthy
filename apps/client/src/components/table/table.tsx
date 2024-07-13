import TableSort from "./table-sort";
import TableSearch from "@/components/table/table-search";
import TablePagination from "@/components/table/table-pagination";
import { Paper, TableContainer, Table as MuiTable, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

import type { Column } from "@/types";
import type { AxiosInstance } from "axios";
import { useQueryClient } from "react-query";

type TableProps<T> = {
    data: T[];
    columns: Column<T>;
    axiosInstance: AxiosInstance;
    sortBy?: string;
    sortOrder?: string;
    search?: { search: string; label: string };
    pagination?: { page: number; size: number; total: number };
};

export default function Table<T>({ data, columns, pagination, sortBy, sortOrder, search, axiosInstance }: TableProps<T>) {
    const queryClient = useQueryClient();
    const align = (idx: number) => (Math.ceil(columns.length / 2) < idx + 1 ? "right" : "left");

    return (
        <Paper>
            {search ? <TableSearch {...search} /> : null}
            <TableContainer>
                <MuiTable stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map(({ header, sort }, idx) => (
                                <TableCell key={idx} sx={{ whiteSpace: "nowrap" }} align={align(idx)}>
                                    {header}
                                    {sort && sortBy && sortOrder ? (
                                        <TableSort isSelected={sort === sortBy} sortBy={sort as string} sortOrder={sortOrder} />
                                    ) : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((d, idx) => (
                            <TableRow key={idx}>
                                {columns.map(({ cell }, idx) => (
                                    <TableCell key={idx} align={align(idx)}>
                                        {cell(d, axiosInstance, queryClient)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            {pagination ? <TablePagination {...pagination} /> : null}
        </Paper>
    );
}
