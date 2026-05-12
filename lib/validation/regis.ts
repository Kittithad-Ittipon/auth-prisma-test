import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .trim(),
});
