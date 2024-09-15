import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendRequest";
import catchAsync from "../../utils/catchAsync";

const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is retrieved succesfully",
      data: result,
    });
  }
);

const getAllStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student are retrieved succesfully",
      data: result,
    });
  }
);

const deleteStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted succesfully",
      data: result,
    });
  }
);

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
