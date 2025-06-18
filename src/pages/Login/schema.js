import { z } from "zod";

// Username validation
const usernameValidation = z
  .string()
  .min(1, "Username required")
  .min(3, "Username must be at least 3 characters");

// Password validation
const passwordValidation = z.string().min(1, "Password required");

// Login schema
export const LoginSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
});
