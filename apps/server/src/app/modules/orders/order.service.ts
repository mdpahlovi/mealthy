import httpStatus from "http-status";
import { Item, Meal, MealItem, Order, Prisma, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import { IOptions, calculatePagination } from "../../../helpers/paginationHelper";

const createOrder = async ({ date, mealId }: { date: string; mealId: string }, user: JwtPayload | null) => {
    if (!user || !user?.id || user?.role !== "USER") {
        throw new ApiError(httpStatus.BAD_REQUEST, "You aren't eligible to order...!");
    }

    const isExist = await prisma.order.findUnique({ where: { userId_date: { userId: user?.id as string, date } } });

    if (isExist) {
        return await prisma.order.update({
            where: { id: isExist?.id },
            data: { date, mealId, userId: user?.id as string },
        });
    } else {
        return await prisma.order.create({ data: { date, mealId, userId: user?.id as string } });
    }
};

const getAllOrder = async (options: IOptions, query: any) => {
    const { page, size, skip, sortBy, sortOrder } = calculatePagination(options);
    let orderFilters: Prisma.OrderWhereInput = {};

    if (query?.userId) {
        orderFilters = { ...orderFilters, userId: query?.userId };
    }

    if (query?.date) {
        orderFilters = { ...orderFilters, date: query?.date };
    }

    const orderBy: Prisma.OrderOrderByWithRelationInput = { [sortBy]: sortOrder };

    const orders = await prisma.order.findMany({ where: orderFilters, skip, take: size, orderBy });
    const total = await prisma.order.count({ where: orderFilters });

    return { meta: { page, size, total, totalPage: Math.ceil(total / size) }, data: orders };
};

const getOrdersToday = async (options: IOptions) => {
    const { page, size, skip, sortBy, sortOrder } = calculatePagination(options);

    const orderBy: Prisma.UserOrderByWithRelationInput = { [sortBy]: sortOrder };

    const orders = await prisma.user.findMany({
        include: { orders: { include: { meal: { include: { mealItems: { include: { item: true } } } } } } },
        skip,
        take: size,
        orderBy,
    });
    const total = await prisma.user.count({});

    return { meta: { page, size, total, totalPage: Math.ceil(total / size) }, data: orders };
};

const deleteOrder = async (id: string) => {
    return await prisma.order.delete({ where: { id } });
};

export const OrderService = { createOrder, getAllOrder, getOrdersToday, deleteOrder };
