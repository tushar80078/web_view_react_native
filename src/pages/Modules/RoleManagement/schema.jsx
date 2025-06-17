import * as z from "zod";

export const roleFormSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().optional(),
  permissions: z
    .array(
      z.object({
        module: z.string(),
        can_read: z.boolean(),
        can_create: z.boolean(),
        can_update: z.boolean(),
        can_delete: z.boolean(),
      })
    )
    .optional(),
});
