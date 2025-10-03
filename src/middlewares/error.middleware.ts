import {
  BaseException,
  ValidationException,
} from "@/exceptions/base.exception";
import { ErrorApiResponse, HttpStatusCode } from "@/types/api.types";
import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

// export const errorMiddleware = (
//   error: unknown,
//   req: Request,
//   res: Response<ErrorApiResponse>,
//   next: NextFunction
// ) => {
//   if (error instanceof ZodError) {
//     res.status(HttpStatusCode.BAD_REQUEST).json({
//       success: false,
//       statusCode: HttpStatusCode.BAD_REQUEST,
//       message: "Validation Error",
//       detail: z.flattenError(error),
//     });
//   }

//   if (error)
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//       success: false,
//       message: error instanceof Error ? error.message : "Internal Server Error",
//       statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
//     });
// };

export class ErrorMiddleware {
  handlerBaseException(
    error: unknown,
    req: Request,
    res: Response<ErrorApiResponse>,
    next: NextFunction
  ) {
    if (error instanceof BaseException) {
      res.status(error.statusCode).json(error);
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  handlerGlobalError(
    error: unknown,
    req: Request,
    res: Response<ErrorApiResponse>,
    next: NextFunction
  ) {
    if (error instanceof ZodError) {
      throw new ValidationException("Validation failed", z.flattenError(error));
    }
    next(error);
  }
}
