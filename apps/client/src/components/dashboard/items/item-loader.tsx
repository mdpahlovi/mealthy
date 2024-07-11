import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { Box, Skeleton } from "@mui/material";
import { Table } from "@/components/table";

import type { Column } from "@/types";
import type { Item } from "@prisma/client";

const columns: Column<Item> = [
    { header: "Name", cell: () => <Skeleton variant="text" width={128} /> },
    { header: "Category", cell: () => <Skeleton variant="text" width={144} /> },
    { header: "Created At", cell: () => <Skeleton variant="text" width={160} sx={{ ml: "auto" }} /> },
    {
        header: "Actions",
        cell: () => {
            return (
                <Box display="flex" justifyContent="end" gap={3}>
                    <Skeleton variant="rectangular" width={36} height={36} />
                    <Skeleton variant="rectangular" width={36} height={36} />
                </Box>
            );
        },
    },
];

export default function ItemLoader() {
    const baseAxios = useAxiosRequest();

    return <Table data={[...Array(5)]} columns={columns} axiosInstance={baseAxios} />;
}
