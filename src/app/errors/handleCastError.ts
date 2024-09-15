import mongoose from "mongoose";
import { TErrorSources, TGGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err.name,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid Id ",
    errorSources,
  };
};

export default handleCastError;
