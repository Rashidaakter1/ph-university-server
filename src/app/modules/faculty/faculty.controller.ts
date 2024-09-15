import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import sendResponse from "../../utils/sendRequest";
import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { facultyId } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(facultyId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "single Faculty is retrieved successfully",
      data: result,
    });
  }
);

const getAllFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    const result = await FacultyServices.getAllFacultyFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty are retrieved succesfully",
      data: result,
    });
  }
);

const deleteFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { facultyId } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(facultyId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty is deleted succesfully",
      data: result,
    });
  }
);

export const FacultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
};
