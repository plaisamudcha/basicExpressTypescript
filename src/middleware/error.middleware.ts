import { ErrorApiResponse, HttpStatusCode } from "@/types/api.types";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response<ErrorApiResponse>,
  next: NextFunction
) => {
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error instanceof Error ? error.message : "Internal Server Error",
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  });
};
