import { SectionLayout } from "@components/layout";
import { useGet, usePost } from "@hooks";
import Form from "@rjsf/antd";
import type { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import type { FormResType, FormType } from "@types";
import { useParams } from "react-router";

function GeneralHistory() {
  const submodule = 1;
  const { id } = useParams<{ id: string }>();

  const { data: formSubmodule, isPending } = useGet<FormType>({
    key: ["form", submodule],
    urlEndpoint: `Form/submodule/${submodule}/${id}`,
    message: "Error al obtener datos de formulario",
  });

  console.log(formSubmodule?.response);

  const { post } = usePost<FormResType, unknown>({
    url: "FormRes",
  });

  const onSubmit = (data: any) => {
    const payload: FormResType = {
      formVersionId: formSubmodule?.id ?? "",
      patientId: id ?? "",
      jsonResponse: data.formData,
    };
    // console.log(payload);
    post(payload);
  };

  return (
    <SectionLayout
      title="Historial de Salud General"
      description="Antecedentes médicos y odontológicos"
    >
      {!isPending && formSubmodule && (
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
      )}
    </SectionLayout>
  );
}

export default GeneralHistory;
