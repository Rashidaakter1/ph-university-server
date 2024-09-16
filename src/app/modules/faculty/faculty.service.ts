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
  const isFacultyExists = await Faculty.findById(id);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not Found");
  }
  // const result = await faculty.aggregate([{ $match: { id } }]);
  const result = await Faculty.findById(id).populate({
    path: "academicDepartment",
    populate: {
      path: "academicFaculty",
    },
  });

  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty?.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
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

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
