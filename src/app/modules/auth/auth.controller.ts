import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendRequest";
import httpStatus from "http-status";
import config from "../../config";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully!",
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.changePasswordIntoDb(req.user, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password is changed successfully!",
    data: user,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const user = await AuthServices.refreshTokenIntoDB(refreshToken);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Token  is refreshed successfully!",
    data: user,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.id;
  const user = await AuthServices.forgetPasswordDb(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Forget password link is generated successfully!",
    data: user,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPasswordDb(req.body, token as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password is reset successfully!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
