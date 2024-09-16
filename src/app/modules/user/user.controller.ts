import httpStatus from "http-status";

import { NextFunction, Request, RequestHandler, Response } from "express";

import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendRequest";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      req.file,
      password,
      studentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  }
);
const createFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, faculty: facultyData } = req.body;
    console.log(password, facultyData);
    const result = await UserServices.createFacultyIntoDB(
      req.file,
      password,
      facultyData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty is created successfully",
      data: result,
    });
  }
);

const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, admin: adminData } = req.body;
    const result = await UserServices.createAdminIntoDb(
      req.file,
      password,
      adminData
    );
    sendResponse(res, {
      success: true,
      message: "Admin is created successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, role } = req.user;
    const result = await UserServices.getMe(userId, role);
    sendResponse(res, {
      success: true,
      message: "User is retrieved successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
