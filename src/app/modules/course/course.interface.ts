import { Types } from "mongoose";

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: string;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourse: [TPreRequisiteCourses];
};

export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
