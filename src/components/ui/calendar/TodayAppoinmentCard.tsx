import { useDelete, useGet, useUpdate } from "@hooks";
import {
  BadgeCheck,
  CircleUser,
  Clock3,
  FileText,
  Notebook,
  PencilLine,
  Trash,
  User,
} from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
import type { AppointmentTypes } from "types/AppointmentType";
import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import { hasPermission } from "@utils";
import { useNavigate } from "react-router";

type Props = {
  onClick: (appointmentId: string) => void;
};

type LifeStatusPayload = {
  id: string;
  lifeStatus: number;
};

function TodayAppoinmentCard({ onClick }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const startDate = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs().format("YYYY-MM-DD");

  const { data } = useGet<AppointmentTypes[]>({
    key: "today-appointments",
    urlEndpoint: `Appointment/date?initialDate=${startDate} 00:00:01&finalDate=${endDate} 23:59:59`,
    message: "Error al obtener las citas de hoy",
  });

  // console.log(data);

  const { update, isPending: isUpdating } = useUpdate<LifeStatusPayload, unknown>({
    method: "PATCH",
    url: (data: LifeStatusPayload) => `Appointment/${data.id}/lifeStatus`,
    queryKeyToInvalidate: [["appointments"], ["today-appointments"]],
  });

  const handleChangeLifeStatus = (id: string, lifeStatus: number) => {
    update({ id, lifeStatus });
  };

  const { deleteItem, isDeleting } = useDelete({
    url: (id: string) => `Appointment/${id}`,
    successMessage: "Cita eliminada con éxito",
    setOpenModal: setOpenModal,
    queryKeyToInvalidate: [["appointments"], ["today-appointments"]],
  });

  const isSaving = isUpdating || isDeleting;

  const onClickHandler = (id: string) => {
    setOpenModal(true);
    deleteItem(id);
  };

  const statusColors = [
    {
      status: "Confirmado",
      color: "bg-green-100",
      textColor: "text-green-600",
    },
    { status: "Programado", color: "bg-blue-100", textColor: "text-blue-600" },
    {
      status: "Reprogramado",
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      status: "Pendiente",
      color: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    { status: "Cancelado", color: "bg-red-100", textColor: "text-red-600" },
    {
      status: "Completado",
      color: "bg-green-600",
      textColor: "text-white",
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-secondary md:w-1/4 border dark:border-none border-gray-200 rounded-lg p-5 overflow-hidden flex flex-col max-h-[80vh]">
      <h3 className="text-black dark:text-white font-bold text-subtitle flex items-center gap-2">
        <Clock3 className="text-gray-600 dark:text-white" /> Citas de hoy
      </h3>
      <span className="text-small text-gray-400 dark:text-gray-300 font-semibold">
        {data?.length} Citas programadas
      </span>

      <section className="overflow-y-auto h-full">
        <div className="grid gap-4 mt-3">
          {data
            ?.slice()
            .sort(
              (a, b) =>
                new Date(a.startDate).getTime() -
                new Date(b.startDate).getTime(),
            )

            .map((appointment, index) => {
              const color = statusColors.find(
                (s) =>
                  s.status.toLowerCase() === appointment.status.toLowerCase(),
              );

              console.log(appointment.endDate > dayjs().hour().toString())

              return (
                <section
                  className="dark:bg-dark-tertiary border dark:border-none border-gray-200 rounded-md p-3 grid"
                  key={index}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-normal">
                      {dayjs(appointment.startDate).format("HH:mm") + " - " + dayjs(appointment.endDate).format("HH:mm")}
                    </span>
                    <span
                      className={`text-small font-semibold px-2 py-1 rounded-md ${color?.color} ${color?.textColor}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <ol className="[&>li]:flex [&>li]:gap-2 items-center text-small grid gap-2">
                    <li className="font-semibold">
                      <User
                        strokeWidth={1.25}
                        className="text-gray-600 dark:text-gray-300 size-5"
                      />
                      {appointment.patient.patientPerson.name}
                    </li>
                    <li>
                      <FileText
                        strokeWidth={1.25}
                        className="text-gray-600 dark:text-gray-300 size-5"
                      />
                      {appointment.type.replaceAll("_", " ")}
                    </li>
                    <li>
                      <Notebook
                        strokeWidth={1.25}
                        className="text-gray-600 dark:text-gray-300 size-5"
                      />
                      {appointment.reason}
                    </li>
                  </ol>

                  <div className="flex justify-between gap-2.5 [&>button]:bg-white [&>button]:text-black [&>button]:border-gray-200 [&>button]:rounded-md [&>button]:p-2 [&>button]:text-small [&>button]:font-semibold [&>button]:hover:bg-gray-200 [&>button]:border [&>button]:focus:bg-gray-100 mt-4">
                    {appointment.lifeStatus === "NoIniciado" &&
                      appointment.status === "Confirmado" ? (
                      <Button
                        className="bg-green-700! border-none text-white!"
                        disabled={isSaving}
                        onClick={() =>
                          handleChangeLifeStatus(appointment.id, 1)
                        }
                      >
                        <BadgeCheck className="size-4" />
                        {isUpdating ? "Iniciando..." : "Iniciar Cita"}
                      </Button>
                    ) : appointment.lifeStatus === "EnCurso" &&
                      appointment.status === "Confirmado" && appointment.endDate > dayjs().hour().toString() ? (
                      <Button
                        className="bg-blue-600! border-none text-white!"
                        disabled={isSaving}
                        onClick={() =>
                          handleChangeLifeStatus(appointment.id, 2)
                        }
                      >
                        <BadgeCheck className="size-4" />
                        {isUpdating ? "Finalizando..." : "Finalizar"}
                      </Button>
                    ) : appointment.status === "Confirmado" ? (
                      <Button
                        className="bg-blue! border-none text-white!"
                        onClick={() =>
                          navigate(
                            "/odis/patients/patient-profile/" +
                            appointment.patient.id,
                          )
                        }
                      >
                        <CircleUser className="size-4" />
                        Perfil
                      </Button>
                    ) : (
                      <></>
                    )}

                    {hasPermission("Actualizar Cita") && (
                      <Button onClick={() => onClick(appointment.id)}>
                        <PencilLine className="size-4" />
                        Editar
                      </Button>
                    )}

                    {hasPermission("Eliminar Cita") && (
                      <Button
                        className="text-white! bg-red-500! dark:border-none w-14!"
                        onClick={() => setOpenModal(true)}
                      >
                        <Trash className="size-5" />
                        {/* Eliminar */}
                      </Button>
                    )}
                  </div>

                  <Modal
                    title="Eliminar cita"
                    desc="Está seguro que desea eliminar esta cita?"
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                  >
                    <div className="flex justify-between gap-3 [&>button]:bg-white [&>button]:text-black [&>button]:border-gray-200 [&>button]:rounded-md [&>button]:p-2 [&>button]:text-small [&>button]:font-semibold [&>button]:hover:bg-gray-200 [&>button]:border [&>button]:focus:bg-gray-100 mt-4">
                      <Button
                        className="text-small bg-white"
                        onClick={() => setOpenModal(false)}
                      >
                        Salir
                      </Button>
                      <Button
                        className="text-white! bg-red-500!"
                        disabled={isSaving}
                        onClick={() => onClickHandler(appointment.id)}
                      >
                        {isDeleting ? "Eliminando..." : "Confirmar"}
                      </Button>
                    </div>
                  </Modal>
                </section>
              );
            }) ?? (
              <div className="text-center text-gray-400 font-semibold">
                No hay citas para hoy
              </div>
            )}
        </div>
      </section>
    </div>
  );
}

export default TodayAppoinmentCard;
