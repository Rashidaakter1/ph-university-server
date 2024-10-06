import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.util";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import AcademicDepartment from "../academicDept/academicDept.model";

const createStudentIntoDB = async (
  file: any,
  password: string,
  studentData: TStudent
) => {
  const isEmailExist = await Student.findOne({ email: studentData.email });
  if (isEmailExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "please use a different email address"
    );
  }
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default__password as string);

  //set student role
  userData.role = "student";
  // set email address
  userData.email = studentData.email;

  // find academic semester info
  const admissionSemester: TAcademicSemester | null =
    await AcademicSemester.findById(studentData.admissionSemester);
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }
  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    studentData.academicDepartment
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found");
  }

  studentData.academicFaculty = academicDepartment?.academicFaculty;

  // start a session
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    //set manually generated it
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );

    if (file) {
      const profileLink = file?.path;
      const imageName = `${userData.id}${studentData.name.firstName}`;
      console.log(imageName);
      console.log(file.path);
      const result = await sendImageToCloudinary(profileLink, imageName);
      studentData.profileImg = result?.uploadResult?.secure_url;
    }

    // create a user using transaction one
    const newUser = await User.create([userData], { session });

    //create a student
    if (newUser.length) {
      // set id , _id as user
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id; //reference _id

      const newStudent = await Student.create([studentData], { session });
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
      }

      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
  }
};
const createFacultyIntoDB = async (
  file: any,
  password: string,
  facultyData: TFaculty
) => {
  const isEmailExist = await Faculty.findOne({ email: facultyData?.email });
  if (isEmailExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "please use a different email address"
    );
  }
  //
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default__password as string);

  //set student role
  userData.role = "faculty";
  // set email address
  userData.email = facultyData.email;
  // start a session
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    if (file) {
      const profileLink = file?.path;
      const imageName = `${userData.id}${facultyData.name.firstName}`;

      const result = await sendImageToCloudinary(profileLink, imageName);
      facultyData.profileImg = result?.uploadResult?.secure_url;
    }
    //set manually generated it
    userData.id = await generateFacultyId();

    // create a user using transaction one
    const newUser = await User.create([userData], { session });
    console.log(userData, "from user");
    console.log(newUser, "from new");
    console.log("faculty data", facultyData);
    //create a student
    if (newUser.length) {
      // set id , _id as user
      facultyData.id = newUser[0].id;
      facultyData.user = newUser[0]._id; //reference _id

      const newFaculty = await Faculty.create([facultyData], { session });
      if (!newFaculty.length) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Failed to create Faculty fgsdfsd"
        );
      }
      await session.commitTransaction();
      await session.endSession();
      return newFaculty;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Faculty");
  }
};

const createAdminIntoDb = async (
  file: any,
  password: string,
  adminData: TAdmin
) => {
  console.log(file, password, adminData);
  const isEmailExist = await Admin.findOne({ email: adminData?.email });
  if (isEmailExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "please use a different email address"
    );
  }
  let userData: Partial<TUser> = {};
  if (password) {
    userData.password = password || config.default__password;
  }
  userData.role = "admin";
  // set email address
  userData.email = adminData.email;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    if (file) {
      const profileLink = file?.path;
      const imageName = `${userData.id}${adminData.name.firstName}`;

      const result = await sendImageToCloudinary(profileLink, imageName);
      adminData.profileImg = result?.uploadResult?.secure_url;
    }

    userData.id = await generateAdminId();
    const newUser = await User.create([userData], { session });

    console.log(newUser);
    // create admin
    if (newUser.length) {
      adminData.id = newUser[0].id;
      adminData.user = newUser[0]?._id;
      const newAdmin = await Admin.create([adminData], { session });
      console.log("newAdmin", newAdmin);
      if (!newAdmin.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
      }

      await session.commitTransaction();
      await session.endSession();
      return newAdmin;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === "admin") {
    result = await Admin.findOne({ id: userId });
  }
  if (role === "faculty") {
    result = await Faculty.findOne({ id: userId });
  }
  if (role === "student") {
    result = await Student.findOne({ id: userId });
  }
  return result;
};

const changeStatus = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      payload,
    },
    {
      new: true,
    }
  );
  return result;
};
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDb,
  getMe,
  changeStatus,
};
