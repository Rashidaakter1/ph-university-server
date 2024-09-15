import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendRequest";

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester is created successfully",
      data: result,
    });
  }
);

const getAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterServices.getAcademicSemesterFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is retrieved",
    data: result,
  });
});

const getAcademicSemesterWithId = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.getAcademicSemesterWithIdFromDb(
        req.params.semesterId
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester is retrieved by Identity",
      data: result,
    });
  }
);

const updateAcademicSemesterWithId = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.updateAcademicSemesterWithIdFromDb(
        req.params.semesterId,
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester is pathched by Identity",
      data: result,
    });
  }
);

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemester,
  getAcademicSemesterWithId,
  updateAcademicSemesterWithId,
};
