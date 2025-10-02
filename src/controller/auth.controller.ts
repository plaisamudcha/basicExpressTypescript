import {
  ErrorApiResponse,
  HttpStatusCode,
  SuccessApiResponse,
} from "@/types/api.types";
import { registerSchema } from "@/validator/auth.validator";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "@/db/prisma";
import { authService } from "@/services/auth.service";

export const authController = {
  async register(req: Request, res: Response<SuccessApiResponse>) {
    await authService.register(req.body);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Registered successfully",
      data: undefined,
    });
  },
  async login(
    req: Request,
    res: Response<SuccessApiResponse<{ accessToken: string }>>
  ) {
    // throw new Error("test middleware error");
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Logged in successfully",
      data: { accessToken: "dummy_token" },
    });
  },
};
