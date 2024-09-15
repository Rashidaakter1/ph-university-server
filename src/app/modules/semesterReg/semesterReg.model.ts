import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterReg.interface";
import { SemesterRegistrationStatus } from "./semesterReg.constant";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "academicSemester",
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: "upcoming",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
      default: 3,
    },
    maxCredit: {
      type: Number,
      required: true,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);

export const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
