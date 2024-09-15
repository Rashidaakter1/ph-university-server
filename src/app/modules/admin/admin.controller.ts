import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AdminServices } from "./admin.service";
import sendResponse from "../../utils/sendRequest";
import httpStatus from "http-status";

const getAllAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await AdminServices.getAdminFromDb(query);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Admin is retrived successfully",
      data: result,
    });
  }
);

 export const AdminControllers = {
  getAllAdmin,
};
