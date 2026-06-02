import { Mars, Undo2, Venus } from "lucide-react";
import { useNavigate } from "react-router";
import { useParams, useSearchParams } from "react-router";
import { PageWrapper } from "@components/layout/PageWrapper";
import {
  Button,
  ClinicHistory,
  Contracts,
  CustomTabs,
  Files,
  GeneralHistory,
  Monitoring,
  Personalata,
  PretreatmentExam,
  TreatmentSummary,
  Payment,
} from "@components/ui";
import { useGet } from "@hooks";
import type { PatientType } from "@types";
import { calculateAge } from "@utils";

function PatientProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: patient } = useGet<PatientType>({
    key: ["patient", id ?? ""],
    urlEndpoint: `Patient/${id}/data`,
    message: "Error al obtener datos de paciente",
    enabled: id ? true : false,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = Number(searchParams.get("tab") || "1");

  const handleTabChange = (newTab: number) => {
    setSearchParams({ tab: String(newTab) });
  };

  return (
    <PageWrapper
      tab={`${patient?.patientPerson.name} ${patient?.patientPerson.lastName}`}
      title={
        <>
          {patient?.patientPerson.name} {patient?.patientPerson.lastName}
          {patient?.patientPerson.sex === "FEMALE" ? (
            <Venus className="text-rose-500 size-8" />
          ) : (
            <Mars className="text-blue-500 size-8" />
          )}
        </>
      }
      desc={`CI: ${patient?.patientPerson.ci} • Teléfono: ${
        patient?.patientPerson.phone
      } • ${calculateAge(patient?.patientPerson.birthDate)} años - ${
        patient?.state === "ACTIVE" ? "Activo" : "Inactivo"
      }`}
      extraComponent={
        <>
          <Button className="bg-gray-400" onClick={() => navigate(-1)}>
            <Undo2 />
            Volver
          </Button>
        </>
      }
    >
      <CustomTabs
        activeTab={tabFromUrl}
        setActiveTab={handleTabChange}
        tabs={[
          {
            value: 1,
            label: "Datos Personales",
            content: <Personalata patientInfo={patient} />,
          },
          {
            value: 2,
            label: "Historial General",
            content: <GeneralHistory />,
          },
          {
            value: 3,
            label: "Examen Dental",
            content: <PretreatmentExam />,
          },
          {
            value: 4,
            label: "Historia de ortodoncia",
            content: <ClinicHistory patientId={id ?? ""} />,
          },
          {
            value: 5,
            label: "Resumen de Tratamiento",
            content: <TreatmentSummary patientId={id ?? ""} />,
          },
          {
            value: 6,
            label: "Contratos",
            content: <Contracts />,
          },
          {
            value: 7,
            label: "Seguimiento",
            content: <Monitoring patientId={id ?? ""} />,
          },
          {
            value: 8,
            label: "Imágenes",
            content: <Files />,
          },
          {
            value: 9,
            label: "Pagos",
            content: <Payment />,
          },
        ]}
      />
    </PageWrapper>
  );
}

export default PatientProfile;