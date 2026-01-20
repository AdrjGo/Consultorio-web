import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { monitoringSchema, type MonitoringFormValues } from "@schemas";
import type { ModalState } from "@types";
import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";

type MonitoringModalProps = {
  modal: ModalState;
  closeModal: () => void;
};

function MonitoringModal({ modal, closeModal }: MonitoringModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MonitoringFormValues>({
    resolver: zodResolver(monitoringSchema),
    defaultValues: {
      nomenclature: "",
      treatment: "",
    },
  });

  const onSubmit = (data: MonitoringFormValues) => {
    console.log(data);
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
            maxLength={100}
            {...register("treatment")}
            errors={errors.treatment}
          />
        </div>

        <div className="border-b border-gray-300 my-4"></div>

        <section className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-sm dark:text-white">
                Archivos de Evidencia
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Radiografías, fotografías
              </p>
            </div>

            <Button
              type="button"
              // onClick={() =>
              //   append({
              //     format: "image",
              //     description: "",
              //   })
              // }
              className="flex gap-2 items-center w-fit bg-white dark:bg-dark-fourth text-black dark:text-white border border-gray-300 dark:border-dark-fourth text-tiny"
            >
              <Upload size={14} />
              Agregar Archivo
            </Button>
          </div>

          {/* Files */}
          <div className="space-y-4">
            {/* {fields.map((field, index) => ( */}
            <div
              // key={field.id}
              className="border border-gray-300 rounded-md p-4 space-y-3 relative"
            >
              {/* Remove */}
              <button
                type="button"
                // onClick={() => remove(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>

              {/* <div className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" checked readOnly />
                Archivo {index + 1}
                </div> */}

              <div className="grid grid-cols-2 gap-4">
                <Select
                  forSelect="format"
                  label="Formato"
                  options={["Imagen", "Documento", "Radiografía"]}
                  values={["image", "document", "xray"]}
                  // {...register(`evidenceFiles.${index}.format`)}
                />

                <Input
                  forInput="file"
                  type="file"
                  label="Archivo Local"
                  // {...register(`evidenceFiles.${index}.file`)}
                />
              </div>

              <Input
                forInput="urlExtern"
                label="URL Externa (opcional)"
                placeholder="https://..."
                // {...register(`evidenceFiles.${index}.externalUrl`)}
              />

              <Input
                forInput="description"
                label="Descripción"
                placeholder="Ej: Radiografía panorámica pre-tratamiento"
                maxLength={150}
                // {...register(`evidenceFiles.${index}.description`)}
              />
            </div>
            {/* ))} */}
          </div>
        </section>

        <div className="flex gap-3 justify-end [&>button]:w-fit mt-3">
          <Button
            className="bg-white text-black border border-gray-300 text-tiny!"
            onClick={modal.close}
            children="Cancelar"
          />
          <Button children="Registrar Seguimiento" className="bg-blue" />
        </div>
      </form>
    </Modal>
  );
}

export default MonitoringModal;
