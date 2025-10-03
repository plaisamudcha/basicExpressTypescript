import { ErrorApiResponse, HttpStatusCode } from "@/types/api.types";
import { Request, Response } from "express";

export const notFoundMiddleware = (
  req: Request,
  res: Response<ErrorApiResponse>
) => {
  res.status(HttpStatusCode.NOT_FOUND).json({
    success: false,
    statusCode: HttpStatusCode.NOT_FOUND,
    code: "NOT_FOUND",
    message: "Resource not found",
  });
};

export class NotFoundMiddleware {
  handler(req: Request, res: Response<ErrorApiResponse>) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      success: false,
      message: "Resource not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      code: "NOT_FOUND",
    });
  }
}
