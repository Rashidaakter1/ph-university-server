import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseControllers } from "./course.controller";
import { courseValidations } from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(courseValidations.createCourseValidation),
  CourseControllers.createCourse
);
router.put(
  "/:courseId/assign-faculties",
   validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

router.get("/", CourseControllers.getAllCourses);
router.get("/:courseId", CourseControllers.getSingleCourse);
router.patch("/:courseId", CourseControllers.updateCourse);

export const CourseRoutes = router;
