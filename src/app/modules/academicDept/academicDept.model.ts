import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDept.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartment = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicDepartment.pre("save", async function (next) {
  const isDeptExist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDeptExist) {
    throw new AppError(httpStatus.NOT_FOUND, "The dept is already present");
  }
  next();
});

academicDepartment.pre("findOneAndUpdate", async function (next) {
  const query = await this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This department does not exist! "
    );
  }
  next();
});
const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartment
);
export default AcademicDepartment;
