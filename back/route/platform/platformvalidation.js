import { z } from "zod";

const platformValidation = z.object({
  id: z.number(),
});

export default platformValidation;
