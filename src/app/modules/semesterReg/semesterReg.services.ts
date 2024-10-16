import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { AcademicSemesterServices } from "../academicSemester/academicSemester.service";
import { TSemesterRegistration } from "./semesterReg.interface";
import { SemesterRegistration } from "./semesterReg.model";
import mongoose from "mongoose";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload.academicSemester;

  // if semester registration is upcoming or ongoing
  const isSemesterStatusUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or: [{ status: "upcoming" }, { status: "ongoing" }],
  });

  if (isSemesterStatusUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isSemesterStatusUpcomingOrOngoing.status} registered semester`
    );
  }
  // check if the academic semester is exists or not

  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found !"
    );
  }

  // check if the academic semester registration is already in the database

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered!"
    );
  }
  const registration = await SemesterRegistration.create(payload);
  return registration;
};
const getSemesterRegistrationFromDb = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  const meta = await semesterRegistrationQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getSingleSemesterRegistrationFromDb = async (id: string) => {
  const registration = await SemesterRegistration.findById(id);
  return registration;
};
const updateSemesterRegistrationIntoDb = async (
  id: string,
  payload: TSemesterRegistration
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester is not found");
  }

  const currentSemesterStatus = isSemesterRegistrationExists.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === "ended") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this semester is already ${currentSemesterStatus}`
    );
  }

  // UPCOMING --> ONGOING --> ENDED

  if (currentSemesterStatus === "upcoming" && requestedStatus === "ended") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }
  if (currentSemesterStatus === "ongoing" && requestedStatus === "upcoming") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  const registration = await SemesterRegistration.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  );
  return registration;
};
const deleteSemesterRegistrationIntoDb = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registration when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester is not found");
  }

  const currentSemesterStatus = isSemesterRegistrationExists.status;

  if (currentSemesterStatus === "upcoming") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not delete as the registered semester is ${currentSemesterStatus}`
    );
  }

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      }
    );

    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete semester registration !"
      );
    }
    const deletedSemisterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deletedSemisterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete semester registration !"
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return null;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDb,
  getSemesterRegistrationFromDb,
  getSingleSemesterRegistrationFromDb,
  updateSemesterRegistrationIntoDb,
  deleteSemesterRegistrationIntoDb,
};
