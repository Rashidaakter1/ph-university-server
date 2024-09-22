import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { Student } from "../student/student.model";
import { EnrolledCourse } from "./enrolledCourse.model";
import mongoose from "mongoose";
import { SemesterRegistration } from "../semesterReg/semesterReg.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { calculateGradeAndPoints } from "./enrolledCourse.utils";
import QueryBuilder from "../../builder/QueryBuilder";

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  /**
   * Step1: Check if the offered cousres is exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits exceed
   * Step4: Create an enrolled course
   */

  //Step1: Check if the offered cousres is exists
  const { offeredCourse } = payload;
  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course is not found");
  }

  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, "Room is full !");
  }

  //Step2: Check if the student is already enrolled
  const student = await Student.findOne({ id: userId }).select("_id");
  const IsEnrolledCourseIsALreadyExists = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExist?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });
  if (IsEnrolledCourseIsALreadyExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Student is already enrolled");
  }

  //Step3: Check if the max credits exceed

  /*logic will be
   *total course credits + new course credits > max credits
   */

  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration
  );
  const maxCredits = semesterRegistration?.maxCredit;

  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: student?._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourseData",
      },
    },
    {
      $unwind: "$enrolledCourseData",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);
  console.log(enrolledCourses);
  const course = await Course.findById(isOfferedCourseExist.course);
  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;
  if (
    totalCredits &&
    maxCredits &&
    totalCredits + course?.credits > maxCredits
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have exceeded maximum number of credits !"
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //Step4: Create an enrolled course
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist.semesterRegistration,
          academicSemester: isOfferedCourseExist.academicSemester,
          academicFaculty: isOfferedCourseExist.academicFaculty,
          academicDepartment: isOfferedCourseExist.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExist.course,
          student: student,
          faculty: isOfferedCourseExist.faculty,
          isEnrolled: true,
        },
      ],
      { session }
    );
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to enroll in this course !"
      );
    }
    // Also validate if a student has enrolled one course then the maxCapacity of offered course will be reduce by 1

    const maxCapacity = isOfferedCourseExist.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  /**
   * Step1: Check if the payload validations is exists and the faculty is belong to the course
   * Step2: Step2: Modify the courseMarks
   * Step3: update an enrolled course
   */

  //Step1: Check if the payload validations is exists
  const { offeredCourse, semesterRegistration, course, student, courseMarks } =
    payload;

  const isSemesterRegistrationExist = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester registration is not found"
    );
  }
  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course is not found");
  }
  const isStudentExists = await Student.findById(student);

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found !");
  }
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found !");
  }

  const faculty = await Faculty.findOne({ id: userId }).select("_id");
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden! !");
  }
  console.log(isCourseBelongToFaculty);
  //Step2: Modify the courseMarks
  const modifiedData: Record<string, unknown> = { ...courseMarks };
  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1) +
      Math.ceil(midTerm) +
      Math.ceil(classTest2) +
      Math.ceil(finalTerm);
    const result = calculateGradeAndPoints(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoints = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (courseMarks && Object.keys(courseMarks).length > 0) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
    }
  );
  return result;
};

const getEnrolledCourseFromDb = async () => {
  const result = await EnrolledCourse.find();
  return result;
};
const getMyEnrolledCourseFromDb = async (
  studentId: string,
  query: Record<string, unknown>
) => {
  const student = await Student.findOne({ id: studentId });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }
  const enrollerCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: student._id }).populate(
      "semesterRegistration   academicFaculty academicDepartment  offeredCourse course student faculty"
    ),
    query
  );
  const result = await enrollerCourseQuery.modelQuery;
   const meta = await enrollerCourseQuery.countTotal();

   return {
     meta,
     result,
   };

};
export const EnrolledCourseService = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseIntoDB,
  getEnrolledCourseFromDb,
  getMyEnrolledCourseFromDb,
};
