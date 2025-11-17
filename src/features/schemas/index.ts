import { personSchema } from "./personSchema";
import {
  appointmentSchema,
  type AppointmentFormValues,
} from "./appointmentSchema";
import { patientSchema, type PatientFormValues } from "./patientSchema";
import { userSchema, type UserFormValues } from "./userSchema";
import { roleSchema, type RoleFormValues } from "./roleSchema";

export { roleSchema, type RoleFormValues };
export { appointmentSchema, patientSchema, personSchema };
export type { AppointmentFormValues, PatientFormValues };
export { userSchema, type UserFormValues };
