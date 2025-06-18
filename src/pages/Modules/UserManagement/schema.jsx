import { z } from "zod";

export const addUserForm = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .optional(),
  roleId: z.number().min(1, { message: "Role is required" }),
  enterpriseId: z.number().min(1, { message: "Enterprise is required" }),
  status: z.enum(["active", "inactive"]).default("active"),
});

export const updateUserForm = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  roleId: z.number().min(1, { message: "Role is required" }),
  enterpriseId: z.number().min(1, { message: "Enterprise is required" }),
  status: z.enum(["active", "inactive"]).default("active"),
});
