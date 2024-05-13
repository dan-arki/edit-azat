import { z } from "zod";

const formValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default formValidation;
