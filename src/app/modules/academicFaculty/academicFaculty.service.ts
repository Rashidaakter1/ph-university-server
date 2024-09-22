import QueryBuilder from "../../builder/QueryBuilder";
import { academicFacultySearchableFields } from "./academicFaculty.constant";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  // if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
  //   throw new Error("Invalid Semester code");
  // }
  const result = await AcademicFaculty.create(payload);
  console.log(result);
  return result;
};

const getAcademicFacultyFromDb = async (query: Record<string, unknown>) => {
  const academicQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(academicFacultySearchableFields)
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

const getAcademicFacultyWithIdFromDb = async (id: string) => {
  const result = await AcademicFaculty.findById({ _id: id });
  return result;
};

const updateAcademicFacultyWithIdFromDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAcademicFacultyFromDb,
  getAcademicFacultyWithIdFromDb,
  updateAcademicFacultyWithIdFromDb,
};
