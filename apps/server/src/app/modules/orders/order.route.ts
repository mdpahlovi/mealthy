import express from "express";
import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/create", auth("USER", "ADMIN"), OrderController.createOrder);

router.get("/", auth("ADMIN"), OrderController.getAllOrder);

router.get("/users", auth("ADMIN"), OrderController.getOrdersToday);

router.delete("/:id", auth("ADMIN"), OrderController.deleteOrder);

export const OrderRoutes = router;
