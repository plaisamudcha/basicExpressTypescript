import { registerSchema } from "@/validator/auth.validator";
import z from "zod";

export type RegisterDto = z.infer<typeof registerSchema>;
