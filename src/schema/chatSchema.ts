import { z } from "zod";

export const chatSchema = z.object({
  sentchat: z.string().min(0).max(300),
});
