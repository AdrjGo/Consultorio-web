import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import FileCard from "@components/ui/patient/FileCard";
import FileModal from "@components/ui/patient/FileModal";
import Modal from "@components/ui/Modal";
import { useGet, useModal } from "@hooks";
import type { FileType } from "@types";
import { MonitorUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

function Files() {
  const { id: patientId } = useParams<{ id: string }>();

  const modalForm = useModal();
  const modalPreview = useModal();
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  const { data: files } = useGet<FileType[]>({
    key: [patientId ? patientId : ""],
    urlEndpoint: `EvidenceFile/patient/${patientId}`,
    message: "Error al obtener el seguimiento",
  });

  const handleFileClick = (file: FileType) => {
    setSelectedFile(file);
    modalPreview.open();
  };

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
          <FileCard key={file.id} file={file} onClick={handleFileClick} />
        ))}
      </section>

      <Modal
        openModal={modalPreview.isOpen}
        setOpenModal={modalPreview.close}
        title={selectedFile?.description ?? "Vista previa"}
        classNames="md:w-3/4! md:max-h-full overflow-y-auto"
      >
        {selectedFile && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <img
              src={selectedFile.externalReference}
              alt={selectedFile.description}
              className="max-w-full max-h-1/2 rounded object-contain"
            />
            <p className="text-small text-gray-500 dark:text-gray-400">
              {selectedFile.monitoringNomenclature} —{" "}
              {new Date(selectedFile.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </Modal>

      {modalForm.isOpen && <FileModal modal={modalForm} />}
    </SectionLayout>
  );
}

export default Files;
