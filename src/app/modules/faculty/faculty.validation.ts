import { z } from "zod";
import { userNameValidationSchema } from "../student/student.validation";

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      name: userNameValidationSchema,
      designation: z.string(),
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicFaculty: z.string(),
      profileImg: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

export default createFacultyValidationSchema;
