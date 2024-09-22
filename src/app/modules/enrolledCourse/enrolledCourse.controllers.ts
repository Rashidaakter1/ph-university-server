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
const getEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await EnrolledCourseService.getEnrolledCourseFromDb();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Enrolled Course are successfully retrieved",
    data: course,
  });
});
const getMyEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.user.userId;
  const course = await EnrolledCourseService.getMyEnrolledCourseFromDb(
    studentId,
    req.query
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "My Enrolled Course are successfully retrieved",
    meta: course.meta,
    data: course.result,
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
  getEnrolledCourse,
  getMyEnrolledCourse,
};
