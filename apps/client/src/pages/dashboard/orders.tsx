import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "react-query";
import React, { useState } from "react";
import { useAxiosRequest } from "@/hooks/useAxiosRequest";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Typography, Divider, styled } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import type { IApiResponse } from "@/types";
import type { Item, MealItem, Meal } from "@prisma/client";
import { SelectContainer, SelectTick } from "@/components/ui";
import SaveOrders from "@/components/dashboard/orders/save-orders";

type IMeal = { mealItems: ({ item: Item } & MealItem)[] } & Meal;
const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export default function Orders() {
    const baseAxios = useAxiosRequest();
    const [date, setDate] = useState<Dayjs>(dayjs());
    const [mealId, setMealId] = useState<string | null>(null);

    const { data, isLoading } = useQuery<IApiResponse<IMeal[]>>({
        queryKey: "meal",
        queryFn: async () => await baseAxios.get("/meal"),
    });

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                    <DateCalendar value={date} onChange={setDate} disablePast />
                </DemoContainer>
            </LocalizationProvider>

            {isLoading ? "Loading..." : ""}

            {date?.day() !== undefined && data?.data?.length ? (
                <MealContainer>
                    <SelectContainer
                        isSelected={mealId === null}
                        style={{ maxWidth: "100%", paddingBottom: 0 }}
                        onClick={() => setMealId(null)}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight={700}>
                                {dayjs(date).format("ddd, MMM DD")}
                            </Typography>
                            <SelectTick isSelected={mealId === null} />
                        </Box>
                        <Typography pb={0.75} pl={1}>
                            &#9755; No Meal
                        </Typography>
                    </SelectContainer>
                    {data?.data
                        ?.filter((meal) => meal.day === days[date?.day()])
                        ?.map(({ id, mealItems }, idx) => (
                            <SelectContainer
                                key={idx}
                                isSelected={id === mealId}
                                style={{ maxWidth: "100%", paddingBottom: 0 }}
                                onClick={() => setMealId(id)}
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight={700}>
                                        {dayjs(date).format("ddd, MMM DD")}
                                    </Typography>
                                    <SelectTick isSelected={id === mealId} />
                                </Box>
                                {mealItems?.map(({ item: { name, category } }, idx) => (
                                    <React.Fragment key={idx}>
                                        {idx !== 0 ? <Divider /> : null}
                                        <Typography pb={0.75} pt={idx === 0 ? 0 : 0.75} pl={1}>
                                            &#9755; {name},{" "}
                                            <Typography component="span" variant="body2" color="text.secondary">
                                                {category.charAt(0) + category.slice(1).toLowerCase()}
                                            </Typography>
                                        </Typography>
                                    </React.Fragment>
                                ))}
                            </SelectContainer>
                        ))}
                </MealContainer>
            ) : null}

            <SaveOrders {...{ date, mealId, setMealId, baseAxios }} />
        </>
    );
}

const MealContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gap: 24,
    [theme.breakpoints.up("sm")]: { gridTemplateColumns: "repeat(2, 1fr)" },
    [theme.breakpoints.up("lg")]: { gridTemplateColumns: "repeat(3, 1fr)" },
}));
