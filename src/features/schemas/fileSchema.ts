import z from "zod";

export const fileSchema = z.object({
  monitoringId: z.string().min(1, "Debe seleccionar un seguimiento"),
  // format: z.string().min(1, "Debe seleccionar un formato").optional(),
  // externalReference: z
  //   .string()
  //   .min(1, "La referencia externa no puede estar vacía")
  //   .optional(),
  description: z.string().min(1, "Debe seleccionar un formato").max(35),
  file: z
    .any()
    .refine((files) => files?.length === 1, "Debe seleccionar una imagen")
    .optional(),
});

export type FileFormValues = z.infer<typeof fileSchema>;
