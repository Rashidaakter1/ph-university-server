import express from "express";
import { StudentControllers } from "./student.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getAllStudents
);
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getSingleStudent
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.deleteStudent
);

export const StudentRoutes = router;
