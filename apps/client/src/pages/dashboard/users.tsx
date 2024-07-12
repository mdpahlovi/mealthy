import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { EditNote, Delete } from "@mui/icons-material";
import { Table, TableSearch } from "@/components/table";
import { Box, Button, IconButton } from "@mui/material";
import UserLoader from "@/components/dashboard/users/user-loader";

import type { User } from "@prisma/client";
import type { Column, GenericErrorResponse, IApiResponse } from "@/types";

dayjs.extend(LocalizedFormat);

const columns: Column<User> = [
    { header: "Name", cell: ({ name }) => name },
    { header: "Email", cell: ({ email }) => email },
    { header: "Role", cell: ({ role }) => role },
    {
        header: "Status",
        cell: ({ id, isBanned }, axios, queryClient) => {
            const updateUser = async (isBanned: boolean) => await axios.patch(`/user/${id}`, { isBanned });

            return isBanned ? (
                <Button
                    size="small"
                    onClick={() =>
                        updateUser(false)
                            .then(() => queryClient.invalidateQueries("user"))
                            .catch((error) => toast.error(error?.message))
                    }
                >
                    UnBan
                </Button>
            ) : (
                <Button
                    size="small"
                    color="error"
                    onClick={() =>
                        updateUser(true)
                            .then(() => queryClient.invalidateQueries("user"))
                            .catch((error) => toast.error(error?.message))
                    }
                >
                    Ban
                </Button>
            );
        },
    },
    { header: "Created At", cell: ({ createdAt }) => dayjs(createdAt).format("LL") },
    {
        header: "Actions",
        cell: (data, axios, queryClient) => {
            const deleteUser = async () => await axios.delete(`/user/${data?.id}`);

            return (
                <Box display="flex" justifyContent="end">
                    <Link to={`/dashboard/edit-user/${data?.id}`} state={data}>
                        <IconButton>
                            <EditNote />
                        </IconButton>
                    </Link>
                    <IconButton
                        color="error"
                        onClick={() =>
                            deleteUser()
                                .then(() => queryClient.invalidateQueries("user"))
                                .catch((error) => toast.error(error?.message))
                        }
                    >
                        <Delete />
                    </IconButton>
                </Box>
            );
        },
    },
];

export default function Users() {
    const baseAxios = useAxiosRequest();
    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") ? searchParams.get("search")! : "";
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!) : 10;
    const sortBy = searchParams.get("sortBy") ? searchParams.get("sortBy")! : "createdAt";
    const sortOrder = searchParams.get("sortOrder") ? searchParams.get("sortOrder")! : "desc";

    const { data, isLoading } = useQuery<IApiResponse<User[]>, GenericErrorResponse>({
        queryKey: ["user", { search, page, size, sortBy, sortOrder }],
        queryFn: async () => await baseAxios.get("/user", { params: { search, page, size, sortBy, sortOrder } }),
        keepPreviousData: true,
    });

    return (
        <>
            <Box display="flex" justifyContent="end" gap={3} mb={3}>
                <TableSearch search={search} label="User" />
                {/* @ts-ignore */}
                <Button size="large" sx={{ px: 6 }} LinkComponent={Link} to="/dashboard/create-user">
                    Create User
                </Button>
            </Box>
            {isLoading ? (
                <UserLoader />
            ) : (
                <Table
                    columns={columns}
                    data={data?.data || []}
                    axiosInstance={baseAxios}
                    pagination={{ page, size, total: data?.meta?.total! }}
                />
            )}
        </>
    );
}
