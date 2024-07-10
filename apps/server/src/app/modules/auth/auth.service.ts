import httpStatus from "http-status";
import config from "../../../config";
import { compare, hash } from "bcrypt";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";
import { exclude } from "../../../shared/exclude";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

type SignupUserPayload = { name: string; email: string; password: string };
type SigninUserPayload = { email: string; password: string };

const select = { id: true, name: true, role: true, email: true, password: true, isBanned: true };

const signupUser = async (payload: SignupUserPayload) => {
    const isExist = await prisma.user.findUnique({ where: { email: payload.email } });
    if (isExist) throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exists...!");

    payload.password = await hash(payload.password, 12);
    const user = await prisma.user.create({ data: { ...payload, role: "USER" }, select });

    const result = exclude(user, ["password"]);
    const accessToken = jwtHelpers.createToken(result, config.jwt.secret!, "7d");
    return { user: result, token: accessToken };
};

const signinUser = async (payload: SigninUserPayload) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({ where: { email }, select });

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist...!");
    if (user.isBanned) throw new ApiError(httpStatus.NOT_FOUND, "You are temporary banned...!");

    if (!user?.password || !(await compare(password, user.password))) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Password doesn't match...!");
    }

    const result = exclude(user, ["password", "isBanned"]);
    const accessToken = jwtHelpers.createToken(result, config.jwt.secret!, "7d");
    return { user: result, token: accessToken };
};

export const AuthService = { signupUser, signinUser };
