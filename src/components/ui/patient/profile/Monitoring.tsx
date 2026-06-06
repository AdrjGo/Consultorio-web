import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import MonitoringModal from "@components/ui/patient/MonitoringModal";
import { TableMemo } from "@components/ui/table/Table";
import { useGet, useModal } from "@hooks";
import type { MonitoringType } from "@types";
import { setUrlParams } from "@utils";
import { Monitor, FileDown } from "lucide-react";
import { useState } from "react";
import { exportMonitoringPDF } from "@components/pdf/clinical/exportMonitoringPDF";

type MonitoringProps = {
  patientId: string;
  patientName: string;
  patientCi: string;
};

function Monitoring({ patientId, patientName, patientCi }: MonitoringProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);

  const { data } = useGet<MonitoringType[]>({
    key: ["monitoring", patientId],
    urlEndpoint: `Monitoring/patient/${patientId}`,
    message: "Error al obtener el seguimiento",
    enabled: Boolean(patientId),
  });

  const modal = useModal();

  //   console.log(data);
  const closeModal = () => {
    setIsEditing(false);
    if (modal.isOpen) {
      setUrlParams({ name: "monitoringId", value: "" });
      modal.close();
    }
  };
  const handleEdit = (id: string) => {
    setUrlParams({ name: "monitoringId", value: id });
    setIsEditing(true);
    modal.open();
  };

  const handleExportPDF = async () => {
    setExporting(true);
    await exportMonitoringPDF(patientId, patientName, patientCi);
    setExporting(false);
  };

  return (
    <SectionLayout
      title="Seguimiento Clínico"
      description="Historial de ctas y tratamienos realizados"
      extraComponent={
        <div className="grid gap-2">
          <Button
            className="text-small text-white! px-5 bg-green"
            onClick={() => modal.open()}
          >
            <Monitor className="size-5" />
            Registrar Seguimiento
          </Button>
          {(data && data.length > 0) && (
            <Button
              className="text-small px-5 bg-blue-500 text-white!"
              onClick={handleExportPDF}
              disabled={exporting}
            >
              <FileDown className="size-4" />
              {exporting ? "Exportando..." : "Exportar PDF"}
            </Button>
          )}
        </div>
      }
    >
      <TableMemo
        handleEdit={handleEdit}
        editButton
        deleteButton
        columns={[
          {
            key: "date",
            label: "Fecha",
            render: (monitoring: MonitoringType) => monitoring.date,
          },
          {
            key: "nomenclature",
            label: "Nomenclatura",
            render: (monitoring: MonitoringType) => monitoring.nomenclature,
          },
          {
            key: "treatment",
            label: "Tratamiento",
            render: (monitoring: MonitoringType) => monitoring.treatment,
          },
          {
            key: "files",
            label: "Archivos",
            render: (monitoring: MonitoringType) => monitoring.files,
          },
        ]}
        data={data || []}
      />

      {modal.isOpen && (
        <MonitoringModal modal={modal} closeModal={modal.close} />
      )}
    </SectionLayout>
  );
}

export default Monitoring;
