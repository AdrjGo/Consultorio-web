import { useGet } from "@hooks";
import type { PatientType } from "@types";

export function usePatient(patientId: string) {
  return useGet<PatientType>({
    key: ["patient", patientId],
    urlEndpoint: `Patient/${patientId}/data`,
    message: "Error al obtener el paciente",
    enabled: Boolean(patientId),
  });
}
