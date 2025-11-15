import { PageWrapper } from "@components/layout/PageWrapper";
import { Button, CustomTabs, Personalata } from "@components/ui";
import { useGet } from "@hooks";
import type { PatientType } from "@types";
import { calculateAge } from "@utils";
import { Mars, Undo2, Venus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

function PatientProfile() {
    const { id } = useParams<{ id: string }>();

    const [activeTab, setActiveTab] = useState(1);

    const { data: patient } = useGet<PatientType>({
        key: ["patient", id ?? ""],
        urlEndpoint: `Patient/${id}/data`,
        message: "Error al obtener datos de paciente",
        enabled: id ? true : false,
    });

    console.log(patient)

    return (
        <PageWrapper
            tab={`${patient?.patientPerson.name} ${patient?.patientPerson.lastName}`}
            title={
                <>
                    {patient?.patientPerson.name} {patient?.patientPerson.lastName}
                    {patient?.patientPerson.sex === "FEMALE" ? <Venus className="text-rose-500 size-8" /> : <Mars className="text-blue-500 size-8" />}
                </>
            }
            desc={`CI: ${patient?.patientPerson.ci} • Teléfono: ${patient?.patientPerson.phone} • ${calculateAge(patient?.patientPerson.birthDate)} años - ${patient?.state === "ACTIVE" ? "Activo" : "Inactivo"}`}
            extraComponent={
                <Button className="" onClick={() => window.history.back()} >
                    <Undo2 />
                    Volver a la lista
                </Button>
            }
        >
            <CustomTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={[{
                    value: 1,
                    label: "Datos Personales",
                    content: <Personalata patientInfo={patient} />
                },
                {
                    value: 2,
                    label: "Historia Clínica",
                    content: <></>
                },
                {
                    value: 3,
                    label: "Ortodoncia",
                    content: <></>
                },
                {
                    value: 4,
                    label: "Examen Dental",
                    content: <></>
                },
                {
                    value: 5,
                    label: "Tratamiento",
                    content: <></>
                },
                {
                    value: 6,
                    label: "Seguimiento",
                    content: <></>
                },
                {
                    value: 7,
                    label: "Imágenes",
                    content: <></>
                },
                {
                    value: 8,
                    label: "Pagos",
                    content: <></>
                },
                ]}
            /></PageWrapper>
    )
}

export default PatientProfile