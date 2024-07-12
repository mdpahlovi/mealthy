import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { EditNote, Delete } from "@mui/icons-material";
import { Table, TableSearch } from "@/components/table";
import { Box, Button, IconButton } from "@mui/material";
import ItemLoader from "@/components/dashboard/items/item-loader";

import type { Item } from "@prisma/client";
import type { Column, GenericErrorResponse, IApiResponse } from "@/types";

dayjs.extend(LocalizedFormat);

const columns: Column<Item> = [
    { header: "Name", cell: ({ name }) => name },
    { header: "Category", cell: ({ category }) => category },
    { header: "Created At", cell: ({ createdAt }) => dayjs(createdAt).format("LL") },
    {
        header: "Actions",
        cell: (data, axios, queryClient) => {
            const deleteItem = async () => await axios.delete(`/item/${data?.id}`);

            return (
                <Box display="flex" justifyContent="end">
                    <Link to={`/dashboard/edit-item/${data?.id}`} state={data}>
                        <IconButton>
                            <EditNote />
                        </IconButton>
                    </Link>
                    <IconButton
                        color="error"
                        onClick={() =>
                            deleteItem()
                                .then(() => queryClient.invalidateQueries("item"))
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

export default function Items() {
    const baseAxios = useAxiosRequest();
    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") ? searchParams.get("search")! : "";
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!) : 10;
    const sortBy = searchParams.get("sortBy") ? searchParams.get("sortBy")! : "createdAt";
    const sortOrder = searchParams.get("sortOrder") ? searchParams.get("sortOrder")! : "desc";

    const { data, isLoading } = useQuery<IApiResponse<Item[]>, GenericErrorResponse>({
        queryKey: ["item", { search, page, size, sortBy, sortOrder }],
        queryFn: async () => await baseAxios.get("/item", { params: { search, page, size, sortBy, sortOrder } }),
        keepPreviousData: true,
    });

    return (
        <>
            <Box display="flex" justifyContent="end" gap={3} mb={3}>
                <TableSearch search={search} label="Item" />
                {/* @ts-ignore */}
                <Button sx={{ px: 6 }} LinkComponent={Link} to="/dashboard/create-item">
                    Create Item
                </Button>
            </Box>
            {isLoading ? (
                <ItemLoader />
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
