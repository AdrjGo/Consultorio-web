import z from "zod";

export const stateSchema = z.object({
  state: z.enum(["ACTIVE", "INACTIVE"]),
});

export type StateFormValues = z.infer<typeof stateSchema>;
