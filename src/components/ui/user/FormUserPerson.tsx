import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import type { UserFormValues } from "@schemas";
import { getError } from "@utils";
import {
  useFormState,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  //   errors: FieldErrors<PatientFormValues>;
  control: Control<UserFormValues>;
  field?: string;
};

function FormUserPerson({ register, field, control }: Props) {
  const personFields = [
    {
      name: "name",
      label: "Nombres*",
      type: "text",
      placeholder: "Nombre Completo",
      component: "input",
      register: `${field}.name`,
      maxLength: 20,
    },
    {
      name: "lastName",
      label: "Apellidos*",
      type: "text",
      placeholder: "Apellidos",
      component: "input",
      register: `${field}.lastName`,
      maxLength: 20,
    },
    {
      name: "ci",
      label: "Carnet de identidad*",
      type: "text",
      placeholder: "12345678",
      component: "input",
      register: `${field}.ci`,
      maxLength: 9,
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
      placeholder: "Dentista, Cirujano, etc...",
      component: "input",
      register: `${field}.profession`,
      maxLength: 30,
    },
    {
      name: "email",
      label: "Correo*",
      type: "text",
      placeholder: "usuario@odis.com",
      component: "input",
      register: `${field}.email`,
      maxLength: 50,
    },
    {
      name: "phone",
      label: "Teléfono celular",
      type: "text",
      placeholder: "76778548",
      component: "input",
      register: `${field}.phone`,
      maxLength: 10,
    },
  ];

  const { errors } = useFormState({
    control,
  });

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
                maxLength={field.maxLength}
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

export default FormUserPerson;
