import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import type { PatientFormValues } from "@schemas";
import {
  useFormState,
  type Control,
  type FieldError,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  // errors: FieldErrors<PatientFormValues>;
  control: Control<PatientFormValues>;
};

function getError(errors: FieldErrors, path: string): FieldError {
  return path.split(".").reduce((acc, key) => acc?.[key], errors as any);
}

function FormContact({ register, control }: Props) {
  const contactFields = [
    {
      name: "zone",
      label: "Zona*",
      type: "text",
      placeholder: "Ej: Centro, Sur, Norte, etc...",
      component: "input",
      register: "zone",
      maxLength: 20,
    },
    {
      name: "city",
      label: "Ciudad*",
      type: "text",
      placeholder: "Cochabamba, La Paz, etc...",
      component: "input",
      register: "city",
      maxLength: 20,
    },
    {
      name: "phone",
      label: "Teléfono*",
      type: "number",
      placeholder: "Ej: +591 123456789",
      component: "input",
      register: "person.phone",
      maxLength: 10,
    },
    {
      name: "placeOccupation",
      label: "Lugar de trabajo/ocupación*",
      type: "text",
      placeholder: "Lugar de trabajo/ocupación",
      component: "input",
      register: "placeOccupation",
      maxLength: 50,
    },
    {
      name: "email",
      label: "Correo*",
      type: "text",
      placeholder: "correo@ejemplo.com",
      component: "input",
      register: "person.email",
      maxLength: 50,
    },
    {
      name: "sender",
      label: "Referencia (opcional)",
      type: "text",
      placeholder: "Persona, referencia, etc...",
      component: "input",
      register: "sender",
    },
  ];

  const { errors } = useFormState({
    control,
  });

  return (
    <section>
      <Input
        forInput="address"
        label="Dirección*"
        type="text"
        placeholder="Calle, número, etc..."
        className="w-full mb-3"
        {...register("address")}
        errors={errors.address}
      />
      <div className="grid grid-cols-4 gap-x-5 gap-y-3 mb-3">
        {contactFields.map((field, index) => {
          const error = getError(errors, field.register);
          return (
            <div key={index} className="col-span-2">
              {field.component === "input" ? (
                <Input
                  forInput={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full"
                  {...register(field.register)}
                  maxLength={field.maxLength}
                  errors={error}
                />
              ) : (
                <Select forSelect={field.name ?? ""} label={field.label} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FormContact;
