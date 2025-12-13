import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon } from "lucide-react";
import { ApplicationDocumentInterface } from "@/pages/rtsi/application/interfaces/applicationDocument.interface.ts";
import ApplicationDocument from "@/pages/rtsi/application/components/ApplicationDocument.tsx";
import DocumentInfo from "@/shared/components/moleculas/documents/DocumentInfo.tsx";
import { useTranslation } from "react-i18next";

interface ApplicationDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: ApplicationDocumentInterface | null;
}

const ApplicationDocumentView = ({
  open,
  onOpenChange,
  document,
}: ApplicationDocumentViewProps) => {
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
          <span>{document?.title || "Application document"}</span>
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
          <ApplicationDocument title={document?.title} document={document} />
        </div>

        <DocumentInfo
          docType={t("Application")}
          onOpenChange={onOpenChange}
          document={document}
        />
      </div>
    </MyModal>
  );
};

export default ApplicationDocumentView;
