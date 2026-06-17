import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "@hooks";
import {
  type TreatmentProcessFormValues,
  treatmentProcessSchema,
} from "@schemas";
import type { ModalState } from "@types";
import { useForm } from "react-hook-form";

type TreatmentProcessModalProps = {
  modalTreatmentProcess: ModalState;
  closeModal: () => void;
  patientId: string;
};

function TreatmentProcessModal({
  modalTreatmentProcess,
  closeModal,
  patientId,
}: TreatmentProcessModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TreatmentProcessFormValues>({
    resolver: zodResolver(treatmentProcessSchema),
    defaultValues: {
      patientId: patientId,
      payment: 0,
    },
  });

  const { post } = usePost<TreatmentProcessFormValues, unknown>({
    url: "treatmentProcess",
    setOpenModal: modalTreatmentProcess.close,
    queryKeyToInvalidate: [["treatmentProcess"], ["pretreatmentExam"]],
  });

  const onSubmit = (data: TreatmentProcessFormValues) => {
    console.log(data);
    post(data);
  };

  return (
    <Modal
      title="Registrar pago de pre tratamiento"
      desc="Registra el progreso del tratamiento y pagos asociados"
      openModal={modalTreatmentProcess.isOpen}
      setOpenModal={closeModal}
    >
      <section className="grid gap-3 my-2">
        <span className="text-tiny text-blue-800 dark:text-white p-3 bg-blue-50 dark:bg-dark border border-blue-200 rounded-lg">
          💡 Los pagos se descuentan de la deuda total del tratamiento. El
          paciente puede pagar cualquier monto en cada cita.
        </span>
        <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            forInput="payment"
            label="Monto Pagado (Bs.)"
            type="number"
            min={1}
            max={10000}
            {...register("payment", { valueAsNumber: true })}
            errors={errors.payment}
          />
          <div className="flex [&>button]:w-fit justify-end gap-2">
            <Button
              children="Cancelar"
              type="button"
              className="bg-white text-black border border-gray-300"
              onClick={modalTreatmentProcess.close}
            />
            <Button children="Registrar Pago" className="bg-green" />
          </div>
        </form>
      </section>
    </Modal>
  );
}

export default TreatmentProcessModal;
