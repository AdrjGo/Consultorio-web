import React from "react";
import { twMerge } from "tailwind-merge";

interface Tab {
  label: string | React.ReactNode;
  content: React.ReactNode;
  value: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>> | any;
  classNameContent?: string;
}

function CustomTab({
  tabs,
  activeTab,
  setActiveTab,
  classNameContent,
}: TabsProps) {
  return (
    <section>
      {/* Tabs headers */}
      <div className="bg-[#e7e8e9] dark:bg-dark-tertiary rounded-md flex justify-around mb-4 max-md:overflow-x-auto ">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`text-small font-bold flex items-center justify-center gap-1 flex-1 py-2 max-md:px-2 m-1 text-nowrap text-gray-500 dark:text-gray-400 ${
              activeTab === tab.value
                ? "bg-white dark:bg-dark-fourth rounded-md text-black! dark:text-white!"
                : ""
            }`}
            onClick={() => setActiveTab(tab.value ?? "1")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div
        className={twMerge(
          classNameContent,
          "bg-white dark:bg-transparent rounded-md",
        )}
      >
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </section>
  );
}

export const CustomTabs = React.memo(CustomTab);
