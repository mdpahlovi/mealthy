import { Prisma, Meal } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { IOptions, calculatePagination } from "../../../helpers/paginationHelper";

const createMeal = async ({ day, items }: { day: string; items: string[] }) => {
    return await prisma.meal.create({ data: { day, mealItems: { createMany: { data: items.map((item) => ({ itemId: item })) } } } });
};

const getAllMeal = async (options: IOptions) => {
    const { page, size, skip, sortBy, sortOrder } = calculatePagination(options);

    const orderBy: Prisma.MealOrderByWithRelationInput = { [sortBy]: sortOrder };
    const meals = await prisma.meal.findMany({ include: { mealItems: { include: { item: true } } }, skip, take: size, orderBy });
    const total = await prisma.meal.count();

    return { meta: { page, size, total, totalPage: Math.ceil(total / size) }, data: meals };
};

const deleteMeal = async (id: string) => {
    const [mealItems, meal] = await prisma.$transaction([
        prisma.mealItem.deleteMany({ where: { mealId: id } }),
        prisma.meal.delete({ where: { id } }),
    ]);

    return { mealItems, meal };
};

export const MealService = { createMeal, getAllMeal, deleteMeal };
