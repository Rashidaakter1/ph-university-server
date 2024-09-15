import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EnrolledCourseValidation } from "./enrolledCourse.validation";
import { EnrolledCourseController } from "./enrolledCourse.controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth("student"),
  validateRequest(EnrolledCourseValidation.createEnrolledCourseValidation),
  EnrolledCourseController.createEnrolledCourse
);
router.patch(
  "/update-enrolled-course",
  auth("faculty"),
  validateRequest(EnrolledCourseValidation.updateEnrolledCourseValidation),
  EnrolledCourseController.updateEnrolledCourse
);

export const EnrolledCourseRoutes = router;
