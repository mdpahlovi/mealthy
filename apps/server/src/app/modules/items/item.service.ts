import { Prisma, Item } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { itemSearchableFields } from "./item.constant";
import { searchHelper } from "../../../helpers/searchHelpers";
import { IOptions, calculatePagination } from "../../../helpers/paginationHelper";

const createItem = async (payload: Item) => {
    return await prisma.item.create({ data: { ...payload } });
};

const getAllItem = async (filters: { search?: string }, options: IOptions) => {
    const { search } = filters;
    const { page, size, skip, sortBy, sortOrder } = calculatePagination(options);

    const andConditions = [];
    if (search) andConditions.push(searchHelper(search, itemSearchableFields));

    const where: Prisma.ItemWhereInput = { AND: andConditions };
    const orderBy: Prisma.ItemOrderByWithRelationInput = { [sortBy]: sortOrder };
    const items = await prisma.item.findMany({ where, skip, take: size, orderBy });
    const total = await prisma.item.count({ where });

    return { meta: { page, size, total, totalPage: Math.ceil(total / size) }, data: items };
};

const getSingleItem = async (id: string) => {
    return await prisma.item.findUnique({ where: { id } });
};

const updateItem = async (payload: Partial<Item>, id: string) => {
    return await prisma.item.update({ where: { id }, data: payload });
};

const deleteItem = async (id: string) => {
    return await prisma.item.delete({ where: { id } });
};

export const ItemService = { createItem, getAllItem, getSingleItem, updateItem, deleteItem };
