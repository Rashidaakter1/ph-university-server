import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);
router.get("/", AcademicSemesterControllers.getAcademicSemester);
router.get("/:semesterId", AcademicSemesterControllers.getAcademicSemesterWithId);
router.patch("/:semesterId", AcademicSemesterControllers.updateAcademicSemesterWithId);

export const AcademicSemesterRoutes = router;
