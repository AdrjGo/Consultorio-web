import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const calculateAge = (birthDate: string | undefined) => {
  if (!birthDate) return null;

  const birth = dayjs(birthDate, "DD/MM/YYYY");
  if (!birth.isValid()) return null;

  return dayjs().diff(birth, "year");
};
