import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  designation: {
    type: String,
    required: true,
  },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String, required: true },
  managementDepartment: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Admin = model<TAdmin>("Admin", adminSchema);
