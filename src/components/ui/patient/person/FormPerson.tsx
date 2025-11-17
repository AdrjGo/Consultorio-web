import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import type { PatientFormValues } from "@schemas";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors<PatientFormValues>;
  field?: string;
};


function FormPerson({ register, errors, field }: Props) {
  const personFields = [
    {
      name: "name",
      label: "Nombres*",
      type: "text",
      placeholder: "Nombre Completo",
      component: "input",
      register: `${field}.name`,
    },
    {
      name: "lastName",
      label: "Apellidos*",
      type: "text",
      placeholder: "Apellidos",
      component: "input",
      register: `${field}.lastName`,
    },
    {
      name: "ci",
      label: "Carnet de identidad*",
      type: "number",
      placeholder: "12345678",
      component: "input",
      register: `${field}.ci`,
    },
    {
      name: "birthDate",
      label: "Fecha de nacimiento*",
      type: "date",
      placeholder: "Fecha de nacimiento",
      component: "input",
      register: `${field}.birthDate`,
    },
    {
      name: "gender",
      label: "Género*",
      options: [
        { label: "Masculino", value: "MALE" },
        { label: "Femenino", value: "FEMALE" },
      ],
      component: "select",
      register: `${field}.sex`,
    },
    {
      name: "profession",
      label: "Profesión",
      type: "text",
      placeholder: "Médico, Abogado, etc...",
      component: "input",
      register: `${field}.profession`,
    },
    {
      name: "occupation",
      label: "Ocupación*",
      type: "text",
      placeholder: "Ej: Empleado, Autónomo, etc...",
      component: "input",
      register: "occupation",
    },
    {
      name: "nit",
      label: "NIT/Documento fiscal",
      type: "number",
      placeholder: "NIT",
      component: "input",
      register: "nit",
    },
  ];

  function getError(errors: any, path: string) {
    return path.split('.').reduce((acc, key) => acc?.[key], errors)?.message;
  }

  return (
    <section className="grid grid-cols-4 gap-x-5 gap-y-3">
      {personFields.map((field) => {
        return (
          <div key={field.name} className="col-span-2">
            {field.component === "input" ? (
              <Input
                forInput={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full"
                maxLength={20}
                {...register(field.register)}
                errors={getError(errors, field.register)}
              />
            ) : (
              <Select
                forSelect={field.name}
                label={field.label}
                options={field.options?.map((o) => o.label)}
                values={field.options?.map((o) => o.value)}
                {...register(field.register)}
                errors={getError(errors, field.register)}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}

export default FormPerson;
