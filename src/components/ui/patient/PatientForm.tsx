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
};

function PatientForm({
  handleSubmit,
  onSubmit,
  tabs,
  activeTab,
  setActiveTab,
  formKey,
}: PatientFormProps) {

  return (
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
          <Save className="size-4 mr-2" />
          Guardar
        </Button>
      )}
    </form>
  );
}

export const PatientFormMemo = React.memo(PatientForm);

