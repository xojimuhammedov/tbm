import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon } from "lucide-react";
import { RTTSIDocumentInterface } from "@/pages/rttsi/interfaces/rttsiDocument.interface.ts";
import RTTSIDocument from "@/pages/rttsi/components/RTTSIDocument.tsx";
import DocumentInfo from "@/shared/components/moleculas/documents/DocumentInfo.tsx";
import { useTranslation } from "react-i18next";

interface RTTSIDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: RTTSIDocumentInterface | null;
}

const RTTSIDocumentView = ({
  open,
  onOpenChange,
  document,
}: RTTSIDocumentViewProps) => {
  const { t } = useTranslation();
  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="8xl"
      className="overflow-auto"
      header={
        <div className="flex items-center gap-2">
          <FileTextIcon className="size-5" />
          <span>{document?.title || t("RTTSI document")}</span>
        </div>
      }
    >
      <div className="flex flex-1 flex-col xl:flex-row gap-4 overflow-hidden">
        <div
          className="
            flex-1 border rounded-lg p-2
            overflow-visible
            xl:overflow-y-auto
            xl:max-h-[80vh]
            scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
          "
        >
          <RTTSIDocument title={document?.title} document={document} />
        </div>

        <DocumentInfo
          docType={t("RTTSI")}
          onOpenChange={onOpenChange}
          document={document}
        />
      </div>
    </MyModal>
  );
};

export default RTTSIDocumentView;
