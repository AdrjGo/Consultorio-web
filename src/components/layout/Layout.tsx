import { Sidebar } from "@components/ui";
import { decodeToken } from "@services";
import { getToken } from "@utils";
import { PanelLeft } from "lucide-react";
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
    // console.log(expIn);
    if (expIn <= 0) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      location.reload();
      navigate("/");
    }
  }, [tokenCookie]);

  return (
    <div className="flex h-screen">
      <Sidebar panelOpen={open} />
      <div className="flex flex-col w-full h-screen">
        <div className="bg-white flex items-center p-3 gap-2 border-b border-gray-200">
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
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
