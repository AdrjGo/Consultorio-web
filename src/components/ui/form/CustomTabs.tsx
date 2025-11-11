interface Tab {
  label: string;
  content: React.ReactNode;
  value: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function CustomTabs({
  tabs,
  activeTab,
  setActiveTab,
}: TabsProps) {
  return (
    <section>
      {/* Tabs headers */}
      <div className="bg-[#F1F5F9] rounded-md flex justify-around mb-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`text-small font-bold flex-1 py-2 m-1 text-gray-600 ${
              activeTab === tab.value ? "bg-white rounded-md text-black!" : ""
            }`}
            onClick={() => setActiveTab(tab.value ?? "1")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      <div className="bg-white rounded-md">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </section>
  );
}
