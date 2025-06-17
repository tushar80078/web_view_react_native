import { z } from "zod";

export const addEnterpriseForm = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  contactInfo: z.string().min(1, { message: "Contact info required" }),
});
