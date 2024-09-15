import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createAdminValidationSchema } from "./admin.valodation";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get(
  "/",
  // validateRequest(createAdminValidationSchema),
  AdminControllers.getAllAdmin
);

export const AdminRoutes = router;
