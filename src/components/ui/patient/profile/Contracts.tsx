import { SectionLayout } from "@components/layout";
import { AccordionCard } from "@components/ui/patient/AccordionCard";
import { useGet } from "@hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema } from "@rjsf/utils";
import type { FormType } from "@types";
import NoForm from "@components/ui/NoForm";

type ContractsProps = {
  patientId: string;
};

function Contracts({ patientId }: ContractsProps) {
  const CONTRACT_CONFIG = [
    {
      key: "ortodoncia",
      title: "Tratamiento de Ortodoncia",
      subtitle: "Contrato de brackets y alineadores",
      submoduleId: 4,
    },
    {
      key: "ortopedia",
      title: "Tratamiento de Ortopedia",
      subtitle: "Contrato de ortopedia maxilofacial",
      submoduleId: 5,
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      key: "miofuncional",
      title: "Tratamiento Miofuncional",
      subtitle: "Contrato de terapia miofuncional",
      submoduleId: 6,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
  ];

  const formsQuery = CONTRACT_CONFIG.map((c) =>
    useGet<FormType>({
      key: ["form", c.submoduleId, patientId],
      urlEndpoint: `Form/submodule/${c.submoduleId}/${patientId}`,
      message: "Error al obtener datos de formulario",
    })
  );

  return (
    <SectionLayout
      title="Gestión de contratos"
      description="Contratos de tratamientos especializados del paciente"
    >
      <div className="grid gap-4">
        {CONTRACT_CONFIG.map((contract, index) => {
          const { data: form } = formsQuery[index];

          return (
            <AccordionCard
              key={contract.key}
              title={contract.title}
              subtitle={contract.subtitle}
              count={form?.jsonSchema ? 1 : 0}
              color={contract.color}
              textColor={contract.textColor}
            >
              {form ? (
                <div className="p-3">
                  <Form
                    id={`contract-${contract.submoduleId}`}
                    schema={form.jsonSchema as RJSFSchema}
                    validator={validator}
                    formData={form.response?.jsonResponse}
                    disabled={Boolean(form.response)}
                    onSubmit={() => {}}
                  />
                </div>
              ) : (
                <NoForm text="No hay formularios registrados para este contrato" />
              )}
            </AccordionCard>
          );
        })}
      </div>
    </SectionLayout>
  );
}

export default Contracts;
