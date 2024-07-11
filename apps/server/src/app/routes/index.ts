import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/users/user.route";
import { ItemRoutes } from "../modules/items/item.route";
import { MealRoutes } from "../modules/meals/meal.route";

const router = express.Router();

const moduleRoutes = [
    { path: "/auth", routes: AuthRoutes },
    { path: "/user", routes: UserRoutes },
    { path: "/item", routes: ItemRoutes },
    { path: "/meal", routes: MealRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));
export default router;
