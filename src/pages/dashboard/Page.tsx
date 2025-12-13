import { PageWrapper } from "@/shared/components/containers/page";
import { PageHeader } from "@/shared/components/templates/title";
import { DateRangeFilter } from "@/shared/components/templates/filters";
import { DASHBOARD_QUERY_KEY } from "@/pages/dashboard/constants/dashboard.constants.ts";
import { DATE } from "@/shared/constants/date.constants.ts";

const Page = () => {
  return (
    <>
      <PageHeader>
        <DateRangeFilter dateKey={DASHBOARD_QUERY_KEY} format={DATE} />
      </PageHeader>
      <PageWrapper className={"gap-4"}></PageWrapper>
    </>
  );
};

export default Page;
