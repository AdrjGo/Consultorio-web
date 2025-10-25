import { PageWrapper } from "@components/layout/PageWrapper";
import { Sidebar } from "@components/ui";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-screen">
        <div className="flex-1 flex flex-col">
          <PageWrapper title="OdontoDIS">
            <Outlet />
          </PageWrapper>
        </div>
      </div>
    </div>
  );
}

export default Layout;
