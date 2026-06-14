import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "@hooks";
import {
  paymentTreatmentSchema,
  type PaymentTreatmentFormValues,
} from "@schemas";
import type { ModalState } from "@types";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

type PaymentModalProps = {
  modal: ModalState;
};

function PaymentModal({ modal }: PaymentModalProps) {
  const { id: patientId } = useParams<{ id: string }>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PaymentTreatmentFormValues>({
    resolver: zodResolver(paymentTreatmentSchema),
    defaultValues: {
      patientId: patientId ?? "",
      amount: 0,
      method: 0,
      observations: "",
    },
  });

  console.log(errors);

  const { post } = usePost<PaymentTreatmentFormValues, unknown>({
    url: "PaymentTreatment/create",
    setOpenModal: modal.close,
  });

  const onSubmit = (data: PaymentTreatmentFormValues) => {
    post(data);
    //window.location.reload();
    // console.log(data);
  };

  return (
    <Modal
      title="Recepción de pagos"
      desc="Registra los pagos recibidos"
      openModal={modal.isOpen}
      setOpenModal={modal.close}
      classNames="p-0"
    >
      <form className="my-3 grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          forInput="amount"
          label="Monto pagado"
          type="number"
          errors={errors.amount}
          {...register("amount", { valueAsNumber: true })}
        />
        <Select
          forSelect="paymentMethod"
          label="Método de pago"
          options={["Efectivo", "Transferencia", "Qr", "Otro"]}
          values={[0, 1, 2, 3]}
          {...register("method", { valueAsNumber: true })}
          errors={errors.method}
        />
        <Input
          forInput="obervations"
          label="Observaciones"
          errors={errors.observations}
          {...register("observations")}
        />

        <Button className="text-white mt-3">Registrar pago</Button>
      </form>
    </Modal>
  );
}

export default PaymentModal;
