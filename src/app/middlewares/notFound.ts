import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API is not found or invalid",
    data: null,
  });
};

export default notFound;
