import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt__access__token as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;
    const isUserExist = await User.isUserExistsByCustomId(userId);

    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // check user is deleted or not
    const isDeleted = isUserExist.isDeleted;
    if (isDeleted === true) {
      throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
    }

    // check user is blocked or not
    const userStatus = isUserExist.status;
    if (userStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked");
    }

    if (
      isUserExist.passwordChangedAt &&
      User.isJWTIssuedBBeforePasswordChange(
        isUserExist.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
