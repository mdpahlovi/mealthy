import express from "express";
import auth from "../../middlewares/auth";
import { ItemController } from "./item.controller";

const router = express.Router();

router.post("/create", auth("ADMIN"), ItemController.createItem);

router.get("/", auth("ADMIN"), ItemController.getAllItem);

router.get("/:id", auth("ADMIN"), ItemController.getSingleItem);

router.patch("/:id", auth("ADMIN"), ItemController.updateItem);

router.delete("/:id", auth("ADMIN"), ItemController.deleteItem);

export const ItemRoutes = router;
