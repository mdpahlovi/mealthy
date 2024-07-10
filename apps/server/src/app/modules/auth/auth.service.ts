import httpStatus from "http-status";
import { compare, hash } from "bcrypt";
import ApiError from "../../../errors/ApiError";
import { prisma } from "../../../shared/prisma";
import { exclude } from "../../../shared/exclude";

type SignupUserPayload = { name: string; email: string; password: string };
type SigninUserPayload = { email: string; password: string };

const signupUser = async (payload: SignupUserPayload) => {
    const isExist = await prisma.user.findUnique({ where: { email: payload.email } });
    if (isExist) throw new ApiError(httpStatus.BAD_REQUEST, "User Already Exists...!");

    payload.password = await hash(payload.password, 12);
    const user = await prisma.user.create({ data: { ...payload, role: "USER" } });

    const result = exclude(user, ["password"]);
    return result;
};

const signinUser = async (payload: SigninUserPayload) => {
    const { email, password } = payload;

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, name: true, role: true, email: true, password: true, isBanned: true },
    });

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist...!");
    if (user.isBanned) throw new ApiError(httpStatus.NOT_FOUND, "You are temporary banned...!");

    if (!user?.password || !(await compare(password, user.password))) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Password doesn't match...!");
    }

    const result = exclude(user, ["password", "isBanned"]);
    return result;
};

export const AuthService = { signupUser, signinUser };
