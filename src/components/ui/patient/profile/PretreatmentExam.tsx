import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import DeleteModal from "@components/ui/DeleteModal";
import CreatePretreatmentModal from "@components/ui/patient/CreatePretreatmentModal";
import TreatmentProcessModal from "@components/ui/patient/TreatmentProcessModal";
import { TableMemo } from "@components/ui/table/Table";
import { useDelete, useGet, useModal } from "@hooks";
import type {
  PretreatmentSummaryType,
  PretreatmentType,
  TreatmentProcessSummaryType,
} from "@types";
import { isMobile, setUrlParams } from "@utils";
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FileCheck, Trash, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { set } from "zod";

function PretreatmentExam() {
  dayjs.locale(es);
  dayjs.extend(customParseFormat);

  const { id } = useParams<{ id: string }>();
  const [examId, setExamId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const modalFormPretreatment = useModal();
  const modalTreatmentProcess = useModal();
  const modalDeleteTreatmentProcess = useModal();

  const { deleteItem, isPending: isDeleting } = useDelete({
    url: `pretreatmentExam/${examId}`,
    setOpenModal: modalFormPretreatment.close,
    queryKeyToInvalidate: [["pretreatmentExam"]],
  });

  const { deleteItem: deletePayment, isPending: isDeletingPayment } = useDelete({
    url: `treatmentProcess/${paymentId}`,
    setOpenModal: modalFormPretreatment.close,
    queryKeyToInvalidate: [["treatmentProcess"], ["pretreatmentExam"]],
  });

  const { data: pretreatmentExam } = useGet<PretreatmentSummaryType>({
    key: ["pretreatmentExam"],
    urlEndpoint: `pretreatmentExam/${id}`,
    message: "Error al obtener datos de examen",
  });

  const { data: TreatmentProgresses } = useGet<TreatmentProcessSummaryType>({
    key: ["treatmentProcess"],
    urlEndpoint: `treatmentProcess/${id}`,
    message: "Error al obtener datos de pagos",
  });

  // console.log(pretreatmentExam);

  const payments = [
    {
      title: "Costo Total",
      value: pretreatmentExam?.totalCost,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Pagado",
      value: TreatmentProgresses?.totalPayment,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Deuda Pendiente",
      value: TreatmentProgresses?.totalDebt,
      color: "text-red-600 dark:text-red-400",
    },
  ];

  const closeModal = () => {
    setIsEditing(false);
    if (modalFormPretreatment.isOpen) {
      setUrlParams({ name: "exam", value: "" });
      modalFormPretreatment.close();
    }
  };

  const handleEdit = (id: string) => {
    setIsEditing(true);
    setUrlParams({ name: "exam", value: id });
    modalFormPretreatment.open();
  };
  const handleDelete = (id: string) => {
    setExamId(id);
    deleteItem(id);
    // console.log(id);
  };
  const handleDeletePayment = (id: string) => {
    deletePayment(id);
    // console.log(id);
  };

  console.log(TreatmentProgresses);

  return (
    <SectionLayout
      title="Examen Dental Pretratamiento"
      description="Gestión de exámenes de pretratamiento y avances"
    >
      <div className="rounded-md bg-blue-50 dark:bg-dark-tertiary border border-blue-300 dark:border-dark-fourth flex justify-around text-center p-3">
        {payments.map((payment, index) => (
          <span
            key={index}
            className="text-tiny text-gray-500 dark:text-gray-300 font-semibold"
          >
            {payment.title}
            <p className={`text-normal ${payment.color} font-bold`}>
              Bs. {payment.value}
            </p>
          </span>
        ))}
      </div>
      <div className="md:flex grid md:justify-between gap-5 max-h-full max-w-screen ">
        <section className="rounded-md border border-gray-200 dark:border-dark md:w-full w-[85svw]">
          {/* <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100"></CardHeader> */}
          <div className="bg-linear-to-r from-blue-50 to-blue-100 p-3 dark:from-blue-700/10 dark:to-blue-900/10 flex justify-between">
            <h2 className="flex gap-2 items-center font-bold">
              <FileCheck className="size-4 text-blue-500" />
              Exámenes Pretratamiento
            </h2>
            <Button className="w-fit" onClick={modalFormPretreatment.open}>
              Agregar Pieza
            </Button>
          </div>
          <TableMemo
            editButton
            handleEdit={handleEdit}
            deleteButton
            handleDelete={(id: string) => handleDelete(id)}
            isDeleting={isDeleting}
            textButton={isMobile ? false : true}
            data={pretreatmentExam?.exams || []}
            columns={[
              {
                key: "date",
                label: "Fecha",
                render: (pretreatment: PretreatmentType) => pretreatment.date,
              },
              {
                key: "piece",
                label: "Pieza",
                render: (pretreatment: PretreatmentType) => pretreatment.piece,
              },
              {
                key: "treatment",
                label: "Tratamiento",
                render: (pretreatment: PretreatmentType) =>
                  pretreatment.treatment,
              },
              {
                key: "caries",
                label: "Caries",
                render: (pretreatment: PretreatmentType) =>
                  pretreatment.caries ? "Sí" : "No",
              },
              {
                key: "observations",
                label: "Observación",
                render: (pretreatment: PretreatmentType) =>
                  pretreatment.observations,
              },
              {
                key: "cost",
                label: "Costo",
                render: (pretreatment: PretreatmentType) => pretreatment.cost,
              },
            ]}
          />
        </section>

        <section className="rounded-md border dark:border-dark  border-gray-200 w-full">
          {/* <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100"></CardHeader> */}
          <div className="bg-linear-to-r from-emerald-50 to-emerald-100 dark:from-emerald-700/10 dark:to-emerald-900/10  p-3">
            <h2 className="flex gap-2 items-center font-bold">
              <TrendingUp className="size-4 text-green-600" />
              Avances del Tratamiento
            </h2>
            <p className="text-tiny">
              Registro de pagos realizados que se descuentan de la deuda total
            </p>
          </div>

          <div className="p-3 grid gap-3">
            <Button
              className="bg-green text-tiny!"
              onClick={modalTreatmentProcess.open}
            >
              Registrar Pago
            </Button>
            {TreatmentProgresses?.treatmentProgresses.map(
              (treatmentProcess, index) => (
                <section
                  key={index}
                  className="rounded-md border dark:border-none border-gray-200 dark:bg-dark p-2 gap-1 flex items-center"
                >
                  <div className="grid flex-1">
                    <span className="text-tiny text-gray-500">
                      {dayjs(treatmentProcess.date, "DD-MM-YYYY").format(
                        "D [de] MMMM [de] YYYY",
                      )}
                    </span>
                    <span className="text-small text-green-600 font-semibold">
                      Bs. {treatmentProcess.payment}
                    </span>
                    <span className="text-tiny text-gray-500">
                      Deuda restante: {treatmentProcess.debt}
                    </span>
                  </div>

                  <Button
                    className="max-md:hidden text-red-600 bg-white shadow-none size-fit"
                    onClick={() => {
                      setPaymentId(treatmentProcess.id);
                      modalDeleteTreatmentProcess.open();
                    }}
                  >
                    <Trash className="size-4" />
                  </Button>
                </section>
              ),
            )}
          </div>
        </section>
      </div>

      {modalFormPretreatment.isOpen && id && (
        <CreatePretreatmentModal
          modalFormPretreatment={modalFormPretreatment}
          closeModal={closeModal}
          patientId={id ?? ""}
          isEditing={isEditing}
        />
      )}

      {modalTreatmentProcess.isOpen && id && (
        <TreatmentProcessModal
          modalTreatmentProcess={modalTreatmentProcess}
          closeModal={modalTreatmentProcess.close}
          patientId={id ?? ""}
        />
      )}

      {modalDeleteTreatmentProcess.isOpen && id && (
        <DeleteModal
          modal={modalDeleteTreatmentProcess}
          handleDelete={(id: string) => handleDeletePayment(id)}
          deleteTitle="Eliminar pago"
          deleteDesc="Está seguro que desea eliminar este pago?"
          deleteId={id}
          isDeleting={isDeletingPayment}
        />
      )}
    </SectionLayout>
  );
}

export default PretreatmentExam;
