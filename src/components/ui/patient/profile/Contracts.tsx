import { SectionLayout } from "@components/layout";
import { AccordionCard } from "@components/ui/patient/AccordionCard";
import { useGet, useModal } from "@hooks";
import type { FullContractType } from "@types";
import { useParams } from "react-router";
import { useQueries } from "@tanstack/react-query";
import { getData } from "@services";
import { TableMemo } from "@components/ui/table/Table";
import Button from "@components/ui/Button";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";
import ContractModal from "@components/ui/config/Contract/ContractModal";

function Contracts() {
  const modalForm = useModal();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [view, setView] = useState<boolean>(false);

  const CONTRACT_TABS = [
    {
      key: "ortodoncia",
      title: "Tratamiento de Ortodoncia",
      subtitle: "Contrato de brackets y alineadores",
      submoduleId: 4,
    },
    {
      key: "ortopedia",
      title: "Tratamiento de Ortopedia",
      subtitle: "Contrato de ortopedia maxilofacial",
      submoduleId: 5,
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      key: "miofuncional",
      title: "Tratamiento Miofuncional",
      subtitle: "Contrato de terapia miofuncional",
      submoduleId: 6,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
  ];

  const { id: patientId } = useParams<{ id: string }>();

  const formsQueries = useQueries({
    queries: CONTRACT_TABS.map((c) => ({
      queryKey: ["form", c.submoduleId, patientId],
      queryFn: async () =>
        getData({
          url: `Form/submodule/${c.submoduleId}/${patientId}`,
        }),
      enabled: Boolean(patientId),
    })),
  });

  const { data } = useGet<FullContractType>({
    key: ["contract", patientId ? patientId : ""],
    urlEndpoint: `Contract/${patientId}`,
    message: "Error al obtener datos de contrato",
    enabled: Boolean(patientId),
  });

  const contractData: FullContractType[] = [];
  if (data) contractData.push(data);

  return (
    <SectionLayout
      title="Gestión de contratos"
      description="Contratos de tratamientos especializados del paciente"
    >
      <div className="grid gap-4">
        {CONTRACT_TABS.map((contract, index) => {
          const form = formsQueries[index].data as any;

          const contractForTab = contractData.filter(
            (c) => c.contract.submodID === contract.submoduleId,
          );
          const hasContract = contractForTab.length > 0;

          return (
            <AccordionCard
              key={contract.key}
              title={contract.title}
              subtitle={contract.subtitle}
              count={form?.jsonSchema ? 1 : 0}
              color={contract.color}
              textColor={contract.textColor}
            >
              <Button
                className="text-small text-white! px-5 my-3 bg-green"
                onClick={() => {
                  setSelectedIndex(index);
                  modalForm.open();
                  setView(hasContract);
                }}
              >
                {hasContract ? (
                  <Eye className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}
                {hasContract ? "Ver Contrato" : "Crear Contrato"}
              </Button>

              <TableMemo
                handleEdit={() => {}}
                columns={[
                  {
                    key: "date",
                    label: "Fecha de Contrato",
                    render: (contract: FullContractType) =>
                      contract.contract.date,
                  },
                  {
                    key: "cost",
                    label: "Costo Total",
                    render: (contract: FullContractType) =>
                      contract.contract.totalCost,
                  },
                  {
                    key: "months",
                    label: "Meses de Tratamiento",
                    render: (contract: FullContractType) =>
                      contract.contract.monthsDuration,
                  },
                  {
                    key: "payer",
                    label: "Responsable de Pagos",
                    render: (contract: FullContractType) =>
                      contract.paymentManagerName,
                  },
                ]}
                data={contractForTab || []}
              />
            </AccordionCard>
          );
        })}
      </div>

      {modalForm.isOpen && (
        <ContractModal
          modalForm={modalForm}
          contractTabs={CONTRACT_TABS}
          formsQueries={formsQueries}
          selectedIndex={selectedIndex}
          view={view}
        />
      )}
    </SectionLayout>
  );
}

export default Contracts;
