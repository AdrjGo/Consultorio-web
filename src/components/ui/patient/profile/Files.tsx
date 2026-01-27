import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import FileCard from "@components/ui/patient/FileCard";
import FileModal from "@components/ui/patient/FileModal";
import { useGet, useModal } from "@hooks";
import type { FileType } from "@types";
import { MonitorUp } from "lucide-react";
import { useParams } from "react-router";

function Files() {
  const { id: patientId } = useParams<{ id: string }>();

  const modalForm = useModal();

  const { data: files } = useGet<FileType[]>({
    key: [patientId ? patientId : ""],
    urlEndpoint: `EvidenceFile/patient/${patientId}`,
    message: "Error al obtener el seguimiento",
  });

  console.log(files);

  return (
    <SectionLayout
      title="Imágenes Clínicas"
      description="Galería de radiografías y fotografías del paciente"
      extraComponent={
        <Button
          className="text-small text-white! px-5 bg-green"
          onClick={() => modalForm.open()}
        >
          <MonitorUp className="size-5" />
          Registrar Imagen
        </Button>
      }
    >
      <section className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {files?.map((file) => (
          <FileCard {...file} />
        ))}
      </section>

      {modalForm.isOpen && <FileModal modal={modalForm} />}
    </SectionLayout>
  );
}

export default Files;
