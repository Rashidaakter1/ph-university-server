import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controller";

const router = express.Router();

router.post(
  "/create",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidation),
  OfferedCourseControllers.createOfferedCourse
);
router.put(
  "/create",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidation),
  OfferedCourseControllers.updateOfferedCourse
);

router.get("/", OfferedCourseControllers.getOfferedCourse);
router.get("/:id", OfferedCourseControllers.getSingleOfferedCourse);
router.delete("/:id", OfferedCourseControllers.deleteOfferedCourse);

export const OfferedCourseRoutes = router;
