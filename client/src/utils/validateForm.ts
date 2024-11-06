import { toast } from "sonner";
import { z } from "zod";

export default function validateForm(
  formValues: any,
  formSchema: z.ZodTypeAny,
) {
  const formValidation = formSchema.safeParse(formValues);
  if (!formValidation.success) {
    formValidation.error.errors
      .slice()
      .reverse()
      .forEach((error: z.CustomErrorParams) => {
        toast.error(`${error.path}: ${error.message}`);
      });
    return;
  }
}
