import QueryBuilder from "../../builder/QueryBuilder";
import { academicDeptSearchableFields } from "./academicDept.constant";
import { TAcademicDepartment } from "./academicDept.interface";
import AcademicDepartment from "./academicDept.model";

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAcademicDepartmentFromDB = async (query: Record<string, unknown>) => {
  const academicQuery = new QueryBuilder(
    AcademicDepartment.find().populate("academicFaculty"),
    query
  )
    .search(academicDeptSearchableFields)
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

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    "academicFaculty"
  );
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDb,
};
