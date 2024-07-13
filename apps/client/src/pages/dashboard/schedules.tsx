import { useQuery } from "react-query";
import React, { useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { Table, TableSearch } from "@/components/table";
import UserLoader from "@/components/dashboard/users/user-loader";
import { Box, Button, Divider, Modal, Paper, Typography } from "@mui/material";

import type { Prisma } from "@prisma/client";
import type { Column, GenericErrorResponse, IApiResponse } from "@/types";

type IUserOrder = Prisma.UserGetPayload<{
    include: { orders: { include: { meal: { include: { mealItems: { include: { item: true } } } } } } };
}>;

export default function Users() {
    const baseAxios = useAxiosRequest();
    const [searchParams] = useSearchParams();
    const [open, setOpen] = useState<IUserOrder>();

    const search = searchParams.get("search") ? searchParams.get("search")! : "";
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!) : 10;

    const { data, isLoading } = useQuery<IApiResponse<IUserOrder[]>, GenericErrorResponse>({
        queryKey: ["today's-order", { search, page, size }],
        queryFn: async () => await baseAxios.get("/order/today", { params: { search, page, size } }),
        keepPreviousData: true,
    });

    const columns: Column<IUserOrder> = [
        { header: "Name", cell: ({ name }) => name },
        { header: "Email", cell: ({ email }) => email },
        { header: "Role", cell: ({ role }) => role },
        {
            header: "Orders",
            cell: (data) => (
                <Button size="small" onClick={() => setOpen(data)}>
                    Orders
                </Button>
            ),
        },
    ];

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

            <Modal
                open={open !== undefined ? true : false}
                onClose={() => setOpen(undefined)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Box
                    sx={{
                        minWidth: 704,
                        maxWidth: 704,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "background.default",
                        borderRadius: 3,
                    }}
                >
                    {open?.orders?.length ? (
                        <>
                            <Typography sx={{ width: "100%", mb: 1 }} variant="h6" fontWeight={700}>
                                Orders
                            </Typography>
                            <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
                                {open?.orders?.map(({ date, meal }) => (
                                    <Paper sx={{ width: "100%", maxWidth: 316, px: 1, height: "max-content" }}>
                                        <Typography variant="h6" fontWeight={700}>
                                            {date}
                                        </Typography>
                                        {meal ? (
                                            meal?.mealItems?.map(({ item: { name, category } }, idx) => (
                                                <React.Fragment key={idx}>
                                                    {idx !== 0 ? <Divider /> : null}
                                                    <Typography pb={0.75} pt={idx === 0 ? 0 : 0.75} pl={1}>
                                                        &#9755; {name},{" "}
                                                        <Typography component="span" variant="body2" color="text.secondary">
                                                            {category.charAt(0) + category.slice(1).toLowerCase()}
                                                        </Typography>
                                                    </Typography>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <Typography pb={0.75} pl={1}>
                                                &#9755; No Meal
                                            </Typography>
                                        )}
                                    </Paper>
                                ))}
                            </Box>
                        </>
                    ) : (
                        <Typography>No Orders</Typography>
                    )}
                </Box>
            </Modal>
        </>
    );
}
