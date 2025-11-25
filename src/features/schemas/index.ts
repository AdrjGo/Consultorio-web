import { personSchema } from "./personSchema";
import {
  appointmentSchema,
  type AppointmentFormValues,
} from "./appointmentSchema";
import { patientSchema, type PatientFormValues } from "./patientSchema";
import { userSchema, type UserFormValues } from "./userSchema";
import { userRoleSchema, type UserRoleFormValues } from "./userRoleSchema";
import {
  dentalOfficeSchema,
  type DentalOfficeFormValues,
} from "./dentalOfficeSchema";
import { stateSchema, type StateFormValues } from "./stateSchema";
import {
  rolePermissionsSchema,
  type RolePermissionsFormValues,
} from "./permissionsSchema";
import { roleSchema, type RoleFormValues } from "./roleSchema";
import {
  roleWithPermissionsSchema,
  type RoleWithPermissionsFormValues,
} from "./roleWithPermissionsSchema";

export { userRoleSchema, type UserRoleFormValues };
export { appointmentSchema, patientSchema, personSchema };
export type { AppointmentFormValues, PatientFormValues };
export { userSchema, type UserFormValues };
export { dentalOfficeSchema, type DentalOfficeFormValues };
export { stateSchema, type StateFormValues };
export { rolePermissionsSchema, type RolePermissionsFormValues };
export { roleSchema, type RoleFormValues };
export { roleWithPermissionsSchema, type RoleWithPermissionsFormValues };
