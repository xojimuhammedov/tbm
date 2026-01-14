import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import PdfViewer from "@/components/ui/pdfViewer.tsx";
import { PageWrapper } from "@/shared/components/containers/page";

const Rh_226_2_Page = () => {
  const { t } = useTranslation();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
      () => [
        {
          name: t("RH 226-2"),
          path: "/rh-226-2",
          isActive: true,
        },
      ],
      [t],
  );

  return (
      <>
        <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
        <PageWrapper>
          <div
              className="pdf-viewer-container"
              style={{ height: 'calc(100vh - 150px)' }}
          >
            <PdfViewer file="/file/rh-226-2.pdf" />
          </div>
        </PageWrapper>
      </>
  );
};

export default Rh_226_2_Page;