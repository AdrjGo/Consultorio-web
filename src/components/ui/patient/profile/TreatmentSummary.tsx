import { SectionLayout } from "@components/layout";
import { useGet, usePost } from "@hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema } from "@rjsf/utils";
import type { FormResType, FormType } from "@types";
import { Files } from "lucide-react";

type TreatmentSummaryProps = {
  patientId: string;
};

function TreatmentSummary({ patientId }: TreatmentSummaryProps) {
  const submodule = 3;

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
      title="Resumen de tratamiento de Ortodoncia"
      description="Resumen del tratamiento a realizar"
    >
      {!isPending && formSubmodule ? (
        <div className="p-3">
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
        <div className="w-full grid place-items-center gap-2">
          <Files />
          <p className=" text-small text-gray-500">
            No hay un formulario para el Historia Odontológica disponible
          </p>
        </div>
      )}
    </SectionLayout>
  );
}

export default TreatmentSummary;
