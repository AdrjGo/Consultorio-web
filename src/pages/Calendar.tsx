import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useGet } from "@hooks";
import type { AppointmentPayload, PatientType, UserType } from "@types";
import { Button, Select, Modal, Input } from "@components/ui";
import { PageWrapper } from "@components/layout/PageWrapper";
import { useMutation } from "@tanstack/react-query";
import { getToken, Toast } from "@utils";
import { AppointmentStatus, AppointmentTypes } from "@constants";

const appointmentSchema = z.object({
  patientId: z.string().min(1, { message: "El paciente es requerido" }),
  professionalId: z.string().min(1, { message: "El dentista es requerido" }),
  date: z.string().min(1, { message: "La fecha es requerida" }),
  startTime: z.string().min(1, { message: "La hora de inicio es requerida" }),
  endTime: z.string().min(1, { message: "La hora de fin es requerida" }),
  type: z.number().min(0, { message: "El tipo de cita es requerido" }),
  status: z.number().min(0, { message: "El estado de la cita es requerido" }),
  reason: z.string(),
  observations: z.string(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

function Calendar({ tab }: { tab: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [onLoad, setOnLoad] = useState(false);

  const { data } = useGet<PatientType[]>({
    key: "patient",
    urlEndpoint: "Patient/all",
    message: "Error al obtener datos de paciente",
  });

  const { data: users } = useGet<UserType[]>({
    key: "users",
    urlEndpoint: "User/all",
    message: "Error al obtener datos de usuario",
  });

  const professional = (users ?? [])
    .filter((u) => u.roles.some((r) => r.name === "Dentista"))
    .map((u) => ({
      id: u.id,
      name: `${u.person.name} ${u.person.lastName}`,
    }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const mutation = useMutation<unknown, Error, AppointmentPayload>({
    mutationFn: async (data: AppointmentPayload) => {
      const token = getToken();

      const res = await fetch("http://localhost:5252/api/Appointment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Error al agendar cita");
      }

      return result;
    },
    onSuccess: () => {
      setOpenModal(false);
      setOnLoad(false);
      Toast.success("Cita programada con éxito");
    },
    onError: (error: any) => {
      setOnLoad(false);
      Toast.error(error.message);
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    const { date, startTime, endTime, ...rest } = data;
    const startDate = `${data.date}T${data.startTime}:00`;
    const endDate = `${data.date}T${data.endTime}:00`;

    const payload: AppointmentPayload = {
      ...rest,
      type: Number(data.type),
      status: Number(data.status),
      startDate: startDate,
      endDate: endDate,
    };
    // console.log(payload);
    mutation.mutate(payload);
  };

  return (
    <PageWrapper
      tab={tab}
      title="Agenda de Citas"
      desc="Gestiona las citas y horarios del consultorio"
      extraComponent={
        <Button
          className="text-small text-white! px-5"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="size-4 mr-2" />
          Nueva Cita
        </Button>
      }
    >
      <section></section>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="Crear Nueva Cita"
        desc="Programa una nueva cita para un paciente"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            forSelect="patient"
            label="Paciente"
            values={data?.map((patient) => patient.id)}
            options={data?.map((patient) => patient.patientPerson.name)}
            {...register("patientId")}
            errors={errors.patientId?.message}
          />

          <div className="flex justify-between gap-3">
            <Input
              forInput="date"
              label="Fecha"
              {...register("date")}
              errors={errors.date?.message}
            />
            <Input
              forInput="time"
              label="Hora inicio"
              {...register("startTime")}
              errors={errors.startTime?.message}
            />
            <Input
              forInput="time"
              label="Hora fin"
              {...register("endTime")}
              errors={errors.endTime?.message}
            />
          </div>

          <Select
            forSelect="professional"
            label="Dentista"
            values={professional.map((p) => p.id)}
            options={professional.map((p) => p.name)}
            {...register("professionalId")}
            errors={errors.professionalId?.message}
          />

          <Select
            forSelect="appointmentType"
            label="Tipo de cita"
            options={AppointmentTypes?.map((t) => t.label)}
            values={AppointmentTypes?.map((t) => t.value)}
            {...register("type", { valueAsNumber: true })}
            errors={errors.type?.message}
          />

          <Select
            forSelect="appointmentStatus"
            label="Estado de la cita"
            options={AppointmentStatus?.map((t) => t.label)}
            values={AppointmentStatus?.map((t) => t.value)}
            {...register("status", { valueAsNumber: true })}
            errors={errors.status?.message}
          />

          <Input
            forInput="reason"
            label="Motivo de la cita"
            {...register("reason")}
          />
          <Input
            forInput="obs"
            label="observaciones"
            placeholder="Obserbaciones adicionales..."
            {...register("observations")}
          />

          <Button disabled={onLoad}>Crear cita</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}

export default Calendar;
