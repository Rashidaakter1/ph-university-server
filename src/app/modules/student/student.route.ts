import express from "express";
import { StudentControllers } from "./student.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/:studentId", StudentControllers.getSingleStudent);

router.delete("/:studentId", StudentControllers.deleteStudent);

router.get("/", auth(USER_ROLE.admin), StudentControllers.getAllStudents);

export const StudentRoutes = router;
