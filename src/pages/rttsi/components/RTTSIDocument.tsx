import { RTTSIDocumentInterface } from "@/pages/rttsi/interfaces/rttsiDocument.interface.ts";
import { useTranslation } from "react-i18next";

interface RTTSIDocumentProps {
  title?: string;
  document?: Partial<RTTSIDocumentInterface> | null;
}

const RTTSIDocument = ({ title, document }: RTTSIDocumentProps) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg shadow-sm border p-6 space-y-3">
      <div className="flex items-center justify-end">
        <div className="text-sm text-gray-500">{title}</div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-1">D ilova</h2>
        <p className="text-gray-300 mb-3">{t("(Majburiy)")}</p>
        <p className="text-sm">
          {t(
            "Rejadan tashqari o'rtacha-sozlash ishlarini o'tkazish uchun <br /> talabnomaning shakli",
          )}
        </p>
      </div>

      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-4 mb-3">
          <div className="">
            <div className="inline-block min-w-24 border-b text-sm px-2 py-1">
              {document?.UbpNumber || ""}
            </div>
          </div>
          <div className="mt-1 text-sm">{t("UBPdan")}</div>
        </div>
        <div className="mb-2 text-sm">
          {t("rejadan tashqari ta’mirlash-sozlash ishlarini o’tkazish uchun")}
        </div>
        <div className="flex justify-center items-center gap-4 mb-3">
          <div className="inline-block min-w-24 border-b text-sm px-2 py-1">
            {document?.applicationNumber || ""}
          </div>
          <div className="mt-1 text-sm">- {t("son TALABNOMA")}</div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <div className="min-w-48">
            1. {t("Ishlarni o'tkazish shartlari")}:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.workConditions || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">2. {t("Sana va vaqt")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.date || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">3. {t("Uchastka, stansiyalar")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.magistralName || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">4. {t("NO nomeri")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.NoNumber || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">5. {t("Al-9 kanallari")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.ai9Channels || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">6. {t("Ishni bajarish sababi")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.reasonJob || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">
            7. {t("Bajarilayotgan ishlar xususiyati")}:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.jobDescription || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">8. {t("NO holati")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.NOStatus || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">9. {t("AAG")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.aag || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">
            10. {t("Rezervlashning boshqa usuli")}:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.reservation || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">
            11. {t("Ishlarni o’tkazish uchun javobgar shaxs")}:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.responsiblePerson || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">
            12.{" "}
            {"“O’zbekiston” AK ekspluatasiya qiluvchi korxona texnik rahbari"}:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.headOfTheEnterprise || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">13. {t("AI-9 F.I.Sh. (Joylarda)")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.aiFullName || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">14. {t("Talabnoma tuzuvchi (AP)")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.applicantAP || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">15. {t("Talabnoma tuzuvchi (UBP)")}:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.applicantUBP || "\u00A0"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RTTSIDocument;
