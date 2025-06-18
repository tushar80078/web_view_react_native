import { z } from "zod";

export const addProductForm = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  sku: z.string().optional(),
  price: z
    .number()
    .min(0, { message: "Price must be a positive number" })
    .optional(),
  category: z.string().optional(),
  enterpriseId: z.number().min(1, { message: "Enterprise is required" }),
  employeeId: z.number().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export const updateProductForm = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  sku: z.string().optional(),
  price: z
    .number()
    .min(0, { message: "Price must be a positive number" })
    .optional(),
  category: z.string().optional(),
  enterpriseId: z.number().min(1, { message: "Enterprise is required" }),
  employeeId: z.number().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});
