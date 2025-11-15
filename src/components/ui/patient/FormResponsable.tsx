import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import type { PatientFormValues } from "@schemas";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  responsible: boolean;
  setResponsible: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<any>;
  errors: FieldErrors<PatientFormValues>;
  field: string;
};

function getError(errors: FieldErrors, path: string): string | undefined {
  return path.split(".").reduce((acc, key) => acc?.[key], errors as any)
    ?.message;
}

function FormResponsable({
  register,
  errors,
  field,
}: Props) {
  const responsibleFields = [
    {
      name: "parentage",
      label: "Parentesco*",
      options: [
        { label: "Padre", value: "Padre" },
        { label: "Madre", value: "Madre" },
        { label: "Apoderado", value: "Apoderado" },
        { label: "Tío", value: "Tio" },
        { label: "Tía", value: "Tia" },
      ],
      component: "select",
      register: `responsible.parentage`,
    },
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
      label: "Profesión*",
      type: "text",
      placeholder: "Médico, Abogado, etc...",
      component: "input",
      register: `${field}.profession`,
    },
    {
      name: "email",
      label: "Correo*",
      type: "text",
      placeholder: "correo@ejemplo.com",
      component: "input",
      register: `${field}.email`,
    },
    {
      name: "phone",
      label: "Teléfono*",
      type: "number",
      placeholder: "Ej: +591 123456789",
      component: "input",
      register: `${field}.phone`,
    },
  ];

  return (
    <section>
      {/* <div className="flex gap-2 my-2">
        <input
          type="checkbox"
          id="responsible"
          checked={responsible}
          onChange={() => setResponsible(!responsible)}
        />
        <label htmlFor="responsible" className="text-small">
          El paciente es menor de edad
        </label>
      </div> */}

      {/* <div className="border rounded-md py-3 px-3 border-blue-200 bg-blue-50 grid gap-4"> */}
      {/* <span className="text-small text-gray-500 font-medium">
          Datos del responsable
        </span> */}
      <section className="grid grid-cols-4 gap-x-5 gap-y-3 mb-3">
        {responsibleFields.map((field) => {
          const error = getError(errors, field.register);
          return (
            <div key={field.name} className="col-span-2">
              {field.component === "input" ? (
                <Input
                  forInput={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full"
                  {...register(field.register)}
                  maxLength={20}
                  errors={error}
                />
              ) : (
                <Select
                  forSelect={field.name}
                  label={field.label}
                  options={field.options?.map((o) => o.label)}
                  values={field.options?.map((o) => o.value)}
                  {...register(field.register)}
                  errors={error}
                />
              )}
            </div>
          );
        })}
      </section>
      {/* </div> */}
    </section>
  );
}

export default FormResponsable;
