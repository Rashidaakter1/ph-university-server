import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidations } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);
router.get("/", AcademicFacultyControllers.getAcademicFaculty);
router.get("/:facultyId", AcademicFacultyControllers.getAcademicFacultyWithId);
router.patch(
  "/:facultyId",
  AcademicFacultyControllers.updateAcademicFacultyWithId
);

export const AcademicFacultyRoutes = router;
