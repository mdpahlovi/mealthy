import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
const router = express.Router();

router.post("/signup", validateRequest(AuthValidation.signupValidate), AuthController.signupUser);

router.post("/signin", validateRequest(AuthValidation.signinValidate), AuthController.signinUser);

export const AuthRoutes = router;
