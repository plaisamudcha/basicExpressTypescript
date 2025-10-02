import { NextFunction, Request, Response } from "express";

export const validateMiddleware =
  (schema) => (req: Request, res: Response, next: NextFunction) => {
    const data = schema.parse(req.body);
  };
