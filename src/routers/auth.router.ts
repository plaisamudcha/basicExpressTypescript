import { AuthController } from "@/controllers/auth.controller";
import { RegisterValidator } from "@/middlewares/validate.middleware";
import express, { Router } from "express";

// const authRouter = Router();

// authRouter.post("/register", validateRegister, authController.register);
// authRouter.post("/login", validateLogin, authController.login);

// export { authRouter };

export class AuthRouter {
  router: Router;

  constructor(
    private registerValidator: RegisterValidator,
    private authController: AuthController
  ) {
    this.router = express.Router();
    this.router.post(
      "/register",
      this.registerValidator.handler(),
      this.authController.register()
    );
    this.router.post("/login", this.authController.login());
  }
}
