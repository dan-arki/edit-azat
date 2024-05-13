import { z } from "zod";

const SearchValidation = z.object({
  title: z.string(),
});

export default SearchValidation;
