import { PageWrapper } from "@components/layout/PageWrapper";

function Patients({ tab }: { tab: string }) {
  return (
    <PageWrapper tab={tab}>
      <div>Patients</div>
    </PageWrapper>
  );
}

export default Patients;
