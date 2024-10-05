import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { upload } from "../../utils/sendImageToCloudinary";
import { UserValidation } from "./user.validation";
import { createStudentValidationSchema } from "../student/student.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { AdminValidations } from "../admin/admin.valodation";

const router = express.Router();

router.post(
  "/create-student",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);

router.post(
  "/change-status/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus
);
router.get(
  "/me",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty
  ),

  UserControllers.getMe
);

export const UserRoutes = router;
