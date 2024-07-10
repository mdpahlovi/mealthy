import config from "../../config";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { Role } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { NextFunction, Request, Response } from "express";

const auth =
    (...requiredRoles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, "UnAuthorized");

            let verifiedUser = null;
            verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
            req.user = verifiedUser;

            if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
                throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
            }
            next();
        } catch (error) {
            next(error);
        }
    };

export default auth;
