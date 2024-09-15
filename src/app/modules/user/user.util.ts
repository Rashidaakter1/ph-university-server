// year semesterCode 4digit number
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined; //2030010001
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString();

  const lastStudentId = (await findLastStudentId()) || "";
  const lastStudentIdYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  if (
    (lastStudentId && payload.year === lastStudentIdYear) ||
    payload.code === lastStudentCode
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined; //0001
};

export const generateFacultyId = async () => {
  // first time 0000
  //0001  => 1
  let currentId = (await findLastFacultyId()) || (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;
  console.log(incrementId);

  return incrementId;
};

const findLastAdminId = async () => {
  const lastAdminId = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastAdminId ? lastAdminId.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (await findLastAdminId()) || (0).toString();
  console.log(currentId);
  let incrementId;
  incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  console.log(incrementId);
  incrementId = `A-${incrementId}`;
  console.log(incrementId);
  return incrementId;
};
