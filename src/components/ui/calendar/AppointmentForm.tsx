import { Button, Input, Select } from "@components/ui";
import type { AppointmentFormValues } from "@schemas";
import type { PatientType } from "@types";
import dayjs from "dayjs";
import { Save } from "lucide-react";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

type AppointmentFormProps = {
  handleSubmit: UseFormHandleSubmit<AppointmentFormValues>;
  onSubmit: (data: AppointmentFormValues) => void;
  register: UseFormRegister<AppointmentFormValues>;
  errors: FieldErrors<AppointmentFormValues>;
  isEditing: boolean;
  data?: PatientType[];
  professional: { id: string; name: string }[];
  appointmentTypes: { label: string; value: number }[];
  appointmentStatus: { label: string; value: number }[];
  formKey?: string;
};

function AppointmentForm({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isEditing,
  data,
  professional,
  appointmentTypes,
  appointmentStatus,
  formKey,
}: AppointmentFormProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      key={formKey}
      className="grid gap-3"
    >
      <Select
        forSelect="patient"
        label="Paciente"
        values={data?.map((patient) => patient.id)}
        disabled={isEditing}
        className="disabled:bg-gray-200"
        options={data?.map(
          (patient) =>
            patient.patientPerson.name + " " + patient.patientPerson.lastName
        )}
        {...register("patientId")}
        errors={errors.patientId}
      />

      <div className="flex justify-between gap-3">
        <Input
          forInput="date"
          label="Fecha"
          type="date"
          min={dayjs().format("YYYY-MM-DD")}
          {...register("date")}
          errors={errors.date}
        />
        <Input
          forInput="time"
          label="Hora inicio"
          type="time"
          {...register("startTime")}
          errors={errors.startTime}
        />
        <Input
          forInput="time"
          label="Hora fin"
          type="time"
          {...register("endTime")}
          errors={errors.endTime}
        />
      </div>

      <Select
        forSelect="professional"
        label="Dentista"
        values={professional.map((p) => p.id)}
        options={professional.map((p) => p.name)}
        {...register("professionalId")}
        errors={errors.professionalId}
      />

      <Select
        forSelect="appointmentType"
        label="Tipo de cita"
        options={appointmentTypes?.map((t) => t.label)}
        values={appointmentTypes?.map((t) => t.value)}
        {...register("type", { valueAsNumber: true })}
        errors={errors.type}
      />

      <Select
        forSelect="appointmentStatus"
        label="Estado de la cita"
        options={appointmentStatus?.map((t) => t.label)}
        values={appointmentStatus?.map((t) => t.value)}
        {...register("status", { valueAsNumber: true })}
        errors={errors.status}
      />

      <Input
        forInput="reason"
        label="Motivo de la cita"
        {...register("reason")}
      />
      <Input
        forInput="obs"
        label="Observaciones"
        placeholder="Obserbaciones adicionales..."
        {...register("observations")}
      />

      <Button>
        <Save className="size-4" />
        {isEditing ? "Actualizar cita" : "Crear cita"}
      </Button>
    </form>
  );
}

export default AppointmentForm;
