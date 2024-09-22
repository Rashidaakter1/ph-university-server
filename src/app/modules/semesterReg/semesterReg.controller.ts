import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRequest";
import { SemesterRegistrationService } from "./semesterReg.services";
import { Request, Response } from "express";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const registration =
      await SemesterRegistrationService.createSemesterRegistrationIntoDb(
        req.body
      );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Semester Registration is created successfully",
      data: registration,
    });
  }
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getSemesterRegistrationFromDb(
        req.query
      );
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Semester Registration is retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationFromDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is retrieved successfully",
      data: result,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDb(
        id,
        req.body
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is updated successfully",
      data: result,
    });
  }
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.deleteSemesterRegistrationIntoDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is updated successfully",
      data: result,
    });
  }
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
