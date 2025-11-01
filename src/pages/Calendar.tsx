import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useGet, usePost, useUpdate } from "@hooks";
import type { AppointmentPayload, PatientType, UserType } from "@types";
import {
  Button,
  Select,
  Modal,
  Input,
  TodayAppoinmentCard,
} from "@components/ui";
import { PageWrapper } from "@components/layout/PageWrapper";
import { AppointmentStatus, AppointmentTypes } from "@constants";
import dayjs from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import type { AppointmentTypes as AppTypes } from "types/AppointmentType";
import type { EventClickArg } from "@fullcalendar/core/index.js";
import { removeAccents } from "@utils";

// Definición de la estructura del formulario
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
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  // Estado de la fecha actual
  const [range, setRange] = useState({
    start: dayjs().startOf("month").format("YYYY-MM-DD"),
    end: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  // Obtención de datos de pacientes
  const { data } = useGet<PatientType[]>({
    key: "patient",
    urlEndpoint: "Patient/all",
    message: "Error al obtener datos de paciente",
  });

  // Obtención de datos de usuarios
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

  // Obtención de datos de citas
  const { data: appointments } = useGet<AppTypes[]>({
    key: ["appointments", range.start, range.end].join("-"),
    urlEndpoint: `Appointment/date?initialDate=${range.start}T00:00:01.013Z&finalDate=${range.end}T23:59:59.013Z`,
    message: "Error al obtener las citas del mes",
  });

  // Manejo de formulario con react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: "",
      professionalId: "",
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "",
      endTime: "",
      type: 0,
      status: 0,
      reason: "",
      observations: "",
    },
  });

  // Envio de datos a la API POST
  const { post } = usePost<AppointmentPayload, unknown>({
    url: "Appointment/create",
    successMessage: "Cita programada con éxito",
    setOpenModal: setOpenModal,
  });

  const { update } = useUpdate<AppointmentPayload, unknown>({
    method: "PATCH",
    url: `Appointment/${appointmentId}`,
    successMessage: "Cita actualizada con éxito",
    setOpenModal: setOpenModal,
  });

  // Función para enviar los datos al backend
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
    console.log(payload);
    isEditing ? update(payload) : post(payload);
  };

  // Función para actualizar el rango de fechas
  const handleDatesSet = useCallback((info: any) => {
    const start = dayjs(info.start).format("YYYY-MM-DD");
    const end = dayjs(info.end).subtract(1, "day").format("YYYY-MM-DD");
    setRange({ start, end });
  }, []);

  // Generación de eventos para el calendario
  const events =
    appointments?.map((appointment) => ({
      id: appointment.id,
      title: `${appointment.patient.patientPerson.name} ${
        appointment.patient.patientPerson.lastName
      } - ${appointment.type.replaceAll("_", " ")}`,
      start: appointment.startDate,
      end: appointment.endDate,
      color: getStatusColor(appointment.status),
    })) ?? [];

  // Función para obtener el color de un estado de cita
  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case "confirmado":
        return "#16a34a";
      case "programado":
        return "#2563eb";
      case "reprogramado":
        return "#9333ea";
      case "pendiente":
        return "#ca8a04";
      case "cancelado":
        return "#dc2626";
      default:
        return "#9ca3af";
    }
  }

  // Verificación de si el dispositivo es móvil
  const isMobile = window.innerWidth <= 768;
  const calendarHeader = isMobile
    ? {
        left: "prev,next today",
        center: "title",
        right: "",
      }
    : {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek",
      };
  const initialView = isMobile ? "listWeek" : "dayGridMonth";

  // Función para manejar el evento de clic en el calendario
  const handleEventClick = (info: EventClickArg | any) => {
    const eventId = info.event.id;
    const event = appointments?.find((a) => a.id === eventId);
    // console.log(event);
    if (event) {
      setValue("patientId", event.patient.id);
      setValue("professionalId", event.professionalId);
      setValue("date", dayjs(event.startDate).format("YYYY-MM-DD"));
      setValue("startTime", dayjs(event.startDate).format("HH:mm"));
      setValue("endTime", dayjs(event.endDate).format("HH:mm"));
      setValue(
        "type",
        AppointmentTypes.findIndex(
          (t) =>
            removeAccents(t.label) ===
            removeAccents(event.type.replaceAll("_", " "))
        )
      );
      setValue(
        "status",
        AppointmentStatus.findIndex(
          (s) => s.label.toLowerCase() === event.status.toLowerCase()
        )
      );
      setValue("reason", event.reason || "");
      setValue("observations", event.observations || "");
      setIsEditing(true);
      setAppointmentId(event.id);
      setOpenModal(true);
    }
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
      <section className="mt-5 flex justify-between gap-3.5 max-h-[80vh] max-md:grid">
        <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-5 md:w-full w-[93svw]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={initialView}
            events={[...events]}
            eventClick={handleEventClick}
            headerToolbar={calendarHeader}
            locale="es"
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              list: "Lista",
            }}
            datesSet={handleDatesSet}
            height={screen.height - screen.width / 5.6}
          />
        </div>

        <TodayAppoinmentCard
          onClick={(id) => handleEventClick({ event: { id } })}
        />
      </section>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={isEditing ? "Editar Cita" : "Crear Nueva Cita"}
        desc={
          isEditing
            ? "Edita la cita de un paciente"
            : "Programa una nueva cita para un paciente"
        }
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
              min={dayjs().format("YYYY-MM-DD")}
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

          <Button>Crear cita</Button>
        </form>
      </Modal>
    </PageWrapper>
  );
}

export default Calendar;
