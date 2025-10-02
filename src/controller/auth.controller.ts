import { HttpStatusCode, SuccessApiResponse } from "@/types/api.types";
import { Request, Response } from "express";

export const authController = {
  register: (req: Request, res: Response<SuccessApiResponse>) => {
    res
      .status(HttpStatusCode.CREATED)
      .json({ success: true, message: "Registered successfully", data: {} });
  },
  login: (
    req: Request,
    res: Response<SuccessApiResponse<{ accessToken: string }>>
  ) => {
    // throw new Error("test middleware error");
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Logged in successfully",
      data: { accessToken: "dummy_token" },
    });
  },
};
