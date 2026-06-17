import type { FieldError, FieldErrors } from "react-hook-form";

export function getError(errors: FieldErrors, path: string): FieldError {
  return path.split(".").reduce((acc, key) => acc?.[key], errors as any);
}
