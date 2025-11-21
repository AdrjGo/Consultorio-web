type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  extraComponent?: React.ReactNode;
};

function SectionLayout({
  children,
  title,
  description,
  extraComponent,
}: Props) {
  return (
    <section className="bg-white border border-gray-300 rounded-md p-5 grid gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-subtitle font-bold">{title}</h2>
          <p className="text-small text-gray-500">{description}</p>
        </div>
        <div>{extraComponent}</div>
      </div>
      {children}
    </section>
  );
}

export default SectionLayout;
