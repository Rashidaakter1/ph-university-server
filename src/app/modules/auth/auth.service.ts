import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utlis";
import sendEmail from "../../utils/sendEmail";

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;
  // check user is exist or not
  const isUserExist = await User.isUserExistsByCustomId(id);
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

  const hashedPassword = isUserExist.password;
  if (!(await User.isPasswordMatch(password, hashedPassword))) {
    throw new AppError(httpStatus.FORBIDDEN, "password mismatch");
  }

  //create token and sent to the  client

  const jwtPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt__access__token as string,
    config.jwt__access__expires__in as string
  );

  // creating a refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt__refresh__token as string,
    config.jwt__refresh__expires__in as string
  );

  return {
    accessToken,
    needsPasswordChange: isUserExist.needsPasswordChange,
    refreshToken,
  };
};

const changePasswordIntoDb = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  // check user is exist or not
  const isUserExist = await User.isUserExistsByCustomId(userData.userId);
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

  const hashedPassword = isUserExist.password;
  if (!(await User.isPasswordMatch(payload?.oldPassword, hashedPassword))) {
    throw new AppError(httpStatus.FORBIDDEN, "password mismatch");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt__saltRound)
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshTokenIntoDB = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt__refresh__token as string
  ) as JwtPayload;

  const { userId, iat } = decoded;
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

  // create  a token now after validations

  const jwtPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt__access__token as string,
    config.jwt__access__expires__in as string
  );
  return {
    accessToken,
  };
};

const forgetPasswordDb = async (userId: string) => {
  // check user is exist or not
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

  const jwtPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt__access__token as string,
    "10m"
  );

  const resultUILink = `${config.reset__ui__link}?id=${isUserExist.id}&token=${resetToken}`;
  console.log(resultUILink, isUserExist.email);
  sendEmail(isUserExist.email, resultUILink);
};

const resetPasswordDb = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  // check user is exist or not
  const isUserExist = await User.isUserExistsByCustomId(payload.id);
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

  const decoded = jwt.verify(
    token,
    config.jwt__access__token as string
  ) as JwtPayload;
  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is not matched");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt__saltRound)
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
};
export const AuthServices = {
  loginUser,
  changePasswordIntoDb,
  refreshTokenIntoDB,
  forgetPasswordDb,
  resetPasswordDb,
};


