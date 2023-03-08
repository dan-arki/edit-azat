import { z } from "zod";

const RegisterValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default RegisterValidator;
