import { SectionLayout } from "@components/layout";
import { AccordionCard } from "@components/ui/patient/AccordionCard";
import { useGet, useModal, usePost } from "@hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema } from "@rjsf/utils";
import type { FormResSchema, FormType } from "@types";
import NoForm from "@components/ui/NoForm";
import { useParams } from "react-router";
import { useQueries } from "@tanstack/react-query";
import { getData } from "@services";

// type ContractsProps = {
//   patientId: string;
// };

function Contracts() {
  const modalForm = useModal();

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

  const { id: patientId } = useParams<{ id: string }>();

  // const formsQuery = CONTRACT_CONFIG.map((c) =>
  //   useGet<FormType>({
  //     key: ["form", c.submoduleId],
  //     urlEndpoint: `Form/submodule/${c.submoduleId}/${patientId}`,
  //     message: "Error al obtener datos de formulario",
  //   }),
  // );

  const formsQueries = useQueries({
    queries: CONTRACT_CONFIG.map((c) => ({
      queryKey: ["form", c.submoduleId, patientId],
      queryFn: async () =>
        getData({
          url: `Form/submodule/${c.submoduleId}/${patientId}`,
        }),
      enabled: Boolean(patientId),
    })),
  });

  const { post } = usePost<FormResSchema, unknown>({
    url: "FormRes",
    setOpenModal: modalForm.close,
  });

  return (
    <SectionLayout
      title="Gestión de contratos"
      description="Contratos de tratamientos especializados del paciente"
    >
      <div className="grid gap-4">
        {CONTRACT_CONFIG.map((contract, index) => {
          // const { data: form } = formsQueries[index];
          const form = formsQueries[index].data;

          // console.log(form);
          const handleSubmit = (data: object) => {
            const payload: FormResSchema = {
              formVersionId: form?.id ?? "",
              patientId: patientId ?? "",
              jsonResponse: data,
            };
            console.log(payload);
            post(payload);
          };

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
                <div className="p-3 rounded-md bg-[#e7e8e9]">
                  <Form
                    id={`contract-${contract.submoduleId}`}
                    schema={form.jsonSchema as RJSFSchema}
                    validator={validator}
                    formData={form.response?.jsonResponse}
                    disabled={Boolean(form.response)}
                    onSubmit={(data) => {
                      handleSubmit(data.formData);
                    }}
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
