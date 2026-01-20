import { SectionLayout } from "@components/layout";
import { useGet, usePost } from "@hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema } from "@rjsf/utils";
import type { FormResType, FormType } from "@types";
import { Files } from "lucide-react";
import NoForm from "@components/ui/NoForm";

type ClinicHistoryProps = {
  patientId: string;
};

function ClinicHistory({ patientId }: ClinicHistoryProps) {
  const submodule = 2;

  const { data: formSubmodule, isPending } = useGet<FormType>({
    key: ["form", submodule],
    urlEndpoint: `Form/submodule/${submodule}/${patientId}`,
    message: "Error al obtener datos de formulario",
  });

  //   console.log(formSubmodule);

  const { post } = usePost<FormResType, unknown>({
    url: "FormRes",
  });

  const onSubmit = (data: any) => {
    const payload: FormResType = {
      formVersionId: formSubmodule?.id ?? "",
      patientId: patientId ?? "",
      jsonResponse: data.formData,
    };
    // console.log(payload);
    post(payload);
  };

  return (
    <SectionLayout
      title="Historia Clínica de Ortodoncia"
      description="Historial de la clínica de ortodoncia"
    >
      {!isPending && formSubmodule ? (
        <div className="p-3 rounded-md bg-[#e7e8e9]">
          <Form
            id="response"
            schema={formSubmodule?.jsonSchema as RJSFSchema}
            validator={validator}
            onSubmit={onSubmit}
            formData={formSubmodule?.response?.jsonResponse}
            disabled={formSubmodule?.response !== null}
          />
        </div>
      ) : (
        <NoForm text=" No hay un formulario para el Historia Odontológica disponible" />
      )}
    </SectionLayout>
  );
}

export default ClinicHistory;
