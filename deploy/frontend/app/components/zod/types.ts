import { z } from "zod";

const passwordValidation =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

export const PasswordLoginSchema = z.object({
  email: z.string().email({
    message: "Email is not valid",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(3, { message: "First name is required" }),
  lastName: z.string().min(3, { message: "Last name is required" }),
  email: z.string().email({
    message: "Email is not valid",
  }),
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .regex(passwordValidation, {
      message:
        "Password must be at least 6 characters long, to contain one capital, one lowercase letter, one number and one special character",
    }),
});
