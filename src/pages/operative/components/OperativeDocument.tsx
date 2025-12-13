import { OperativeDocumentInterface } from "@/pages/operative/interfaces/operativeDocument.interface.ts";
import { Trans } from "react-i18next";

interface OperativeDocumentProps {
  title?: string;
  document?: Partial<OperativeDocumentInterface> | null;
}

const OperativeDocument = ({ title, document }: OperativeDocumentProps) => {
  return (
    <div className="rounded-lg shadow-sm border p-6 space-y-3">
      <div className="flex items-center justify-end">
        <div className="text-sm">{title}</div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold mb-1">D ilova</h2>
        <p className="text-gray-400 mb-3">(Majburiy)</p>
        <p className="text-sm">
          <Trans
            i18nKey="Tezkor o'rtacha-sozlash ishlarini o'tkazish uchun <br /> talabnomaning shakli"
            components={{ br: <br /> }}
          />
        </p>
      </div>

      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-4 mb-3">
          <div className="">
            <div className="inline-block min-w-24 border-b text-sm px-2 py-1">
              {document?.UbpNumber || ""}
            </div>
          </div>
          <div className="mt-1 text-sm">UBPdan</div>
        </div>
        <div className="mb-2 text-sm">
          tezkor ta’mirlash-sozlash ishlarini o’tkazish uchun
        </div>
        <div className="flex justify-center items-center gap-4 mb-3">
          <div className="inline-block min-w-24 border-b text-sm px-2 py-1">
            {document?.applicationNumber || ""}
          </div>
          <div className="mt-1 text-sm">- son TALABNOMA</div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <div className="min-w-48">1. Ishlarni o'tkazish shartlari:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.workConditions || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">2. Sana va vaqt:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.date || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">3. Uchastka, stansiyalar:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.magistralName || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">4. NO nomeri:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.NoNumber || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">5. Al-9 kanallari:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.ai9Channels || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">6. Ishni bajarish sababi:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.reasonJob || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">7. Bajarilayotgan ishlar xususiyati:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.jobDescription || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">8. NO holati:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.NOStatus || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">9. AAG:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.aag || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">10. Rezervlashning boshqa usuli:</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.reservation || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">
            11. Ishlarni o’tkazish uchun javobgar shaxs:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.responsiblePerson || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">
            12. “O’zbekiston” AK ekspluatasiya qiluvchi korxona texnik rahbari:
          </div>
          <div className="flex-1 border-b text-gray-900">
            {document?.headOfTheEnterprise || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">13. AI-9 F.I.Sh. (Joylarda):</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.aiFullName || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">14. Talabnoma tuzuvchi (AP):</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.applicantAP || "\u00A0"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="min-w-48">15. Talabnoma tuzuvchi (UBP):</div>
          <div className="flex-1 border-b text-gray-900">
            {document?.applicantUBP || "\u00A0"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperativeDocument;
