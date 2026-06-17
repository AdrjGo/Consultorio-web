import Modal from "@components/ui/Modal";
import type { ModalState } from "@types";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema } from "@rjsf/utils";
import NoForm from "@components/ui/NoForm";
import Form from "@rjsf/antd";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import { useForm } from "react-hook-form";
import { contractSchema, type ContractFormValues } from "@schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { data, useParams } from "react-router";
import Button from "@components/ui/Button";
import { usePatient, usePost } from "@hooks";
import { Toast } from "@utils";

type ContractModalProps = {
  modalForm: ModalState;
  contractTabs: { submoduleId: number }[];
  selectedIndex: number | null;
  formsQueries: any;
  view: boolean;
};

function ContractModal({
  modalForm,
  contractTabs,
  selectedIndex,
  formsQueries,
  view,
}: ContractModalProps) {
  const selectedForm =
    selectedIndex !== null ? (formsQueries[selectedIndex].data as any) : null;
  const selectedContract =
    selectedIndex !== null ? contractTabs[selectedIndex] : null;

  const [rjsfData, setRjsfData] = useState<any>(
    selectedForm?.response?.jsonResponse ?? {},
  );

  const { id: patientId } = useParams<{ id: string }>();
  const patient = usePatient(patientId ?? "");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      contract: { totalCost: 0, monthsDuration: 0 },
      paymentManager: { personId: "", parentage: "" },
    },
  });

  const hasResponsible = Boolean(patient.data?.responsible);

  const payerOptions = hasResponsible
    ? [
      `${patient.data?.responsible.person.name} ${patient.data?.responsible.person.lastName} (Responsable)`,
      `${patient.data?.patientPerson.name} ${patient.data?.patientPerson.lastName} (Paciente)`,
    ]
    : [
      `${patient.data?.patientPerson.name} ${patient.data?.patientPerson.lastName} (Paciente)`,
    ];

  const payerValues = hasResponsible
    ? [patient.data?.responsible.person.id, patient.data?.patientPerson.id]
    : [patient.data?.patientPerson.id];

  const { post } = usePost<ContractFormValues, unknown>({
    url: "Contract",
    queryKeyToInvalidate: [["contract"]],
  });

  const onSubmit = (values: ContractFormValues) => {
    if (!selectedForm?.id) return;
    if (!patientId) return;

    const payload = {
      formRes: {
        formVersionId: selectedForm.id,
        patientId,
        jsonResponse: rjsfData,
      },
      contract: {
        totalCost: values.contract.totalCost,
        monthsDuration: values.contract.monthsDuration,
      },
      paymentManager: {
        personId: values.paymentManager.personId,
        parentage: patient.data?.responsible
          ? patient.data.responsible.parentage
          : "",
      },
    };
    modalForm.close();
    post(payload);
    // console.log(payload);
  };

  console.log(rjsfData);

  return (
    <Modal
      openModal={modalForm.isOpen}
      setOpenModal={modalForm.close}
      classNames="p-0 !h-3/4 !w-3/4 max-md:!w-full overflow-hidden"
    >
      <div className="flex max-md:grid gap-2 size-full">
        {!view && (
          <form
            className="grid gap-4 p-4 w-[30%] max-md:w-full h-fit"
            action="submit"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <section className="grid gap-4 p-4 w-[30%] h-fit"> */}
            <span className="border-b border-gray-200 dark:border-dark-fourth pb-3">
              <h2 className="text-normal font-semibold dark:text-white">
                Datos de contrato
              </h2>
              <p className="text-small text-gray-500 dark:text-gray-300">
                Llena los datos de contrato del paciente
              </p>
            </span>

            <Input
              forInput="months"
              label="Meses de tratamiento"
              type="number"
              errors={errors.contract?.monthsDuration}
              {...register("contract.monthsDuration", { valueAsNumber: true })}
            />
            <Input
              forInput="cost"
              label="Costo total (Bs.)"
              type="number"
              errors={errors.contract?.totalCost}
              {...register("contract.totalCost", { valueAsNumber: true })}
            />
            <Select
              forSelect="payer"
              label="Responsable de pagos"
              options={payerOptions}
              values={payerValues as string[]}
              {...register("paymentManager.personId")}
              errors={errors.paymentManager?.personId}
              {...register("paymentManager.personId")}
            />
            <Button className="bg-blue-500 text-white" type="submit">
              Guardar Contrato
            </Button>
            {/* </section> */}
          </form>
        )}

        <section
          className={`bg-background dark:bg-dark p-2 rounded-md border-l dark:border-none border-gray-100 max-md:w-full ${view ? "w-full" : "w-[70%]"}  h-full  grid gap-4 overflow-hidden`}
        >
          {selectedForm && selectedContract ? (
            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
              <div className="p-3 rounded-md bg-[#e7e8e9]">
                <Form
                  id={`contract-${selectedContract.submoduleId}`}
                  schema={selectedForm.jsonSchema as RJSFSchema}
                  validator={validator}
                  formData={selectedForm.response?.jsonResponse}
                  disabled={Boolean(selectedForm.response)}
                  onChange={(data) => setRjsfData(data.formData)}
                  onSubmit={() =>
                    Toast.info(
                      "Formulario aceptado, ahora puede guardar el contrato",
                    )
                  }
                />
              </div>
            </div>
          ) : (
            <NoForm text="No hay formularios registrados para este contrato" />
          )}
        </section>
      </div>
    </Modal>
  );
}

export default ContractModal;
