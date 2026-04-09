import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TalabnomaInterface } from "../interfaces/Talabnoma.interface";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import dayjs from "dayjs";

interface TalabnomaDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: TalabnomaInterface | null;
}

const TalabnomaDocumentView = ({
  open,
  onOpenChange,
  document,
}: TalabnomaDocumentViewProps) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Talabnoma_${document?.code || "raqamsiz"}`,
  });

  const formatSchedule = () => {
    if (!document?.schedule || document.schedule.length === 0) return "";
    return document.schedule
      .map((s) => {
        const start = s.start_at ? dayjs(s.start_at).format("DD.MM.YYYY [y.] HH.mm") : "";
        const end = s.end_at ? dayjs(s.end_at).format("HH.mm") : "";
        return `${start}-${end}`;
      })
      .join(", ");
  };

  const getApplicationsText = () => {
    if (!document?.application || document.application.length === 0) return "";
    return document.application.map(app => {
      const ranges = app.ranges?.map(r => `${r.from}-${r.to}`).join(", ");
      return `${app.operator_name}: ${ranges}`;
    }).join(" | ");
  };

  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="8xl"
      className="overflow-auto"
      header={
        <div className="flex items-center justify-between w-full pr-12 font-sans">
          <div className="flex items-center gap-2">
            <FileTextIcon className="size-5 text-blue-600" />
            <span className="font-semibold text-gray-800">
              {t("Talabnoma hujjati")}
            </span>
          </div>

          <Button
            onClick={() => handlePrint()}
            variant="default"
            size="sm"
            className="flex items-center gap-2 h-9 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
          >
            <DownloadIcon className="size-4" />
            <span className="text-xs font-bold uppercase">PDF YUKLASH</span>
          </Button>
        </div>
      }
    >
      <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-screen">
        <div
          ref={contentRef}
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
          className="bg-white w-full max-w-[900px] shadow-2xl p-10 md:p-14 relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-8 leading-relaxed"
        >
          <div className="text-center mb-10">
            <h2 className="font-bold text-[20px] uppercase">
              TALABNOMA №{document?.code || "30"}
            </h2>
            <p className="text-[12px] font-normal leading-tight">(tartib raqami)</p>
          </div>

          <div className="space-y-6 text-[16px] text-justify tracking-wide">
            {/* 1 */}
            <div className="flex flex-col">
              <div>
                <span className="min-w-[24px] inline-block">1.</span>
                <span>Ish olib borish sharti:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="font-bold">"{document?.working_condition || ""}"</span>
              </div>
              <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                (aloqani yopish yo‘li bilan/yopmaslik yo‘li bilan/qisqa yo‘qolish bilan)
              </div>
            </div>

            {/* 2 */}
            <div className="flex flex-col">
              <div>
                <span className="min-w-[24px] inline-block">2.</span>
                <span>Sana:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="font-bold">{formatSchedule()}</span>
              </div>
              <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                (ish olib boorish yili, oyi, kuni, soat/min.)
              </div>
            </div>

            {/* 3 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">3.</span>
                  <span>Uchastka, stansiya:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-bold">{document?.station || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (Magistral nomi, № IP)
               </div>
            </div>

            {/* 4 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">4.</span>
                  <span>NO raqami:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-bold">{document?.no_number || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (uzatish liniyasi, liniyaviy/gruppa traktlar va x.k)
                 {document?.application && document.application.length > 0 && (
                   <span className="block font-bold no-italic text-[14px] mt-2">Kanallar: {getApplicationsText()}</span>
                 )}
               </div>
            </div>

            {/* 5 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">5.</span>
                  <span>AI kanallari:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-bold">{document?.ai_channel || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (bor/yo‘q, aloqa raqami ID)
               </div>
            </div>

            {/* 6 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">6.</span>
                  <span className="font-bold">{document?.reason_work || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (ish olib borish sababi)
               </div>
            </div>

            {/* 7 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">7.</span>
                  <span className="font-bold">{document?.content_work || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (ish olib borish mazmuni)
               </div>
            </div>

            {/* 8 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">8.</span>
                  <span>NO xolati:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-bold">{document?.no_status || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (indeks xolati va NO o‘zgargan sanasi)
               </div>
            </div>

            {/* 9 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">9.</span>
                  <span>AvaO‘J:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-bold">{document?.aoj_number || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (almashtirish va aylanib o‘tish jadval raqami)
               </div>
            </div>

            {/* 10 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">10.</span>
                  <span className="font-bold">{document?.reverse || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (boshqa zaxiralash usuli)
               </div>
            </div>

            {/* 11 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">11.</span>
                  <span>Boshqaruv stansiya:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-bold">{document?.responsible_person || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 (Olib boriladigan ishga javobgar shaxs)
               </div>
            </div>

            {/* 12 */}
            <div className="flex flex-col">
               <div>
                  <span className="min-w-[24px] inline-block">12.</span>
                  <span>Kelishildi:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-bold">{document?.agreed || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                 ("O‘zbektelekom" AK ekspluatatsiya korxonasining texnik boshliqlari)
               </div>
            </div>

            {/* 13 */}
            <div className="flex flex-col mt-4">
               <div>
                  <span className="min-w-[24px] inline-block">13.</span>
                  <span>Kelishildi:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="font-bold">{document?.ai_agreed || ""}</span>
               </div>
               <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
                  F.I.SH. AI-9 (joyidagi)
               </div>
            </div>

            {/* 14 */}
             <div className="flex items-end mt-4 text-[16px]">
               <span className="min-w-[24px] inline-block">14.</span>
               <span className="flex-1 whitespace-nowrap">Talabnoma tuzuvchi (IP):&nbsp;&nbsp;&nbsp;&nbsp;</span>
               <span className="font-bold px-2">{document?.creator_ip || ""}</span>
               <span className="flex-1 border-b border-black"></span>
               {document?.created_at && (
                 <span className="font-bold ml-4">
                   {dayjs(document.created_at).format("DD.MM.YYYY")}y.
                 </span>
               )}
            </div>

            {/* 15 */}
             <div className="flex items-end mt-4 text-[16px]">
               <span className="min-w-[24px] inline-block">15.</span>
               <span className="flex-1 whitespace-nowrap">Talabnoma tuzuvchi (MBB-1):&nbsp;&nbsp;&nbsp;&nbsp;</span>
               <span className="font-bold px-2">{document?.creator_mbb || ""}</span>
               <span className="flex-1 border-b border-black"></span>
               {document?.created_at && (
                 <span className="font-bold ml-4">
                   {dayjs(document.created_at).format("DD.MM.YYYY")}y.
                 </span>
               )}
            </div>

          </div>

          <div className="w-full border-t-2 border-dashed border-black mt-20"></div>
        </div>
      </div>
    </MyModal>
  );
};

export default TalabnomaDocumentView;
