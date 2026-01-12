import { Sidebar } from "@components/ui";
import { decodeToken } from "@services";
import { useThemeStore } from "@store";
import { getToken } from "@utils";
import { Moon, PanelLeft, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

function Layout() {
  const [open, setOpen] = useState<boolean>(
    localStorage.getItem("sidebar") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("sidebar", open.toString());
  }, [open]);

  const tokenExp = decodeToken()?.exp;
  const tokenCookie = getToken();

  const expIn = tokenExp ? tokenExp * 1000 - Date.now() : 0;

  useEffect(() => {
    console.log(expIn);
    if (expIn <= 0) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      location.reload();
      navigate("/");
    }
  }, [tokenCookie]);

  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex h-screen max-md:w-fit bg-background text-black dark:text-white dark:bg-background-dark">
      <Sidebar panelOpen={open} />
      <div className="flex flex-col w-full min-h-screen flex-1">
        <div className="bg-white flex justify-between items-center p-3 gap-2 border-b border-gray-200">
          <button
            className="group hover:bg-gray-200 size-fit p-1 rounded-lg"
            onClick={() => setOpen((prev) => !prev)}
          >
            <PanelLeft
              size={15}
              strokeWidth={1.75}
              className="text-gray-600 group-hover:text-black"
            />
          </button>
          <div className="border-r border-gray-200 h-1/2"></div>
          <button onClick={toggleTheme} className="p-1 rounded-lg">
            {theme === "light" ? (
              <Sun size={18} className="text-gray-700" />
            ) : (
              <Moon size={18} className="text-gray-300" />
            )}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
