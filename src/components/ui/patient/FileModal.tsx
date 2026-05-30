import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import InputFile from "@components/ui/InputFile";
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGet, usePatient, usePost } from "@hooks";
import { fileSchema, type FileFormValues } from "@schemas";
import { supabase } from "@store";
import type { ModalState, MonitoringType } from "@types";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

type FileModalProps = {
  modal: ModalState;
};

function FileModal({ modal }: FileModalProps) {
  const { id: patientId } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FileFormValues>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      monitoringId: "",
      description: "",
    },
  });

  const { data: monitoring } = useGet<MonitoringType[]>({
    key: ["monitoring", patientId ? patientId : ""],
    urlEndpoint: `Monitoring/patient/${patientId}`,
    message: "Error al obtener el seguimiento",
  });

  const monitoringOptions = monitoring?.map(
    (m) => m.nomenclature + " - " + m.treatment + " - " + m.date,
  );

  const { post } = usePost<FileFormValues, unknown>({
    url: "EvidenceFile/create",
    setOpenModal: modal.close,
  });

  const { data: patient } = usePatient(patientId ?? "");
  console.log(patient);

  const onSubmit = async (data: FileFormValues) => {
    const file = data.file[0];
    const ext = file.name.split(".").pop();
    const path = `${patient?.patientPerson.name} ${patient?.patientPerson.lastName}/${data.monitoringId}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("studies")
      .upload(path, file, { upsert: false, contentType: file.type });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("studies")
      .getPublicUrl(path);

    const publicUrl = publicData.publicUrl;

    const payload = {
      monitoringId: data.monitoringId,
      description: data.description,
      format: file.type,
      externalReference: publicUrl,
    };

    // console.log(payload);

    post(payload);
  };

  return (
    <Modal
      title="Subir imágenes de evidencia"
      desc="Selecciona un archivo y carga una o varias imágenes"
      openModal={modal.isOpen}
      setOpenModal={modal.close}
    >
      <form className="my-3 grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Select
          forSelect="monitoring"
          label="Seleccionar seguimiento"
          options={monitoringOptions}
          values={monitoring?.map((m) => m.id)}
          {...register("monitoringId")}
          errors={errors.monitoringId}
        />
        <Input
          forInput="description"
          label="Descripción"
          maxLength={199}
          {...register("description")}
          errors={errors.description}
        />

        <InputFile
          id="study"
          title="Sube la imagen necesaria para el seguimiento del paciente"
          description="JPG, PNG"
          accept="image/png,image/jpeg"
          {...register("file")}
        />

        <div className="flex [&>button]:w-fit justify-end gap-2">
          <Button
            children="Cancelar"
            type="button"
            className="bg-white text-black border border-gray-300"
            onClick={modal.close}
          />
          <Button children="Subír imagen" className="bg-blue" />
        </div>
      </form>
    </Modal>
  );
}

export default FileModal;
