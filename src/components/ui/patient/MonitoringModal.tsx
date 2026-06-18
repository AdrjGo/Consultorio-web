import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal, usePost } from "@hooks";
import { monitoringSchema, type MonitoringFormValues } from "@schemas";
import type { ModalState } from "@types";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

type MonitoringModalProps = {
  modal: ModalState;
  closeModal: () => void;
};

function MonitoringModal({ modal, closeModal }: MonitoringModalProps) {
  const modalForm = useModal();

  const { id } = useParams<{ id: string }>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MonitoringFormValues>({
    resolver: zodResolver(monitoringSchema),
    defaultValues: {
      patientId: id ?? "",
      nomenclature: "",
      treatment: "",
    },
  });

  const { post, isPending } = usePost<MonitoringFormValues, unknown>({
    url: "Monitoring/create",
    setOpenModal: modalForm.close,
    queryKeyToInvalidate: [["monitoring"]],
  });

  const onSubmit = (data: MonitoringFormValues) => {
    console.log(data);
    post(data);
  };

  return (
    <Modal
      title="Registrar Seguimiento"
      desc="Registra el progreso del tratamiento y pagos asociados"
      openModal={modal.isOpen}
      setOpenModal={modal.close}
      classNames="p-4"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 my-3">
          <Input
            forInput="nomenclature"
            label="Nomenclatura"
            placeholder="NOM-001"
            maxLength={15}
            {...register("nomenclature")}
            errors={errors.nomenclature}
          />
          <Input
            forInput="treatment"
            label="Tratamiento"
            placeholder="Tratamiento básico"
            maxLength={30}
            {...register("treatment")}
            errors={errors.treatment}
          />
        </div>

        {/*  */}

        <div className="flex gap-3 justify-end [&>button]:w-fit mt-3">
          <Button
            className="bg-white text-black border border-gray-300 text-tiny!"
            onClick={modal.close}
            children="Cancelar"
          />
          <Button disabled={isPending} children={isPending ? "Guardando..." : "Registrar Seguimiento"} className="bg-blue" />
        </div>
      </form>
    </Modal>
  );
}

export default MonitoringModal;
