import { loginSchema, registerSchema } from "@/validators/auth.validator";
import z from "zod";

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
