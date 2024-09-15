import { Types } from "mongoose";
import { TUserName } from "../student/student.interface";

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  designation: string;
  gender: "male" | "female" | "other";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
};

//for creating static

// export interface StudentModel extends Model<TFaculty> {
//   isUserExists(id: string): Promise<TFaculty | null>;
// }

// for creating instance

// export interface StudentMethods {
//   isUserExists(id: string): Promise<TFaculty | null>;
// }

// export type StudentModel = Model<
//   TFaculty,
//   Record<string, never>,
//   StudentMethods
// >;
