import { HttpStatusCode, SuccessApiResponse } from "@/types/api.types";
import { Request, Response } from "express";
import { authService } from "@/services/auth.service";
import { RegisterDto } from "@/dtos/auth.dto";

export const authController = {
  async register(req: Request, res: Response<SuccessApiResponse>) {
    const data = req.body as RegisterDto;
    await authService.register(data);
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
