import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidationSchema } from "./academicDept.validation";
import { AcademicDepartmentControllers } from "./academicDept.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-dept",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidationSchema.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcademicDepartmentControllers.getAllAcademicDepartments
);
router.get(
  "/:deptId",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcademicDepartmentControllers.getSingleAcademicDepartment
);
router.patch(
  "/:deptId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AcademicDepartmentControllers.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
