import { useDelete, useGet } from "@hooks";
import {
  Clock3,
  FileText,
  Notebook,
  PencilLine,
  Trash,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { AppointmentTypes } from "types/AppointmentType";
import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import { de } from "zod/v4/locales";

type Props = {
  onClick: (appointmentId: string) => void;
};

function TodayAppoinmentCard({ onClick }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  const startDate = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs().format("YYYY-MM-DD");

  const { data } = useGet<AppointmentTypes[]>({
    key: "today-appointments",
    urlEndpoint: `Appointment/date?initialDate=${startDate}T00:00:01.013Z&finalDate=${endDate}T23:59:59.013Z`,
    message: "Error al obtener las citas de hoy",
  });

  const { deleteItem, isDeleting } = useDelete({
    url: `Appointment/${appointmentId}`,
    successMessage: "Cita eliminada con éxito",
    setOpenModal: setOpenModal,
  });

  const onClickHandler = (id: string) => {
    setAppointmentId(id);
    setOpenModal(true);
    deleteItem(id);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
  ];

  return (
    <div className="bg-white md:w-1/4 border border-gray-200 rounded-lg p-5 overflow-hidden">
      <h3 className="text-black font-bold text-subtitle flex items-center gap-2">
        <Clock3 className="text-gray-600" /> Citas de hoy
      </h3>
      <span className="text-small text-gray-400 font-semibold">
        {data?.length} Citas programadas
      </span>

      <div className="grid gap-5 mt-3 min-md-max-h-[68dvh] overflow-y-auto">
        {data
          ?.slice()
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          )

          .map((appointment, index) => {
            const color = statusColors.find(
              (s) => s.status.toLowerCase() === appointment.status.toLowerCase()
            );

            return (
              <section
                className="border border-gray-200 rounded-md p-3 grid"
                key={index}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-normal">
                    {dayjs(appointment.startDate).format("HH:mm")}
                  </span>
                  <span
                    className={`text-small font-semibold px-2 py-1 rounded-md ${color?.color} ${color?.textColor}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <ol className="[&>li]:flex [&>li]:gap-2 items-center text-small grid gap-2">
                  <li className="font-semibold">
                    <User strokeWidth={1.25} className="text-gray-600 size-5" />
                    {appointment.patient.patientPerson.name}
                  </li>
                  <li>
                    <FileText
                      strokeWidth={1.25}
                      className="text-gray-600 size-5"
                    />
                    {appointment.type.replaceAll("_", " ")}
                  </li>
                  <li>
                    <Notebook
                      strokeWidth={1.25}
                      className="text-gray-600 size-5"
                    />
                    {appointment.reason}
                  </li>
                </ol>

                <div className="flex justify-between gap-3 [&>button]:bg-white [&>button]:text-black [&>button]:border-gray-200 [&>button]:rounded-md [&>button]:p-2 [&>button]:text-small [&>button]:font-semibold [&>button]:hover:bg-gray-200 [&>button]:border [&>button]:focus:bg-gray-100 mt-4">
                  <Button onClick={() => onClick(appointment.id)}>
                    <PencilLine className="size-3 mr-2" />
                    Editar
                  </Button>
                  <Button
                    className="text-white! bg-red-500!"
                    onClick={() => setOpenModal(true)}
                  >
                    <Trash className="size-3 mr-2" />
                    Eliminar
                  </Button>
                </div>

                <Modal
                  title="Eliminar cita"
                  desc="Está seguro que desea eliminar esta cita?"
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                >
                  <div className="flex justify-between gap-3 [&>button]:bg-white [&>button]:text-black [&>button]:border-gray-200 [&>button]:rounded-md [&>button]:p-2 [&>button]:text-small [&>button]:font-semibold [&>button]:hover:bg-gray-200 [&>button]:border [&>button]:focus:bg-gray-100 mt-4">
                    <Button className="text-small bg-white">Salir</Button>
                    <Button
                      className="text-white! bg-red-500!"
                      onClick={() => onClickHandler(appointment.id)}
                    >
                      Confirmar
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
    </div>
  );
}

export default TodayAppoinmentCard;
