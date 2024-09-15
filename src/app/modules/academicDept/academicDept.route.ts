import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidationSchema } from "./academicDept.validation";
import { AcademicDepartmentControllers } from "./academicDept.controller";

const router = express.Router();

router.post(
  "/create-academic-dept",
  // validateRequest(
  //   AcademicDepartmentValidationSchema.createAcademicDepartmentValidationSchema
  // ),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);
router.get(
  "/:deptId",
  AcademicDepartmentControllers.getSingleAcademicDepartment
);
router.patch(
  "/:deptId",
  AcademicDepartmentControllers.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
