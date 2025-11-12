import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarPlus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useGet, usePost, useUpdate } from "@hooks";
import type { AppointmentPayload, PatientType, UserType } from "@types";
import {
  Button,
  Modal,
  TodayAppoinmentCard,
  AppointmentForm,
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
import { isMobile, removeAccents } from "@utils";
import { getStatusColor } from "@features";
import { appointmentSchema, type AppointmentFormValues } from "@schemas";

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

  const defaultValues = useMemo(
    () => ({
      patientId: "",
      professionalId: "",
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "",
      endTime: "",
      type: 0,
      status: 0,
      reason: "",
      observations: "",
    }),
    []
  );

  // Manejo de formulario con react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
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
    reset(defaultValues);
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
      title: `${appointment.patient.patientPerson.name} ${appointment.patient.patientPerson.lastName
        } - ${appointment.type.replaceAll("_", " ")}`,
      start: appointment.startDate,
      end: appointment.endDate,
      color: getStatusColor(appointment.status),
    })) ?? [];

  // Verificación de si el dispositivo es móvil
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
      reset({
        patientId: event.patientId,
        professionalId: event.professionalId,
        date: dayjs(event.startDate).format("YYYY-MM-DD"),
        startTime: dayjs(event.startDate).format("HH:mm"),
        endTime: dayjs(event.endDate).format("HH:mm"),
        type: AppointmentTypes.findIndex(
          (t) =>
            removeAccents(t.label) ===
            removeAccents(event.type.replaceAll("_", " "))
        ),
        status: AppointmentStatus.findIndex(
          (s) => s.label.toLowerCase() === event.status.toLowerCase()
        ),
        reason: event.reason || "",
        observations: event.observations || "",
      });

      setAppointmentId(event.id);
      setIsEditing(true);
      setOpenModal(true);
    }
  };

  // useEffect(() => {
  //   console.log("Valores actuales del formulario:", watch());
  // }, [openModal]);

  const handleNewAppointment = useCallback(() => {
    setIsEditing(false);
    setAppointmentId(null);
    reset(defaultValues);
    setOpenModal(true);
  }, [reset]);

  return (
    <PageWrapper
      tab={tab}
      title="Agenda de Citas"
      desc="Gestiona las citas y horarios del consultorio"
      extraComponent={
        <Button
          className="text-small text-white! px-5 bg-green"
          onClick={() => handleNewAppointment()}
        >
          <CalendarPlus className="size-4 mr-2" />
          Agregar Cita
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
        <AppointmentForm
          key={appointmentId ?? "new"}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          isEditing={isEditing}
          data={data}
          professional={professional}
          appointmentTypes={AppointmentTypes}
          appointmentStatus={AppointmentStatus}
        />
      </Modal>
    </PageWrapper>
  );
}

export default Calendar;
