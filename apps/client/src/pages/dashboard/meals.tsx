import React from "react";
import { useMutation, useQuery } from "react-query";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { Delete } from "@mui/icons-material";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Button, Typography, IconButton, Paper, styled, Divider } from "@mui/material";

import type { IApiResponse } from "@/types";
import type { Item, Meal, MealItem } from "@prisma/client";
import { Pagination } from "@/components/ui";

type IMeal = { mealItems: ({ item: Item } & MealItem)[] } & Meal;

export default function Meals() {
    const baseAxios = useAxiosRequest();
    const [searchParams] = useSearchParams();

    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
    const size = searchParams.get("size") ? parseInt(searchParams.get("size")!) : 6;

    const { data, isLoading, isRefetching, refetch } = useQuery<IApiResponse<IMeal[]>>({
        queryKey: ["meal", { page, size }],
        queryFn: async () => await baseAxios.get("/meal", { params: { page, size } }),
        keepPreviousData: true,
    });

    const { mutate, isLoading: deleteLoading } = useMutation(async (id: string) => await baseAxios.delete(`/meal/${id}`), {
        onSuccess: () => {
            refetch();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <>
            <Box display="flex" justifyContent="end" gap={3} mb={3}>
                {/* @ts-ignore */}
                <Button size="large" sx={{ px: 6 }} LinkComponent={Link} to="/dashboard/create-meal">
                    Create Meal
                </Button>
            </Box>
            {isLoading ? (
                <Box>
                    <Typography>Loading...</Typography>
                </Box>
            ) : (
                <>
                    <MealContainer>
                        {data?.data?.map(({ id, day, mealItems }) => (
                            <Paper sx={{ pt: 0.25, px: 1.75 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        {day.charAt(0) + day.slice(1).toLowerCase()}
                                    </Typography>
                                    <IconButton edge="end" onClick={() => mutate(id)} disabled={deleteLoading || isRefetching}>
                                        <Delete />
                                    </IconButton>
                                </Box>
                                {mealItems?.map(({ item: { name, category } }, idx) => (
                                    <React.Fragment key={id}>
                                        {idx !== 0 ? <Divider /> : null}
                                        <Typography pb={0.75} pt={idx === 0 ? 0 : 0.75} pl={1}>
                                            &#9755; {name},{" "}
                                            <Typography component="span" variant="body2" color="text.secondary">
                                                {category.charAt(0) + category.slice(1).toLowerCase()}
                                            </Typography>
                                        </Typography>
                                    </React.Fragment>
                                ))}
                            </Paper>
                        ))}
                    </MealContainer>
                    <Pagination page={page} totalPage={Math.ceil((data?.meta?.total || 0) / size)} />
                </>
            )}
        </>
    );
}

const MealContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gap: 24,
    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
}));
