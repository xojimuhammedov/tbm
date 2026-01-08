import { ApplicationDocumentInterface } from "@/pages/rtsi/application/interfaces/applicationDocument.interface.ts";
import { useTranslation } from "react-i18next";

interface ApplicationDocumentProps {
  title?: string;
  document?: Partial<ApplicationDocumentInterface> | null;
}

const ApplicationDocument = ({ title, document }: ApplicationDocumentProps) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg shadow-sm border p-6 space-y-3">
      <div className="flex items-center justify-end">
        <div className="text-sm">{title}</div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-1">{t("TALABNOMA")}</h2>
        <p className="text-body-md-semi-bold">
          {t("Rejadan tashqari taʼmirlash sozlash ishlarini o‘tkazish")}
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <div className="min-w-48">1. {t("Ish bajarish tartibi")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.workProcedure || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">2. {t("Sana va vaqt")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.workDateTime || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">3. {t("Stansiya / oraliq")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.station || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">4. {t("NO raqami")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.noNumber || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">5. {t("AI-7, 9 kanallari")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.aiChannels || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">6. {t("Ishni bajarish sababi")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.workReason || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">
            7. {t("Bajarilayotgan ishlar xususiyati")}:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.workDescription || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">8. {t("KO xolati")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.koStatus || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">9. {t("AAG")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.bypassSchedule || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">
            10. {t("Zaxiralashning boshqa yo‘llari")}:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.alternativeBackup || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">11. {t("Boshqaruvchi")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.responsiblePerson || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">12. {t("Kelishildi")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.approvedByTechnicalDirector || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">13. {t("Kelishildi")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.approvedByLocalAI || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">14. {t("Talabnoma tuzuvchi (AP)")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.orderAP || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">15. {t("Talabnoma tuzuvchi (UBP)")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.orderMBB || "\u00A0"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDocument;
