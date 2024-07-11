import httpStatus from "http-status";
import { Request, Response } from "express";
import { pick } from "../../../shared/pick";
import { ItemService } from "./item.service";
import { itemFilterableFields } from "./item.constant";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { paginationFields } from "../../../constants/pagination";

const createItem = catchAsync(async (req: Request, res: Response) => {
    const result = await ItemService.createItem(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Item Created Successfully...!",
        data: result,
    });
});

const getAllItem = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, itemFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ItemService.getAllItem(filters, paginationOptions);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Item Retrieves Successfully...!",
        meta: result.meta,
        data: result.data,
    });
});

const getSingleItem = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ItemService.getSingleItem(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Item Retrieve Successfully...!",
        data: result,
    });
});

const updateItem = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ItemService.updateItem(req.body, id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Item Updated Successfully...!",
        data: result,
    });
});

const deleteItem = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ItemService.deleteItem(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Item Deleted Successfully...!",
        data: result,
    });
});

export const ItemController = { createItem, getAllItem, getSingleItem, updateItem, deleteItem };
