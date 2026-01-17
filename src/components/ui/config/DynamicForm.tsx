import { SectionLayout } from "@components/layout";
import Button from "@components/ui/Button";
import FormModal from "@components/ui/config/FormModal/FormModal";
import { useGet, useModal } from "@hooks";
import type { FormType } from "@types";
import { setUrlParams } from "@utils";
import { FileText, SquarePen } from "lucide-react";
import { useState } from "react";

function DynamicForm() {
  const [idRole, setIdRole] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const modalForms = useModal();

  const {
    data: forms,
    error,
    isPending,
  } = useGet<FormType[]>({
    key: "forms",
    urlEndpoint: "Form/all",
    message: "Error al obtener formularios",
  });
  // console.log(forms);

  const handleEdit = (id: string) => {
    setIdRole(id);
    setIsEditing(true);
    setUrlParams({ name: "formId", value: id });
    // console.log(id);
    modalForms.open();
  };

  const closeModal = () => {
    setIsEditing(false);
    if (modalForms.isOpen) {
      setUrlParams({ name: "formId", value: "" });
      modalForms.close();
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <SectionLayout
      title="Formularios Clínicos"
      description="Personaliza y crea tus formularios"
      extraComponent={
        <Button
          className="text-small text-white! px-5 bg-green"
          onClick={() => modalForms.open()}
        >
          <FileText className="size-4" />
          Nuevo Formulario
        </Button>
      }
    >
      {forms?.map((form) => (
        <section
          key={form.id}
          className=" dark:bg-dark p-4 border dark:border-none border-gray-300 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="text-normal font-bold uppercase">
              {form.form.name}
            </h3>
            <p className="text-tiny text-gray-500 dark:text-gray-300">
              {form.form.description}
            </p>
          </div>

          <div>
            <Button
              className="text-small bg-white dark:bg-dark-tertiary border dark:border-none dark:hover:bg-dark-fourth border-gray-300 rounded-md px-5 py-2 shadow-none"
              onClick={() => handleEdit(form.id)}
            >
              <SquarePen className="size-3" />
              Editar
            </Button>
          </div>
        </section>
      ))}
      {modalForms.isOpen && (
        <FormModal
          modalForm={modalForms}
          closeModal={closeModal}
          isEditing={isEditing}
          // formData={forms}
        />
      )}
    </SectionLayout>
  );
}

export default DynamicForm;
