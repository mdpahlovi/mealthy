import httpStatus from "http-status";
import { Request, Response } from "express";
import { pick } from "../../../shared/pick";
import { MealService } from "./meal.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { paginationFields } from "../../../constants/pagination";

const createMeal = catchAsync(async (req: Request, res: Response) => {
    const result = await MealService.createMeal(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Meal Created Successfully...!",
        data: result,
    });
});

const getAllMeal = catchAsync(async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const result = await MealService.getAllMeal(paginationOptions);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Meal Retrieves Successfully...!",
        meta: result.meta,
        data: result.data,
    });
});

const getSingleMeal = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MealService.getSingleMeal(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Meal Retrieve Successfully...!",
        data: result,
    });
});

const updateMeal = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MealService.updateMeal(req.body, id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Meal Updated Successfully...!",
        data: result,
    });
});

const deleteMeal = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MealService.deleteMeal(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Meal Deleted Successfully...!",
        data: result,
    });
});

export const MealController = { createMeal, getAllMeal, getSingleMeal, updateMeal, deleteMeal };
