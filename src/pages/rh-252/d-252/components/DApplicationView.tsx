import { MyModal } from "@/shared/components/moleculas/modal";
import { F51DocumentInterface } from "@/pages/rtsi/f-51/interfaces/f51Document.interface.ts";
import { FileTextIcon } from "lucide-react";
import DocumentInfo from "@/shared/components/moleculas/documents/DocumentInfo.tsx";
import F51Document from "@/pages/rtsi/f-51/components/F51Document.tsx";
import { useTranslation } from "react-i18next";

interface F51DocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: F51DocumentInterface;
}

const DApplicationView = ({
  open,
  onOpenChange,
  document,
}: F51DocumentViewProps) => {
  const { t } = useTranslation();
  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="8xl"
      className="overflow-auto"
      header={
        <div className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          <span>{"F-51 document"}</span>
        </div>
      }
    >
      <div className="flex flex-1 flex-col xl:flex-row gap-4 overflow-hidden">
        <div
          className="
            flex-4/5 border rounded-lg p-2
            overflow-visible
            xl:overflow-y-auto
            xl:max-h-[80vh]
            scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
          "
        >
          <F51Document document={document} />
        </div>

        <DocumentInfo
          docType={t("F51")}
          onOpenChange={onOpenChange}
          document={document}
        />
      </div>
    </MyModal>
  );
};

export default DApplicationView;
