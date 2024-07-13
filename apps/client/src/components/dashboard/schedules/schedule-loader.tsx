import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { Skeleton } from "@mui/material";
import { Table } from "@/components/table";

import type { Column } from "@/types";
import type { User } from "@prisma/client";

const columns: Column<User> = [
    { header: "Name", cell: () => <Skeleton variant="text" width={128} /> },
    { header: "Email", cell: () => <Skeleton variant="text" width={160} /> },
    { header: "Role", cell: () => <Skeleton variant="text" width={72} /> },
    {
        header: "Orders",
        cell: () => <Skeleton variant="rectangular" width={88} height={30} sx={{ ml: "auto", borderRadius: 9999 }} />,
    },
];

export default function ScheduleLoader() {
    const baseAxios = useAxiosRequest();

    return <Table data={[...Array(5)]} columns={columns} axiosInstance={baseAxios} />;
}
