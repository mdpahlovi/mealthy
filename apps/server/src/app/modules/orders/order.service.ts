import httpStatus from "http-status";
import { Prisma } from "@prisma/client";
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
        return await prisma.order.update({ where: { id: isExist?.id }, data: { date, mealId, userId: user?.id as string } });
    } else {
        return await prisma.order.create({ data: { date, mealId, userId: user?.id as string } });
    }
};

const getAllOrder = async (options: IOptions, user: JwtPayload | null) => {
    const { page, size, skip, sortBy, sortOrder } = calculatePagination(options);

    const orderBy: Prisma.OrderOrderByWithRelationInput = { [sortBy]: sortOrder };

    const orders = await prisma.order.findMany({ skip, take: size, orderBy });
    const total = await prisma.order.count({});

    return { meta: { page, size, total, totalPage: Math.ceil(total / size) }, data: orders };
};

const deleteOrder = async (id: string) => {
    return await prisma.order.delete({ where: { id } });
};

export const OrderService = { createOrder, getAllOrder, deleteOrder };
