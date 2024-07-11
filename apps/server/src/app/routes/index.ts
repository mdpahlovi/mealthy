import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/users/user.route";
import { ItemRoutes } from "../modules/items/item.route";

const router = express.Router();

const moduleRoutes = [
    { path: "/auth", routes: AuthRoutes },
    { path: "/user", routes: UserRoutes },
    { path: "/item", routes: ItemRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));
export default router;
