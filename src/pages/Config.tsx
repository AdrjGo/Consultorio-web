import { PageWrapper } from "@components/layout/PageWrapper";
import { CustomTabs, DentalOffice, RolePermission } from "@components/ui";
import { Clock, FileText, Settings, UsersRound } from "lucide-react";
import { useSearchParams } from "react-router";

function Config({ tab }: { tab: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = Number(searchParams.get("tab") || "1");

  const handleTabChange = (newTab: number) => {
    setSearchParams({ tab: String(newTab) });
  };

  return (
    <PageWrapper
      title="Configuración del Sistema"
      desc="Personaliza y administra la configuración del consultorio"
      tab={tab}
    >
      <CustomTabs
        activeTab={tabFromUrl}
        setActiveTab={handleTabChange}
        classNameContent="bg-transparent!"
        tabs={[
          {
            value: 1,
            label: (
              <>
                <Settings size={17} /> Consultorio
              </>
            ),
            content: <DentalOffice />,
          },
          {
            value: 2,
            label: (
              <>
                <FileText size={17} /> Formularios
              </>
            ),
            content: <div>Configuración de Usuarios</div>,
          },
          {
            value: 3,
            label: (
              <>
                <Clock size={17} /> Horarios
              </>
            ),
            content: <div>Configuración de Roles</div>,
          },
          {
            value: 4,
            label: (
              <>
                <UsersRound size={17} /> Roles y Permisos
              </>
            ),
            content: <RolePermission />,
          },
        ]}
      />
    </PageWrapper>
  );
}

export default Config;
