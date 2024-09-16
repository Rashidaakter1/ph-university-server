import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendRequest";
import catchAsync from "../../utils/catchAsync";

const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);

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
      message: "Student are retrieved successfully",
      data: result,
    });
  }
);

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted successfully",
      data: result,
    });
  }
);

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
