import QueryBuilder from "../../builder/QueryBuilder";
import {
  academicSemesterNameCodeMapper,
  academicSemesterSearchableFields,
} from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterFromDb = async (query: Record<string, unknown>) => {
  const academicQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(academicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicQuery.modelQuery;
  const meta = await academicQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getAcademicSemesterWithIdFromDb = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  return result;
};

const updateAcademicSemesterWithIdFromDb = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAcademicSemesterFromDb,
  getAcademicSemesterWithIdFromDb,
  updateAcademicSemesterWithIdFromDb,
};
