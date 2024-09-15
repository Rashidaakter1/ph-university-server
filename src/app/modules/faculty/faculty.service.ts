import mongoose from "mongoose";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { Faculty } from "./faculty.model";
import { searchableArray } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find(), query)
    .search(searchableArray)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  // const result = await faculty.aggregate([{ $match: { id } }]);
  const result = await Faculty.findOne({ id });
  // .populate("admissionSemester")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // });

  return result;
};

const updateFacultyIntoDb = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingData } = payload;

  let modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
  }
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDb,
  deleteFacultyFromDB,
};
