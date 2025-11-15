import Button from "@components/ui/Button";
import { CustomTabs } from "@components/ui/form/CustomTabs";
import type { PatientFormValues } from "@schemas";
import { Save } from "lucide-react";
import React from "react";
import type { UseFormHandleSubmit } from "react-hook-form";

type Tab = {
  label: string;
  content: React.ReactNode;
  value: number;
};

type PatientFormProps = {
  handleSubmit: UseFormHandleSubmit<PatientFormValues>;
  onSubmit: (data: PatientFormValues) => void;
  formKey?: string;
  tabs: Tab[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  responsible: boolean | undefined;
  setResponsible: React.Dispatch<React.SetStateAction<boolean>>;
};

function PatientForm({
  handleSubmit,
  onSubmit,
  tabs,
  activeTab,
  setActiveTab,
  formKey,
  responsible,
  setResponsible,
}: PatientFormProps) {

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} key={formKey}>
        <CustomTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
        {activeTab === tabs[tabs.length - 1].value && (
          <Button
            type="submit"
            className={`text-small text-white! px-5 ${activeTab == 3 ? "w-full!" : ""
              }`}
          >
            <Save className="size-4" />
            Guardar
          </Button>
        )}
      </form>
      {activeTab === 1 && (
        <div className="flex gap-2 my-2">
          <input
            type="checkbox"
            id="responsible"
            checked={responsible}
            onChange={() => setResponsible(!responsible)}
          />
          <label htmlFor="responsible" className="text-small">
            El paciente es menor de edad
          </label>
        </div>
      )}
    </>
  );
}

export const PatientFormMemo = React.memo(PatientForm);

