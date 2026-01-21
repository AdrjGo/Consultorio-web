import { Ellipsis } from "lucide-react";

import { Icons } from "../../Icons/Icons";
import SideButton from "./SideButton";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useGet, useGetUser } from "@hooks";
import { useTabStore } from "@store";
import { SideTabsAdmin, SideTabsManagement } from "@constants";
import type { clinicType } from "@types";
import { isMobile } from "@utils";

function Sidebar({
  panelOpen,
  OnClick,
}: {
  panelOpen: boolean;
  OnClick?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    // alert("Se ha cerrado la sesión");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (!document.cookie.includes("token")) {
      navigate("/");
      window.location.reload();
    }
  };

  const { data } = useGetUser();

  const pagetab = useTabStore((state) => state.pageTab);

  const { data: clinic } = useGet<clinicType>({
    key: "clinic",
    urlEndpoint: "Clinic",
    message: "Error al obtener datos de usuario",
  });

  return (
    <nav
      className={`flex flex-col bg-white dark:bg-dark-secondary md:max-w-64 h-screen border-r dark:border-none border-gray-200 transition-all duration-400 ease-in-out
    ${
      panelOpen
        ? "md:w-full w-72 p-3 opacity-100"
        : "w-0 p-0 opacity-0 overflow-hidden"
    }`}
    >
      <section className="flex items-center w-full top-0 h-14 gap-1.5 ">
        {!import.meta.env.VITE_LOGO_SYS_URL ? (
          <Icons.Logo className="size-14" />
        ) : (
          <Icons.LogoUser className="size-14" />
        )}
        <div className="text-sm/6">
          <h2 className="text-body font-bold">{clinic?.name ?? "OdontoDIS"}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">{pagetab}</p>
        </div>
      </section>

      <div className="border-b dark:border-none border-gray-200 mb-4 mt-3"></div>

      <section className="flex flex-col flex-1 gap-5">
        <div className="grid">
          <h3 className="text-tiny font-bold text-gray-500">Gestión Clínica</h3>
          <div className="flex flex-col gap-1 my-1">
            {SideTabsManagement.map((tab, index) => (
              <SideButton
                key={index}
                icon={tab.icon}
                text={tab.text}
                to={tab.to}
                OnClick={!isMobile ? () => {} : OnClick}
              />
            ))}
          </div>
        </div>

        <div className="grid">
          <h3 className="text-tiny font-bold text-gray-500">Administración</h3>
          <div className="flex flex-col gap-1 my-1">
            {SideTabsAdmin.map((tab, index) => (
              <SideButton
                key={index}
                icon={tab.icon}
                text={tab.text}
                to={tab.to}
                OnClick={!isMobile ? () => {} : OnClick}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="border-b dark:border-none border-gray-200 mb-3 mt-3"></div>

      <section className="flex justify-between items-center">
        <div>
          <h3 className="text-small font-bold text-gray-500 dark:text-white">
            {data?.person.name} {data?.person.lastName}
          </h3>
          <p className="text-small text-gray-500 dark:text-white">
            {data?.person.profession}
          </p>
        </div>

        <div className="relative">
          <button onClick={() => setOpen(!open)}>
            <Ellipsis size={20} className="text-gray-500 dark:text-gray-300" />
          </button>

          {open && (
            <div className="absolute left-3 bottom-8 mt-2 w-36 bg-white dark:bg-dark-fourth border dark:border-none border-gray-200 rounded shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-tertiary"
                onClick={() => navigate("/odis/settings")}
              >
                Configuración
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-dark-tertiary"
                onClick={logout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </section>
    </nav>
  );
}

export default Sidebar;
