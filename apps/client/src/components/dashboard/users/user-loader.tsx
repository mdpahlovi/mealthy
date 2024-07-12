import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { Box, Skeleton } from "@mui/material";
import { Table } from "@/components/table";

import type { Column } from "@/types";
import type { User } from "@prisma/client";

const columns: Column<User> = [
    { header: "Name", cell: () => <Skeleton variant="text" width={128} /> },
    { header: "Email", cell: () => <Skeleton variant="text" width={160} /> },
    { header: "Role", cell: () => <Skeleton variant="text" width={72} /> },
    {
        header: "Status",
        cell: () => <Skeleton variant="rectangular" width={70} height={30} sx={{ ml: "auto", borderRadius: 9999 }} />,
    },
    { header: "Created At", cell: () => <Skeleton variant="text" width={160} sx={{ ml: "auto" }} /> },
    {
        header: "Actions",
        cell: () => {
            return (
                <Box display="flex" justifyContent="end" gap={3}>
                    <Skeleton variant="rectangular" width={36} height={36} sx={{ borderRadius: 9999 }} />
                    <Skeleton variant="rectangular" width={36} height={36} sx={{ borderRadius: 9999 }} />
                </Box>
            );
        },
    },
];

export default function UserLoader() {
    const baseAxios = useAxiosRequest();

    return <Table data={[...Array(5)]} columns={columns} axiosInstance={baseAxios} />;
}
