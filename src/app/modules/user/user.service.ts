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

const createStudentIntoDB = async (
  file: any,
  password: string,
  studentData: TStudent
) => {
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

  // start a session
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    //set manually generated it
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester
    );
    const profileLink = file?.path;
    const imageName = `${userData.id}${studentData.name.firstName}`;
    let profileImage;
    sendImageToCloudinary(profileLink, imageName)
      .then((result) => {
        profileImage = result?.uploadResult.secure_url;
        console.log(profileImage);     
      })
      .catch((error) => {
        console.error("Error during upload:", error);
      });

    // create a user using transaction one
    const newUser = await User.create([userData], { session });

    //create a student
    if (newUser.length) {
      // set id , _id as user
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id; //reference _id
      // studentData.profileImg = profileImage ;

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
const createFacultyIntoDB = async (password: string, facultyData: TFaculty) => {
 
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

    //set manually generated it
    userData.id = await generateFacultyId();

    // create a user using transaction one
    const newUser = await User.create([userData], { session });

    //create a student
    if (newUser.length) {
      // set id , _id as user
      facultyData.id = newUser[0].id;
      facultyData.user = newUser[0]._id; //reference _id

      console.log("faculty data", facultyData);

      const newFaculty = await Faculty.create([facultyData], { session });
      if (!newFaculty.length) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Faculty");
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

const createAdminIntoDb = async (password: string, adminData: TAdmin) => {
  let user: Partial<TUser> = {};
  if (password) {
    user.password = password || config.default__password;
  }
  user.role = "admin";
  // set email address
  user.email = adminData.email;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    user.id = await generateAdminId();
    const newUser = await User.create([user], { session });

    // create admin
    if (newUser.length) {
      adminData.id = newUser[0].id;
      adminData._id = newUser[0]?._id;
      const newAdmin = await Admin.create(adminData);
      if (!newAdmin) {
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
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDb,
  getMe,
};
