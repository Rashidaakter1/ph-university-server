import { Types } from "mongoose";
import { TUserName } from "../student/student.interface";

export type TAdmin = {
  _id: any;
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  managementDepartment: string;
  isDeleted: boolean;
};
