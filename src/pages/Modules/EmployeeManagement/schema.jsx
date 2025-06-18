import { z } from "zod";

export const addEmployeeForm = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  salary: z.number().min(0, { message: "Salary must be a positive number" }),
  enterpriseId: z.number().min(1, { message: "Enterprise is required" }),
  status: z.enum(["active", "inactive"]).default("active"),
});

export const updateEmployeeForm = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  salary: z.number().min(0, { message: "Salary must be a positive number" }),
  enterpriseId: z.number().min(1, { message: "Enterprise is required" }),
  status: z.enum(["active", "inactive"]).default("active"),
});
