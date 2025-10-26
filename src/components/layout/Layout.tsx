import { Sidebar } from "@components/ui";
import { decodeToken } from "@services";
import { PanelLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

function Layout() {
  const [open, setOpen] = useState<boolean>(true);

  const token = decodeToken();
  const expIn = token?.exp ? token.exp * 1000 - Date.now() : 0;
  document.cookie = `token=; path=/; max-age=${Math.floor(
    expIn / 1000
  )}; Secure; SameSite=Strict`;

  useEffect(() => {
    if (token) {
      document.cookie = `token=${token}; path=/; max-age=${Math.floor(
        expIn / 1000
      )}; Secure; SameSite=Strict`;
    }
  }, [expIn]);

  return (
    <div className="flex h-screen">
      <Sidebar panelOpen={open} />
      <div className="flex flex-col w-full h-screen">
        <div className="bg-white flex items-center p-3 gap-2">
          <button
            className="group hover:bg-gray-200 size-fit p-1 rounded-lg"
            onClick={() => setOpen(!open)}
          >
            <PanelLeft
              size={15}
              strokeWidth={1.75}
              className="text-gray-600 group-hover:text-black"
            />
          </button>
          <div className="border-r border-gray-200 h-1/2"></div>
        </div>
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
