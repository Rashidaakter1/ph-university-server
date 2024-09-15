import { z } from "zod";
import { userNameValidationSchema } from "../student/student.validation";

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      name: userNameValidationSchema,
      user: z.string(),
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      managementDepartment: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string(),
 
    }),
  }),
});
