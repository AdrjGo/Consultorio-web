import { useEffect, useState } from "react";
import Modal from "@components/ui/Modal";
import type { FormType, ModalState, SubmoduleType } from "@types";
import type { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Editor from "@monaco-editor/react";
import Form from "@rjsf/antd";
import { useForm } from "react-hook-form";
import { dynamicFormSchema, type DynamicFormValues } from "@schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "@components/ui/Select";
import { useGet, usePost, useUpdate } from "@hooks";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { getUrlParams, hasPermission } from "@utils";
import NoPermission from "@components/ui/NoPermission";

type CreateRolModalProps = {
  modalForm: ModalState;
  closeModal: () => void;
  isEditing: boolean;
  //   formData: FormType;
};

export default function FormModal({
  modalForm,
  closeModal,
  isEditing,
}: CreateRolModalProps) {
  const idForm = getUrlParams({ name: "formId" });

  const { data: form } = useGet<FormType>({
    key: ["form", idForm ?? ""],
    urlEndpoint: `Form/${idForm}/id`,
    message: "Error al obtener datos de formulario",
    enabled: Boolean(idForm),
  });

  const SAMPLE_SCHEMA: RJSFSchema = {};
  const [schemaText, setSchemaText] = useState(() =>
    JSON.stringify(SAMPLE_SCHEMA, null, 2),
  );
  const [liveSchema, setLiveSchema] = useState<RJSFSchema>(SAMPLE_SCHEMA);
  const [parseError, setParseError] = useState<string | null>(null);
  // console.log(form);
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DynamicFormValues>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: {
      submodId: "",
      numberVersion: 0,
      jsonSchema: {},
      form: {
        name: "",
        description: "",
      },
    },
  });

  // console.log(errors);

  const { data: submodule, isPending } = useGet<SubmoduleType[]>({
    key: "submodule",
    urlEndpoint: "Submodule",
    message: "Error al obtener datos de submódulo",
  });

  useEffect(() => {
    if (form && isEditing) {
      reset({
        submodId: form.submodId,
        numberVersion: form.numberVersion,
        jsonSchema: form.jsonSchema as RJSFSchema,
        form: {
          name: form.form.name,
          description: form.form.description,
        },
      });
      setSchemaText(JSON.stringify(form.jsonSchema, null, 2));
    }
  }, [reset, form, idForm]);

  const { post } = usePost<DynamicFormValues, unknown>({
    url: "Form",
    setOpenModal: modalForm.close,
    queryKeyToInvalidate: [["form"]],
  });

  const { update } = useUpdate<DynamicFormValues, unknown>({
    method: "PATCH",
    url: `Form/${idForm}`,
    setOpenModal: modalForm.close,
    queryKeyToInvalidate: [["form"]],
  });

  console.log(watch());

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const parsed = JSON.parse(schemaText || "{}");

        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("El esquema debe ser un objeto JSON válido.");
        }

        setLiveSchema(parsed);
        setParseError(null);
      } catch (err: any) {
        setParseError(err?.message ?? String(err));
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [schemaText]);

  useEffect(() => {
    register("jsonSchema");
  }, [register]);

  const onSubmit = (formData: DynamicFormValues) => {
    let parsedJsonSchema: object;
    try {
      parsedJsonSchema =
        schemaText && schemaText.trim() !== "" ? JSON.parse(schemaText) : {};
    } catch (err) {
      setParseError("JSON inválido. Corrige el esquema antes de guardar.");
      return;
    }

    const payload: DynamicFormValues = {
      submodId: formData.submodId,
      numberVersion: formData.numberVersion,
      jsonSchema: parsedJsonSchema,
      form: formData.form,
    };

    !isEditing
      ? post(payload)
      : form?.numberVersion != watch("numberVersion")
        ? post(payload)
        : update(payload);
  };

  // const ThemedForm = withTheme(Theme);

  return (
    <Modal
      openModal={modalForm.isOpen}
      setOpenModal={closeModal}
      classNames="!w-5/6 !h-[80vh] p-4"
    >
      {hasPermission(
        isEditing
          ? "Actualizar Formularios Dinámicos"
          : "Crear Formularios Dinámicos",
      ) ? (
        <form
          id={form?.id}
          className="grid gap-3 h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4 h-full overflow-hidden">
            {/* Left: Editors */}
            <div className="w-1/2 grid gap-2">
              <section className="grid gap-2 grid-cols-2">
                {/* <p className="font-medium">Datos</p> */}
                <Select
                  forSelect="submod"
                  label="Submodulo"
                  options={submodule?.map((s) => s.submoduleName)}
                  values={submodule?.map((s) => s.id)}
                  {...register("submodId")}
                  errors={errors.submodId}
                />
                <Input
                  forInput="numberVersion"
                  label="Versión"
                  type="number"
                  {...register("numberVersion", { valueAsNumber: true })}
                  errors={errors.numberVersion}
                />
                <Input
                  forInput="Nombre del formulario"
                  label="Nombre del formulario"
                  {...register("form.name")}
                  errors={errors.form?.name}
                />
                <Input
                  forInput="Descripción del formulario"
                  label="Descripción del formulario"
                  {...register("form.description")}
                  errors={errors.form?.description}
                />
                <input type="hidden" {...register("jsonSchema")} />
              </section>

              <section className="flex flex-col gap-2 w-full min-h-0">
                <p className="font-medium dark:text-white">
                  Esquema del formulario (JSON)
                </p>
                <div className="flex-1 border rounded overflow-hidden">
                  <Editor
                    defaultLanguage="json"
                    value={schemaText}
                    onChange={(val) => {
                      setSchemaText(val ?? "{}");
                    }}
                    options={{
                      minimap: { enabled: false },
                      formatOnType: true,
                    }}
                    height="100%"
                    theme="vs-dark"
                  />
                </div>

                {parseError && (
                  <div className="text-red-600 text-sm whitespace-pre-wrap">
                    Error al parsear JSON: {parseError}
                  </div>
                )}
              </section>
            </div>

            {/* Right: Preview */}
            <section className="w-1/2 h-full overflow-auto">
              <h3 className="mb-2 font-semibold dark:text-white">
                Previsualzación
              </h3>
              <div className="bg-white p-4 rounded shadow-sm">
                <Form
                  id="new"
                  tagName={"div"}
                  schema={liveSchema}
                  validator={validator}
                  disabled
                  uiSchema={{}}
                />
              </div>
            </section>
          </div>
          <section className="flex gap-4">
            <Button
              className="bg-transparent dark:bg-dark-fourth text-black dark:text-white border dark:border-none border-back"
              children="Cancelar"
              onClick={closeModal}
              type="button"
              disabled={isSubmitting}
            />
            <Button
              children={isEditing ? "Editar" : "Guardar"}
              disabled={isSubmitting}
            />
          </section>
        </form>
      ) : (
        <NoPermission />
      )}
    </Modal>
  );
}
