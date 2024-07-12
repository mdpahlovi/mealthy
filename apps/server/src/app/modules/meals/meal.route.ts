import express from "express";
import auth from "../../middlewares/auth";
import { MealController } from "./meal.controller";

const router = express.Router();

router.post("/create", auth("ADMIN"), MealController.createMeal);

router.get("/", auth("ADMIN"), MealController.getAllMeal);

router.delete("/:id", auth("ADMIN"), MealController.deleteMeal);

export const MealRoutes = router;
