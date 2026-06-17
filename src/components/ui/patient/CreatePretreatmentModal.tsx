import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGet, usePost, useUpdate } from "@hooks";
import { pretreatmentSchema, type PretreatmentFormValues } from "@schemas";
import type { ModalState, PretreatmentType } from "@types";
import { getUrlParams } from "@utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type CreatePretreatmentModalProps = {
  modalFormPretreatment: ModalState;
  closeModal: () => void;
  patientId: string;
  isEditing: boolean;
};

function CreatePretreatmentModal({
  modalFormPretreatment,
  closeModal,
  patientId,
  isEditing,
}: CreatePretreatmentModalProps) {
  const examId = getUrlParams({ name: "exam" });

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<PretreatmentFormValues>({
    resolver: zodResolver(pretreatmentSchema),
    defaultValues: {
      patientId: patientId,
      observations: "",
      interconsultation: "",
      caries: false,
      piece: "",
      treatment: "",
      cost: 1,
    },
  });
  //   console.log(watch());

  const { data: pretreatment, isPending } = useGet<PretreatmentType>({
    key: ["pretreatment", examId ?? ""],
    urlEndpoint: `pretreatmentExam/pretreatment/${examId}`,
    message: "Error al obtener datos de formulario",
    enabled: Boolean(examId),
  });
  //   console.log(pretreatment);

  useEffect(() => {
    if (pretreatment && isEditing) {
      reset({
        patientId: patientId,
        observations: pretreatment?.observations,
        interconsultation: pretreatment?.interconsultation,
        caries: pretreatment?.caries ?? false,
        piece: pretreatment?.piece,
        treatment: pretreatment?.treatment,
        cost: pretreatment?.cost ?? 1,
      });
    }
  }, [reset, pretreatment, isEditing]);

  const { post } = usePost<PretreatmentFormValues, unknown>({
    url: "pretreatmentExam",
    setOpenModal: modalFormPretreatment.close,
    queryKeyToInvalidate: [["pretreatmentExam"]],
  });

  const { update } = useUpdate<PretreatmentFormValues, unknown>({
    method: "PATCH",
    url: `pretreatmentExam/${examId}`,
    setOpenModal: modalFormPretreatment.close,
    queryKeyToInvalidate: [["pretreatmentExam"]],
  });

  //   console.log(errors);

  const onSubmit = (data: PretreatmentFormValues) => {
    isEditing ? update(data) : post(data);
    // console.log(data);
  };

  if (isEditing && isPending) return null;

  return (
    <Modal
      title={isEditing ? "Editar pieza" : "Registrar nueva pieza"}
      desc="Registra los hallazgos iniciales antes de comenzar el tratamiento ortodóncico"
      openModal={modalFormPretreatment.isOpen}
      setOpenModal={closeModal}
      classNames="p-4"
    >
      <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 mt-4">
          <Input
            forInput="piece"
            label="Pieza"
            type="number"
            placeholder="11"
            min={1}
            {...register("piece", { valueAsNumber: false })}
            errors={errors.piece}
          />
          <Select
            forSelect="caries"
            label="Caries"
            options={["Sí", "No"]}
            values={["true", "false"]}
            {...register("caries", {
              setValueAs: (v) => v === "true",
            })}
            errors={errors.caries}
          />
        </div>
        <Input
          forInput="observations"
          label="Observaciones"
          placeholder="Describe el estado genearl de la pieza"
          maxLength={100}
          {...register("observations")}
          errors={errors.observations}
        />
        <Input
          forInput="interconsultation"
          label="Interconsulta"
          placeholder="Especifica si se necesita consultar con otro especialista"
          maxLength={200}
          {...register("interconsultation")}
          errors={errors.interconsultation}
        />
        <Input
          forInput="treatment"
          label="Plan de tratamiento"
          placeholder="Especifica el plan de tratamiento"
          maxLength={50}
          {...register("treatment")}
          errors={errors.treatment}
        />
        <Input
          forInput="cost"
          label="Costo"
          type="number"
          min={1}
          {...register("cost", { valueAsNumber: true })}
          errors={errors.cost}
        />
        <Button children={isEditing ? "Editar" : "Guardar"} />
      </form>
    </Modal>
  );
}

export default CreatePretreatmentModal;
