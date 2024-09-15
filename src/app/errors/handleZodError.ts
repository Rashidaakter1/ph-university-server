import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "validation error",
    errorSources: errorSources,
  };
};

export default handleZodError;
