import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import type { PatientFormValues } from "@schemas";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors<PatientFormValues>;
};

function getError(errors: FieldErrors, path: string): string | undefined {
  return path.split(".").reduce((acc, key) => acc?.[key], errors as any)
    ?.message;
}

function FormContact({ register, errors }: Props) {
  const contactFields = [
    {
      name: "zone",
      label: "Zona*",
      type: "text",
      placeholder: "Ej: Centro, Sur, Norte, etc...",
      component: "input",
      register: "zone",
    },
    {
      name: "city",
      label: "Ciudad*",
      type: "text",
      placeholder: "Cochabamba, La Paz, etc...",
      component: "input",
      register: "city",
    },
    {
      name: "phone",
      label: "Teléfono*",
      type: "number",
      placeholder: "Ej: +591 123456789",
      component: "input",
      register: "person.phone",
    },
    {
      name: "placeOccupation",
      label: "Lugar de trabajo/ocupación*",
      type: "text",
      placeholder: "Lugar de trabajo/ocupación",
      component: "input",
      register: "placeOccupation",
    },
    {
      name: "email",
      label: "Correo*",
      type: "text",
      placeholder: "correo@ejemplo.com",
      component: "input",
      register: "person.email",
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

  return (
    <section>
      <Input
        forInput="address"
        label="Dirección*"
        type="text"
        placeholder="Calle, número, etc..."
        className="w-full"
        {...register("address")}
        errors={errors.address?.message}
      />
      <div className="grid grid-cols-4 gap-x-5">
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
                  maxLength={20}
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
