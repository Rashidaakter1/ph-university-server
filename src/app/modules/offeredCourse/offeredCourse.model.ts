import mongoose, { model, Schema } from "mongoose";
import { TDays, TOfferedCourse } from "./offeredCourse.interface";

export const Days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SemesterRegistration",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDepartment",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    maxCapacity: {
      type: Number,
      required: true,
      default: 30,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: Days,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OfferedCourse = mongoose.model<TOfferedCourse>(
  "OfferedCourse",
  offeredCourseSchema
);
