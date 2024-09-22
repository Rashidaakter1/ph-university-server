import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EnrolledCourseValidation } from "./enrolledCourse.validation";
import { EnrolledCourseController } from "./enrolledCourse.controllers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth(USER_ROLE.student),
  validateRequest(EnrolledCourseValidation.createEnrolledCourseValidation),
  EnrolledCourseController.createEnrolledCourse
);
router.patch(
  "/update-enrolled-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(EnrolledCourseValidation.updateEnrolledCourseValidation),
  EnrolledCourseController.updateEnrolledCourse
);

export const EnrolledCourseRoutes = router;
