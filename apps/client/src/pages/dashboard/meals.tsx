import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { useMutation, useQuery } from "react-query";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";

import { Link } from "react-router-dom";
import { Delete, Send } from "@mui/icons-material";
import { Box, Button, Typography, List, ListItemIcon, ListItemText, ListItem, IconButton, Paper } from "@mui/material";

import type { IApiResponse } from "@/types";
import type { Item, Meal, MealItem } from "@prisma/client";

dayjs.extend(LocalizedFormat);

type IMeal = { mealItems: ({ item: Item } & MealItem)[] } & Meal;

export default function Meals() {
    const baseAxios = useAxiosRequest();
    const { data, isLoading, refetch } = useQuery<IApiResponse<IMeal[]>>({
        queryKey: "meal",
        queryFn: async () => await baseAxios.get("/meal"),
    });

    const deleteMeal = async (id: string) => await baseAxios.delete(`/meal/${id}`);
    const { mutate } = useMutation(deleteMeal, {
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                    {data?.data?.map(({ id, day, mealItems, createdAt }) => (
                        <Paper sx={{ pt: 0.75 }}>
                            <List
                                key={id}
                                dense
                                subheader={
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" onClick={() => mutate(id)}>
                                                <Delete />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={dayjs(createdAt).format("LL") + ". " + day.charAt(0) + day.slice(1).toLowerCase()}
                                        />
                                    </ListItem>
                                }
                            >
                                {mealItems?.map(({ item: { id, name, category } }) => (
                                    <ListItem key={id}>
                                        <ListItemIcon>
                                            <Send />
                                        </ListItemIcon>
                                        <ListItemText primary={name} secondary={category.charAt(0) + category.slice(1).toLowerCase()} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    ))}
                </div>
            )}
        </>
    );
}
