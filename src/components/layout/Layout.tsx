import { Sidebar, ToggleThemeButton } from "@components/ui";
import { decodeToken } from "@services";
import { getToken } from "@utils";
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
    console.log(expIn);
    if (expIn <= 0) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      location.reload();
      navigate("/");
    }
  }, [tokenCookie]);

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
