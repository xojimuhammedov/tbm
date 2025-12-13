import { CircleCheck, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import MyAccordion from "@/shared/components/moleculas/accordion/MyAccordion.tsx";
import { Button } from "dgz-ui/button";
import { RTTSIDocumentInterface } from "@/pages/rttsi/interfaces/rttsiDocument.interface.ts";
import { F56DocumentInterface } from "@/pages/rtsi/f-56/interfaces/f56Document.interface.ts";
import { F51DocumentInterface } from "@/pages/rtsi/f-51/interfaces/f51Document.interface.ts";
import { OperativeDocumentInterface } from "@/pages/operative/interfaces/operativeDocument.interface.ts";
import { TelevisionDocumentInterface } from "@/pages/television/interfaces/televisionDocument.interface.ts";

interface DocumentInfoProps {
  docType: string;
  onOpenChange: (open: boolean) => void;
  document?:
    | RTTSIDocumentInterface
    | F56DocumentInterface
    | F51DocumentInterface
    | OperativeDocumentInterface
    | TelevisionDocumentInterface
    | null;
}

const InboxDocumentInfo = ({
  docType,
  onOpenChange,
  document,
}: DocumentInfoProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="
            w-full xl:w-1/2 flex flex-col border rounded-lg
            xl:max-h-[80vh]
          "
    >
      <div
        className="
              flex-1 overflow-y-auto p-4 space-y-4
              scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
            "
      >
        <div>
          <span className="font-medium text-base">{t("Ariza haqida")}</span>
          <div className="border rounded-lg p-4 space-y-2 mt-2">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs mb-1">{t("Ariza yuboruvchi")}</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center">
                    <User className="size-5" />
                  </div>
                  <span className="text-sm font-medium">
                    {document?.creatorId.first_name}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs mb-1">{t("Yuborilgan vaqt")}</div>
                <div className="text-sm">
                  {dateFormatter(document?.created_at, DATE_TIME)}
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs mb-1">{t("Hujjat turi")}</div>
              <div className="text-sm font-medium">{docType}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="font-medium text-base">
            {t("Hujjat yuborilish tarixi")}
          </div>
          {document?.recipientIds.map((person) => (
            <div key={person._id} className="border rounded-lg p-2 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <CircleCheck className="size-7 text-white" fill="green" />
                  <span>{t("Hujjat yuborildi")}</span>
                </div>
                <span className="text-body-sm-medium text-secondary">
                  {dateFormatter(document?.created_at, DATE_TIME)}
                </span>
              </div>
              <MyAccordion
                title={
                  <div className="flex justify-between w-full cursor-pointer px-3">
                    <div>
                      {person.first_name} {person.second_name}
                    </div>
                    <div>Izoh</div>
                  </div>
                }
              >
                <div className="space-y-1 text-sm text-gray-700 px-4 py-2">
                  {document?.description}
                </div>
              </MyAccordion>
            </div>
          ))}
        </div>
      </div>

      {/* Har doim pastda turadigan tugmalar */}
      <div className="border-t sticky bottom-0 p-3 flex justify-between">
        <Button className="bg-secondary" onClick={() => onOpenChange(false)}>
          {t("Yopish")}
        </Button>
        <div className="flex gap-2">
          <Button variant="destructive">{t("Rad etish")}</Button>
          <Button variant="default">{t("Qabul qilish")}</Button>
        </div>
      </div>
    </div>
  );
};

export default InboxDocumentInfo;
