import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import PaymentModal from "@components/ui/config/Payment/PaymentModal";
import { TableMemo } from "@components/ui/table/Table";
import { useDelete, useGet, useModal } from "@hooks";
import type { PaymentTreatment, PaymentTreatmentProgress } from "@types";
import dayjs from "dayjs";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

function Payment() {
  const { id: patientId } = useParams<{ id: string }>();
  const modal = useModal();
  const [idPayment, setIdPayment] = useState<string | null>(null);

  const { data } = useGet<PaymentTreatment>({
    key: ["paymentTreatment"],
    urlEndpoint: `PaymentTreatment/patient/${patientId}`,
    message: "Error al obtener los pagos",
  });

  const paymentCards = [
    {
      title: "Total del Tratamiento",
      value: `${"Bs. " + data?.totalCost}`,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Pagado",
      value: `${"Bs. " + data?.totalPayment}`,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Pendiente",
      value: `${"Bs. " + data?.totalDebt}`,
      color: "text-red-600 dark:text-red-400",
    },
  ];

  const { deleteItem } = useDelete({
    url: `PaymentTreatment/${idPayment}`,
    setOpenModal: modal.close,
  });

  const handleDelete = (id: string) => {
    setIdPayment(id);
    deleteItem(id);
    // console.log(id);
  };

  return (
    <SectionLayout
      title="Pagos y cobros"
      description="Gestión financiera del tratamiento"
      extraComponent={
        <Button
          className="text-small text-white! px-5 bg-green"
          onClick={modal.open}
        >
          <CreditCard className="size-5" />
          Registrar pago
        </Button>
      }
    >
      <section className="flex justify-between gap-5">
        {paymentCards.map((payment, index) => (
          <article
            key={index}
            className="bg-[#e7e8e9] dark:bg-dark w-full p-6 rounded-md dark:text-white font-semibold"
          >
            <h3 className="text-xl font-bold mb-4">{payment.title}</h3>
            <span className={`text-subtitle ${payment.color} font-bold`}>
              {payment.value}
            </span>
          </article>
        ))}
      </section>

      <h2 className="text-title font-bold mt-3">Historial de Pagos</h2>
      <TableMemo
        // editButton
        handleEdit={() => {}}
        deleteButton
        handleDelete={(id: string) => handleDelete(id)}
        columns={[
          {
            key: "month",
            label: "Mes",
            render: (payment: PaymentTreatmentProgress) =>
              dayjs(payment.createdAt).format("D [de] MMMM [de] YYYY"),
          },
          {
            key: "amount",
            label: "Monto",
            render: (payment: PaymentTreatmentProgress) => payment.payment,
          },
          {
            key: "method",
            label: "Método",
            render: (payment: PaymentTreatmentProgress) => payment.method,
          },
          {
            key: "received_by",
            label: "Recibido por",
            render: (payment: PaymentTreatmentProgress) => payment.recivedBy,
          },
          {
            key: "observations",
            label: "Observación",
            render: (payment: PaymentTreatmentProgress) => payment.observations,
          },
        ]}
        data={data?.paymentTreatmentProgresses || []}
        className="w-full"
      />
      {modal.isOpen && <PaymentModal modal={modal} />}
    </SectionLayout>
  );
}

export default Payment;
