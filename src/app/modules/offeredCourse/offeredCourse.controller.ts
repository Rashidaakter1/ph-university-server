import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendRequest";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body, "from controller");
  const course = await OfferedCourseServices.createOfferedCourseIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Offered Course is successfully created",
    data: course,
  });
});
const getOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await OfferedCourseServices.getOfferedCourseFromDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Offered Courses are successfully retrieved",
    data: course,
  });
});
const getSingleOfferedCourse = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await OfferedCourseServices.getSingleOfferedCourseFromDb(id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Single Offered Course is successfully retrieved",
      data: course,
    });
  }
);
const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await OfferedCourseServices.updateOfferedCourseIntoDb(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Offered Course is successfully updated",
    data: course,
  });
});
const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await OfferedCourseServices.deleteOfferedCourseFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Offered Course is successfully deleted",
    data: course,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
