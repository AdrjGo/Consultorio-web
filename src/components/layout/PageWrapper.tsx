import { useTitleStore } from "@store";
import { useEffect } from "react";

type PageWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export function PageWrapper({ title, children }: PageWrapperProps) {
  const setPageTitle = useTitleStore((s) => s.setPageTitle);

  useEffect(() => {
    setPageTitle(title);
  }, [title, setPageTitle]);

  return <>{children}</>;
}
