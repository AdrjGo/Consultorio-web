import { PageWrapper } from "@components/layout/PageWrapper";
import {
  CustomTabs,
  DentalOffice,
  DynamicForm,
  RolePermission,
} from "@components/ui";
import { hasPermission } from "@utils";
import { Clock, FileText, Settings, UsersRound } from "lucide-react";
import { useSearchParams } from "react-router";

function Config({ tab }: { tab: string }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = Number(searchParams.get("tab") || "1");

  const handleTabChange = (newTab: number) => {
    setSearchParams({ tab: String(newTab) });
  };

  const tabs = [
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
      content: <DynamicForm />,
    },
    // {
    //   value: 3,
    //   label: (
    //     <>
    //       <Clock size={17} /> Horarios
    //     </>
    //   ),
    //   content: <div>Configuración de Roles</div>,
    // },
    {
      value: 3,
      label: (
        <>
          <UsersRound size={17} /> Roles y Permisos
        </>
      ),
      content: <RolePermission />,
    },
  ];

  const visibleTabs = tabs.filter(
    (tab) =>
      tab.value === 1 ||
      (tab.value === 2 && hasPermission("Leer Formularios Dinámicos")) ||
      (tab.value === 3 && hasPermission("Leer Roles")),
  );

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
        tabs={visibleTabs}
      />
    </PageWrapper>
  );
}

export default Config;
