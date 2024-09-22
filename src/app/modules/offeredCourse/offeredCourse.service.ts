import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterReg/semesterReg.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import AcademicDepartment from "../academicDept/academicDept.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourse.utlis";
import { Student } from "../student/student.model";

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */

  const {
    semesterRegistration,

    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  //check if the semester registration id is exists!
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No semester registration found"
    );
  }
  const academicSemester = isSemesterRegistrationExists.academicSemester;
  //check if the academic faculty id is exists!
  const isAcademicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "There is no academic Semester is found"
    );
  }

  const isAcademicDepartmentExits = await AcademicDepartment.findById(
    academicDepartment
  );

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found !");
  }

  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found !");
  }

  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExists.name}`
    );
  }

  // check if the same offered course same section im same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({ semesterRegistration, course, section });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getOfferedCourseFromDb = async (query: Record<string, unknown>) => {
  const result = await OfferedCourse.find();
  return result;
};
const getSingleOfferedCourseFromDb = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  if (!result) {
    throw new AppError(404, "Offered Course not found");
  }
  return result;
};

const updateOfferedCourseIntoDb = async (
  id: string,
  payload: Partial<TOfferedCourse>
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This course is not found");
  }

  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (semesterRegistrationStatus?.status !== "upcoming") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ` You can not update this offered course as it is ${semesterRegistrationStatus?.status}`
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteOfferedCourseFromDb = async (id: string) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the semester registration status is upcoming
   * Step 3: delete the offered course
   */

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This course is not found");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (semesterRegistrationStatus?.status !== "upcoming") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ` You can not update this offered course as it is ${semesterRegistrationStatus?.status}`
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

const getMyOfferedCoursesFromDB = async (
  id: string,
  query: Record<string, unknown>
) => {
  // find the student
  const student = await Student.findOne({ id: id });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  // find the current ongoing semester
  const currentOngoingRegistrationSemester = await SemesterRegistration.findOne(
    { status: "ongoing" }
  );
  if (!currentOngoingRegistrationSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "There is no ongoing semester registration!"
    );
  }

  const aggregateQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester._id,
        academicDepartment: student.academicDepartment,
        academicFaculty: student.academicFaculty,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
  ];
  const result = await OfferedCourse.aggregate([...aggregateQuery]);
  return result;
};
export const OfferedCourseServices = {
  createOfferedCourseIntoDb,
  getOfferedCourseFromDb,
  getSingleOfferedCourseFromDb,
  updateOfferedCourseIntoDb,
  deleteOfferedCourseFromDb,
  getMyOfferedCoursesFromDB,
};
