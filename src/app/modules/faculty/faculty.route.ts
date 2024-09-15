import express from "express";
import { FacultyControllers } from "./faculty.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/:facultyId", FacultyControllers.getSingleFaculty);

router.delete("/:facultyId", FacultyControllers.deleteFaculty);

router.get("/", auth(USER_ROLE.admin,USER_ROLE.faculty), FacultyControllers.getAllFaculty);

export const FacultyRoutes = router;
