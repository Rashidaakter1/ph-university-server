import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendRequest";
import httpStatus from "http-status";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseServices.createCourseIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic course is created successfully",
    data: course,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic course is retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.getSingleCourseFromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Academic course is retrieved successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.updateCourseIntoDb(courseId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Academic course is Updated successfully",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(
  async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    console.log(courseId, req);
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      req.body
    );
    console.log(result, courseId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Academic faculty is assigned successfully",
      data: result,
    });
  }
);
const removeFacultiesFromCourse = catchAsync(
  async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
      courseId,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty is deleted successfully",
      data: result,
    });
  }
);
const getFacultiesWithCourse = catchAsync(
  async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " Faculties retrieved succesfully",
      data: result,
    });
  }
);
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.deleteCourseFromDb(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Course is deleted successfully",
    data: result,
  });
});
export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
  deleteCourse,
  getFacultiesWithCourse,
};
