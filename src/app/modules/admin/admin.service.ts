import QueryBuilder from "../../builder/QueryBuilder";
import { searchableArray } from "../student/student.constant";
import { Admin } from "./admin.model";

const getAdminFromDb = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(searchableArray)
    .filter()
    .sort()
    .paginate()
    .fields();
  const admin = await adminQuery.modelQuery;
  return admin;
};

export const AdminServices = {
  getAdminFromDb,
};
