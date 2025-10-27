import type { PersonType } from "types/PersonType";
import type { RoleType } from "types/RoleType";

export type UserType = {
  id: string;
  person: PersonType;
  roles: RoleType[];
};
