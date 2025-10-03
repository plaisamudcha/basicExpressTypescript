import z from "zod";

export const registerSchema = z
  .object({
    email: z.email("Invalid email address").trim(),
    password: z
      .string("Password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Minimum six characters, at least one letter and one number"
      ),
    confirmPassword: z.string("Confirm password is required"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .transform((value) => ({
    email: value.email,
    password: value.password,
  }));

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim(),
  password: z.string("Password is required"),
});
