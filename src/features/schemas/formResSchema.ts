import z from "zod";

export const formResSchema = z.object({
  formVersionId: z.string().min(1, "El formulario es obligatorio"),
  patientId: z.string().min(1, "El paciente es obligatorio"),
  jsonResponse: z.object().optional(),
});

export type FormResValues = z.infer<typeof formResSchema>;
