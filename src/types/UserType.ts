import type { PersonType } from "types/PersonType";
import type { RoleType } from "types/RoleType";

export type UserType = {
  id: string;
  person: PersonType;
  roles: RoleType[];
  state: string;
  cretedAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};
