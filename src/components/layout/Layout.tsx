import { Sidebar, ToggleThemeButton } from "@components/ui";
import { useGet } from "@hooks";
import { decodeToken } from "@services";
import type { AppointmentTypes } from "@types";
import { getToken, Toast } from "@utils";
import dayjs from "dayjs";
import { PanelLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

function Layout() {
  const [open, setOpen] = useState<boolean>(
    localStorage.getItem("sidebar") === "true",
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("sidebar", open.toString());
  }, [open]);

  const tokenExp = decodeToken()?.exp;
  const tokenCookie = getToken();

  const expIn = tokenExp ? tokenExp * 1000 - Date.now() : 0;

  useEffect(() => {
    // console.log(expIn);
    if (expIn <= 0) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      location.reload();
      navigate("/");
    }
  }, [tokenCookie]);

  const startDate = dayjs().format("YYYY-MM-DD");
  const endDate = dayjs().format("YYYY-MM-DD");

  const { data } = useGet<AppointmentTypes[]>({
    key: "today-appointments",
    urlEndpoint: `Appointment/date?initialDate=${startDate} 00:00:01&finalDate=${endDate} 23:59:59`,
    message: "Error al obtener las citas de hoy",
  });

  // const warnedAppointments = new Set<string>();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const now = dayjs();

    data.forEach((appointment) => {
      const start = dayjs(appointment.startDate);

      const minutesDiff = start.diff(now, "minute");

      if (
        minutesDiff > 0 &&
        minutesDiff <= 15
        // && !warnedAppointments.has(appointment.id)
      ) {
        // warnedAppointments.add(appointment.id);

        Toast.info(
          `La cita con ${appointment.patient.patientPerson.name} inicia en ${minutesDiff} minutos`,
        );
      }
    });
  }, [data]);

  return (
    <div className="flex h-screen max-md:w-fit bg-background text-black dark:bg-dark dark:text-white">
      <Sidebar panelOpen={open} OnClick={() => setOpen((prev) => !prev)} />
      <div className="flex flex-col w-full min-h-screen flex-1">
        <div className="bg-white dark:bg-dark-tertiary flex justify-between items-center p-3 gap-2 border-b border-gray-200 dark:border-none">
          <button
            className="group hover:bg-gray-200 dark:hover:bg-dark-fourth size-fit p-1 rounded-lg"
            onClick={() => setOpen((prev) => !prev)}
          >
            <PanelLeft
              size={15}
              strokeWidth={1.75}
              className="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white"
            />
          </button>
          <div className="border-r border-gray-200 h-1/2"></div>
          <ToggleThemeButton />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
