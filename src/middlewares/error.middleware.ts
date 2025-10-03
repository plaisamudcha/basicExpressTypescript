import { ErrorApiResponse, HttpStatusCode } from "@/types/api.types";
import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response<ErrorApiResponse>,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      statusCode: HttpStatusCode.BAD_REQUEST,
      message: "Validation Error",
      detail: z.flattenError(error),
    });
  }

  if (error)
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
};

export class ErrorMiddleware {
  handler(
    error: unknown,
    req: Request,
    res: Response<ErrorApiResponse>,
    next: NextFunction
  ) {
    if (error instanceof ZodError) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: "Validation Error",
        detail: z.flattenError(error),
      });
    }

    if (error)
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      });
  }
}
