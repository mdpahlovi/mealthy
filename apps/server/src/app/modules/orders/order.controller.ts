import httpStatus from "http-status";
import { Request, Response } from "express";
import { pick } from "../../../shared/pick";
import { OrderService } from "./order.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { paginationFields } from "../../../constants/pagination";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await OrderService.createOrder(req.body, user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order Created Successfully...!",
        data: result,
    });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const paginationOptions = pick(req.query, paginationFields);
    const result = await OrderService.getAllOrder(paginationOptions, user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order Retrieves Successfully...!",
        meta: result.meta,
        data: result.data,
    });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OrderService.deleteOrder(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order Deleted Successfully...!",
        data: result,
    });
});

export const OrderController = { createOrder, getAllOrder, deleteOrder };
