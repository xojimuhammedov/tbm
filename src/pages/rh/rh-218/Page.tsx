import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import PdfViewer from "@/components/ui/pdfViewer.tsx";
import { PageWrapper } from "@/shared/components/containers/page";

const Rh_218_Page = () => {
  const { t } = useTranslation();

  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("RH 218"),
        path: "/rh-218",
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
          style={{ height: "calc(100vh - 150px)" }}
        >
          <PdfViewer file="/file/rh-218.pdf" />
        </div>
      </PageWrapper>
    </>
  );
};

export default Rh_218_Page;
