import express from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create", auth("ADMIN"), UserController.createUser);

router.get("/", auth("ADMIN"), UserController.getAllUser);

router.get("/:id", auth("ADMIN"), UserController.getSingleUser);

router.patch("/:id", auth("ADMIN"), UserController.updateUser);

router.delete("/:id", auth("ADMIN"), UserController.deleteUser);

export const UserRoutes = router;
