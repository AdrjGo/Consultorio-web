import { PageWrapper } from "@components/layout/PageWrapper";

function Patients({ title }: { title: string }) {
  return (
    <PageWrapper title={title}>
      <div>Patients</div>
    </PageWrapper>
  );
}

export default Patients;
