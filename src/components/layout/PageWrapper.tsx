import { useTabStore } from "@store";
import { useEffect } from "react";

type PageWrapperProps = {
  tab: string;
  title: string;
  desc: string;
  extraComponent?: React.ReactNode;
  children: React.ReactNode;
};

export function PageWrapper({
  tab,
  children,
  title,
  desc,
  extraComponent,
}: PageWrapperProps) {
  const setPageTab = useTabStore((s) => s.setPageTab);

  useEffect(() => {
    setPageTab(tab);
  }, [tab, setPageTab]);

  return (
    <div className="p-3 max-h-screen">
      <section className="flex justify-between items-center">
        <div>
          <h2 className="text-title font-bold">{title}</h2>
          <span className="text-normal text-gray-500">{desc}</span>
        </div>
        <div>{extraComponent}</div>
      </section>
      {children}
    </div>
  );
}
