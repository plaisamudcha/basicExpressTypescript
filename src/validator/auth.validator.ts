import z from "zod";

export const registerSchema = z
  .object({
    email: z.email().trim(),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Minimum six characters, at least one letter and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword)
  .transform((value) => ({
    email: value.email,
    password: value.password,
  }));
