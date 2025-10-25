import { Sidebar } from "@components/ui";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-screen">
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
