import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDept.service";
import sendResponse from "../../utils/sendRequest";
import httpStatus from "http-status";

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const department =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic department is created successfully",
      data: department,
    });
  }
);

const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentServices.getAcademicDepartmentFromDB(
      req.query
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic department is retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
);

const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const deptId = req.params.deptId;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
        deptId
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Academic Department is retrieved successfully",
      data: result,
    });
  }
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const deptId = req.params.deptId;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(
        deptId,
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Academic Department is Updated successfully",
      data: result,
    });
  }
);

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
