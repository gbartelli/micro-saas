import { z } from "zod";

export const ThemeFormSchema = z.object({
  theme: z.string(),
});
