import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import PaymentModal from "@components/ui/config/Payment/PaymentModal";
import { TableMemo } from "@components/ui/table/Table";
import { useDelete, useGet, useModal } from "@hooks";
import type { PaymentTreatment, PaymentTreatmentProgress } from "@types";
import {
  exportPaymentReport,
  exportQuotaReport,
  exportAccountStatement,
} from "@components/pdf/exportFinancialReports";
import dayjs from "dayjs";
import { CreditCard, FileText, Receipt, Wallet } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

function Payment() {
  const { id: patientId } = useParams<{ id: string }>();
  const modal = useModal();
  const [idPayment, setIdPayment] = useState<string | null>(null);
  const [loadingPagos, setLoadingPagos] = useState(false);
  const [loadingCuotas, setLoadingCuotas] = useState(false);
  const [loadingEstado, setLoadingEstado] = useState(false);

  const { data } = useGet<PaymentTreatment>({
    key: ["paymentTreatment"],
    urlEndpoint: `PaymentTreatment/patient/${patientId}`,
    message: "Error al obtener los pagos",
  });

  const { data: patientData } = useGet<{ patient: { name: string; lastName: string; ci: string } }>({
    key: ["patient"],
    urlEndpoint: `patients/${patientId}`,
    message: "Error al obtener datos del paciente",
  });

  const { data: contractsData } = useGet<{ contracts: Array<{ id: string }> }>({
    key: ["patient-contracts"],
    urlEndpoint: `contracts/patient/${patientId}`,
    message: "Error al obtener contratos",
  });

  // Get first contractId for quota report
  const firstContractId = contractsData?.contracts?.[0]?.id;

  const patientName = patientData?.patient
    ? `${patientData.patient.name}_${patientData.patient.lastName}`
    : "paciente";
  const patientCi = patientData?.patient?.ci ?? "";

  // ── Export handlers ──────────────────────────────────────────
  const handleExportPagos = async () => {
    if (!patientId) return;
    setLoadingPagos(true);
    try {
      await exportPaymentReport(patientId, patientName, patientCi);
    } finally {
      setLoadingPagos(false);
    }
  };

  const handleExportCuotas = async () => {
    if (!firstContractId) return;
    setLoadingCuotas(true);
    try {
      await exportQuotaReport(firstContractId, patientName, patientCi);
    } finally {
      setLoadingCuotas(false);
    }
  };

  const handleExportEstado = async () => {
    if (!patientId) return;
    setLoadingEstado(true);
    try {
      await exportAccountStatement(patientId, patientName, patientCi);
    } finally {
      setLoadingEstado(false);
    }
  };

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

  const { deleteItem, isDeleting } = useDelete({
    url: `PaymentTreatment/${idPayment}`,
    setOpenModal: modal.close,
    queryKeyToInvalidate: [["paymentTreatment"]],
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
      <section className="flex justify-between gap-5 max-md:gap-3">
        {paymentCards.map((payment, index) => (
          <article
            key={index}
            className="bg-[#e7e8e9] dark:bg-dark w-full p-6 rounded-md dark:text-white font-semibold"
          >
            <h3 className="text-xl max-md:text-small font-bold mb-4">{payment.title}</h3>
            <span className={`text-subtitle ${payment.color} font-bold`}>
              {payment.value}
            </span>
          </article>
        ))}
      </section>

      {/* ── Export buttons ── */}
      <section className="flex gap-3 mt-4 flex-wrap">
        <Button
          className="text-small text-white! px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleExportPagos}
          disabled={loadingPagos || !patientId}
        >
          {loadingPagos ? (
            <span className="animate-spin mr-1">⏳</span>
          ) : (
            <FileText className="size-4" />
          )}
          Exportar Pagos
        </Button>

        {/* <Button */}
        {/*   className="text-small text-white! px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" */}
        {/*   onClick={handleExportCuotas} */}
        {/*   disabled={loadingCuotas || !firstContractId} */}
        {/* > */}
        {/*   {loadingCuotas ? ( */}
        {/*     <span className="animate-spin mr-1">⏳</span> */}
        {/*   ) : ( */}
        {/*     <Receipt className="size-4" /> */}
        {/*   )} */}
        {/*   Exportar Cuotas */}
        {/* </Button> */}

        <Button
          className="text-small text-white! px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleExportEstado}
          disabled={loadingEstado || !patientId}
        >
          {loadingEstado ? (
            <span className="animate-spin mr-1">⏳</span>
          ) : (
            <Wallet className="size-4" />
          )}
          Exportar Estado de Cuenta
        </Button>
      </section>

      <h2 className="text-title font-bold mt-3">Historial de Pagos</h2>
      <TableMemo
        // editButton
        handleEdit={() => { }}
        deleteButton
        handleDelete={(id: string) => handleDelete(id)}
        isDeleting={isDeleting}
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
            render: (payment: PaymentTreatmentProgress) => {
              const methodMap: Record<string, string> = {
                "0": "Efectivo",
                "1": "Transferencia",
                "2": "Qr",
                "3": "Otro",
              };
              return methodMap[String(payment.method)] ?? String(payment.method);
            },
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
