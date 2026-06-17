import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const parseDate = (date: string | null) => {
  if (!date) return "";
  const parsed = dayjs(date, ["DD/MM/YYYY", "YYYY-MM-DD"], true);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};
