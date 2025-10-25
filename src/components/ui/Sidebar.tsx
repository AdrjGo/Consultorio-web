import { Ellipsis } from "lucide-react";
import { SideTabsManagement, SideTabsAdmin } from "../../constants";
import { Icons } from "../Icons/Icons";
import SideButton from "./SideButton";
import { useState } from "react";
import { useNavigate } from "react-router";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    navigate("/");
  };

  return (
    <nav className="flex flex-col bg-white min-w-14 max-w-64 h-screen w-full p-3">
      <section className="flex items-center w-full top-0 h-14 gap-1.5 ">
        <Icons.Logo className="size-14" />
        <div className="text-sm/6">
          <h2 className="text-body font-bold">OdontoDIS</h2>
          <p className="text-sm text-gray-500">Calendario</p>
        </div>
      </section>

      <div className="border-b border-gray-200 mb-4 mt-3"></div>

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
              />
            ))}
          </div>
        </div>
      </section>

      <div className="border-b border-gray-200 mb-3 mt-3"></div>

      <section className="flex justify-between items-center">
        <div>
          <h3 className="text-small font-bold text-gray-500">Dr. De prueba</h3>
          <p className="text-small text-gray-500">Especialidad</p>
        </div>

        <div className="relative">
          <button onClick={() => setOpen(!open)}>
            <Ellipsis size={20} className="text-gray-500" />
          </button>

          {open && (
            <div className="absolute left-3 bottom-8 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-50">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => navigate("/odis/settings")}>
                Configuración
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
