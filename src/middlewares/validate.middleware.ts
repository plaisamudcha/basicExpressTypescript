import { LoginDto, RegisterDto } from "@/dtos/auth.dto";
import { loginSchema, registerSchema } from "@/validators/auth.validator";
import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validateMiddleware =
  <T>(schema: ZodType<T>) =>
  (req: Request, _: Response, next: NextFunction) => {
    const data = schema.parse(req.body);
    req.body = data;
    next();
  };

export const validateRegister = validateMiddleware<RegisterDto>(registerSchema);
export const validateLogin = validateMiddleware<LoginDto>(loginSchema);

class BaseValidator {
  validate<T>(schema: ZodType<T>) {
    return (req: Request, _: Response, next: NextFunction) => {
      const data = schema.parse(req.body);
      req.body = data;
      next();
    };
  }
}

export class RegisterValidator extends BaseValidator {
  handler() {
    return this.validate(registerSchema);
  }
}

export class LoginValidator extends BaseValidator {
  handler() {
    return this.validate(loginSchema);
  }
}
