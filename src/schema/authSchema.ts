import { string, z } from "zod";

export const authSchema = z.object({
  email: string().email(),
  name: string().optional(),
});
