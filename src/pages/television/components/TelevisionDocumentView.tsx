import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon } from "lucide-react";
import { TelevisionDocumentInterface } from "@/pages/television/interfaces/televisionDocument.interface.ts";
import TelevisionDocument from "@/pages/television/components/TelevisionDocument.tsx";
import DocumentInfo from "@/shared/components/moleculas/documents/DocumentInfo.tsx";
import { useTranslation } from "react-i18next";

interface TelevisionDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: TelevisionDocumentInterface | null;
}

const TelevisionDocumentView = ({
  open,
  onOpenChange,
  document,
}: TelevisionDocumentViewProps) => {
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
          <span>{document?.title || t("Television document")}</span>
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
          <TelevisionDocument title={document?.title} document={document} />
        </div>

        <DocumentInfo
          docType={t("Television")}
          onOpenChange={onOpenChange}
          document={document}
        />
      </div>
    </MyModal>
  );
};

export default TelevisionDocumentView;
