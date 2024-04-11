import { z } from "zod";

export const bookSchema = z.object({
  name: z.string().min(1),
});
