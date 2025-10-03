import { authController } from "@/controllers/auth.controller";
import {
  validateLogin,
  validateRegister,
} from "@/middlewares/validate.middleware";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", validateRegister, authController.register);
authRouter.post("/login", validateLogin, authController.login);

export { authRouter };
