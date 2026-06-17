import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import { useGet, usePost } from "@hooks";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema } from "@rjsf/utils";
import type { FormResType, FormType } from "@types";
import { FileDown } from "lucide-react";
import NoForm from "@components/ui/NoForm";
import { useState } from "react";
import { exportOrthodonticsHistoryPDF } from "@components/pdf/clinical/exportOrthodonticsHistoryPDF";

type ClinicHistoryProps = {
  patientId: string;
  patientName: string;
  patientCi: string;
};

function ClinicHistory({ patientId, patientName, patientCi }: ClinicHistoryProps) {
  const [exporting, setExporting] = useState<boolean>(false);
  const submodule = 2;

  const { data: formSubmodule, isPending } = useGet<FormType>({
    key: ["form", submodule],
    urlEndpoint: `Form/submodule/${submodule}/${patientId}`,
    message: "Error al obtener datos de formulario",
  });

  //   console.log(formSubmodule);

  const { post } = usePost<FormResType, unknown>({
    url: "FormRes",
    queryKeyToInvalidate: [["form"]],
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

  const handleExportPDF = async () => {
    setExporting(true);
    await exportOrthodonticsHistoryPDF(patientId, patientName, patientCi);
    setExporting(false);
  };

  return (
    <SectionLayout
      title="Historia Clínica de Ortodoncia"
      description="Historial de la clínica de ortodoncia"
      extraComponent={
        formSubmodule?.response?.jsonResponse && (
          <Button
            className="text-small px-5 bg-blue-500 text-white!"
            onClick={handleExportPDF}
            disabled={exporting}
          >
            <FileDown className="size-4" />
            {exporting ? "Exportando..." : "Exportar PDF"}
          </Button>
        )}
    >
      {!isPending && formSubmodule ? (
        <>
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
        </>
      ) : (
        <NoForm text=" No hay un formulario para el Historia Odontológica disponible" />
      )}
    </SectionLayout >
  );
}

export default ClinicHistory;
