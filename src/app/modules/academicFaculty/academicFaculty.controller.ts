import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import httpStatus from "http-status";
import sendResponse from "../../utils/sendRequest";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(
      req.body
    );
    console.log(result);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty is created successfully",
      data: result,
    });
  }
);

const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyServices.getAcademicFacultyFromDb(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty is retrieved",
    meta: result.meta,
    data: result.result,
  });
});

const getAcademicFacultyWithId = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.getAcademicFacultyWithIdFromDb(
      req.params.facultyId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty is retrieved by Identity",
      data: result,
    });
  }
);

const updateAcademicFacultyWithId = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicFacultyServices.updateAcademicFacultyWithIdFromDb(
        req.params.facultyId,
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty is pathched by Identity",
      data: result,
    });
  }
);

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculty,
  getAcademicFacultyWithId,
  updateAcademicFacultyWithId,
};
