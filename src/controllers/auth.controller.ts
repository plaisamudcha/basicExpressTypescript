import { HttpStatusCode, SuccessApiResponse } from "@/types/api.types";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "@/services/auth.service";
import { LoginDto, RegisterDto } from "@/dtos/auth.dto";

export class AuthController {
  constructor(private authService: AuthService) {}

  register() {
    return async (
      req: Request,
      res: Response<SuccessApiResponse>,
      next: NextFunction
    ) => {
      const data = req.body as RegisterDto;
      await this.authService.register(data);
      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: "Registered successfully",
        data: undefined,
      });
    };
  }

  login() {
    return async (
      req: Request,
      res: Response<SuccessApiResponse<{ accessToken: string }>>,
      next: NextFunction
    ) => {
      const data = req.body as LoginDto;
      await this.authService.login(data);
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Logged in successfully",
        data: { accessToken: "dummy_token" },
      });
    };
  }
}

// export const authController = {
//   async register(req: Request, res: Response<SuccessApiResponse>) {
//     const data = req.body as RegisterDto;
//     await authService.register(data);
//     res.status(HttpStatusCode.CREATED).json({
//       success: true,
//       message: "Registered successfully",
//       data: undefined,
//     });
//   },
//   async login(
//     req: Request,
//     res: Response<SuccessApiResponse<{ accessToken: string }>>
//   ) {
//     // throw new Error("test middleware error");
//     res.status(HttpStatusCode.OK).json({
//       success: true,
//       message: "Logged in successfully",
//       data: { accessToken: "dummy_token" },
//     });
//   },
// };
