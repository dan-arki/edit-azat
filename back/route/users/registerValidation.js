import { z } from "zod";

const formValidation = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export default formValidation;
