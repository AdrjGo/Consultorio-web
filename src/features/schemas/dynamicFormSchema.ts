import z from "zod";

const formHeaderSchema = z.object({
  name: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
});

export const dynamicFormSchema = z.object({
  submodId: z.string().min(1, "Debe seleccionar un Submodulo"),
  numberVersion: z.number().min(1, "Debe seleccionar una versión"),
  jsonSchema: z.record(z.string(), z.any()),
  form: formHeaderSchema,
});

export type DynamicFormValues = z.infer<typeof dynamicFormSchema>;
