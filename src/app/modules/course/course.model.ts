import { model, Schema } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  code: { type: String, required: true },
  credits: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourse: [preRequisiteCoursesSchema],
});

export const Course = model<TCourse>("Course", courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  "CourseFaculty",
  courseFacultySchema
);
