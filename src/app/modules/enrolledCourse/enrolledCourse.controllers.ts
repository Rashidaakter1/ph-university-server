import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRequest";
import { EnrolledCourseService } from "./enrolledCourse.services";

const createEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);

  const { userId } = req.user;
  const course = await EnrolledCourseService.createEnrolledCourseIntoDB(
    userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Enrolled Course is successfully created",
    data: course,
  });
});
const updateEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);

  const { userId } = req.user;
  const result = await EnrolledCourseService.updateEnrolledCourseIntoDB(
    userId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Enrolled Course is successfully updated",
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourse,
};
