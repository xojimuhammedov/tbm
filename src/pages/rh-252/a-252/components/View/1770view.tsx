import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: any;
}

const OrderApplicationView1770 = ({ open, onOpenChange, document }: Props) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Xabarnoma_17-70_${document?.code || ""}`,
  });
  const payload = document?.payload;
  const basic = payload?.basic;
  const flowIds = payload?.flow_ids || [];
  const responsible = document?.responsible;
  const formatTime = (dateStr: string) => {
    if (!dateStr) return "00:00";
    const date = new Date(dateStr);
    return date.toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
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
              {t("17-70 shakl: Ishlar to'g'risida xabarnoma")}
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
          style={{
            fontFamily: '"Times New Roman", Times, serif',
            paddingLeft: "3cm",
            paddingRight: "3cm",
            paddingTop: "1.5cm",
            paddingBottom: "1.5cm",
          }}
          className="bg-white w-full max-w-[900px] shadow-2xl relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 leading-snug"
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                        @page {
                        
                    }
                        @media print {
                            body { margin: 0; }
                          
                        }
                    `,
            }}
          />
          <DocumentHeader />
          <div className="text-center font-bold text-[14px] uppercase ">
            O‘ZBEKISTON RESPUBLIKASI RAQAMLI TEXNOLOGIYALAR VAZIRLIGI
          </div>
          <div className="text-center font-bold text-[15px] uppercase ">
            “O‘ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI
          </div>
          <div className="text-center font-bold text-[15px] uppercase">
            BOSHQARISH RESPUBLIKA MARKAZI”
          </div>
          <div className="text-center font-bold text-[14px] uppercase mb-4">
            DAVLAT UNITAR KORXONASI
          </div>

          <div className="border-t-2 border-black mb-2"></div>
          <div className="text-center text-[10px] leading-tight mb-1 italic">
            O‘zbekiston Respublikasi, Toshkent sh., 100019, Olmazor tumani,
            Sebzor dahasi, 18 «A» -uy
            <br />
            ☎: +998 71 240 27 72 📠: +998 71 240 54 19
            <br />
            E-mail: tmc@rtmc.uz
          </div>
          <div className="border-t-2 border-black mb-5"></div>
          <div className="text-center font-bold text-[18px] tracking-[0.3em] mb-5">
            XABARNOMA
          </div>
          <div className="flex justify-between font-bold text-[15px]">
            <div className="flex gap-1">
              SANA:{" "}
              <span className=" decoration-1">
                {document?.order_date
                  ? dateFormatter(document.order_date, "YYYY-yil D-MMMM")
                  : "____-yil __-________"}
              </span>
            </div>
            <div>№ {document?.code || "17-70-XX/XXXX"}</div>
            <div>SONI: 1</div>
          </div>

          <div className="grid grid-cols-[60px_1fr]  mb-8 text-[15px] ">
            <span className="font-bold ">Kimga:</span>
            <div className="font-bold">
              {document?.to?.map((item: string, i: number) => (
                <span key={i}>
                  {item}
                  {i !== document?.to?.length - 1 ? ", " : ""}
                </span>
              )) || "________________"}
            </div>

            <span className="font-bold ">Nusxasi:</span>
            <div className="font-bold uppercase">
              {document?.copy?.map((item: string, i: number) => (
                <span key={i}>
                  {item}
                  {i !== document?.copy?.length - 1 ? ", " : ""}
                </span>
              )) || "TPB"}
            </div>
          </div>
          <div className="text-center space-y-2 mb-6">
            <p className="font-bold text-[16px]">
              “{basic?.title || "Telegraph"}”
            </p>
            <p className="text-[14px]">
              (Asos: “{basic?.title || "Telegraph"}”ning{" "}
              {basic?.request_date
                ? dateFormatter(basic.request_date, "YYYY-yil D-MMMM")
                : "____-yil"}
              dagi {basic?.request_number || "TT38546"}-son xabarnomasi)
            </p>
            <p className="font-bold text-[16px]">
              “{basic?.connection_closure_type || "2-8"}” aloqa yopish yo‘li
              bilan (<u>{basic?.max_duration_minutes || "120"} daqiqagacha</u>)
            </p>
            <p className="font-bold text-[16px]">
              {basic?.start_time
                ? dateFormatter(basic.start_time, "YYYY-yil D-MMMM")
                : "____-yil"}{" "}
              {formatTime(basic?.start_time)}dan {formatTime(basic?.end_time)}{" "}
              gacha (UTC{basic?.timezone || "+5"})
            </p>
          </div>
          <div className="space-y-4 mb-15 text-[15px] font-medium italic">
            {flowIds.map((flow: any, idx: number) => (
              <p key={idx}>
                {flow.code || "IDXXXX"} &nbsp;
                Bukhara_UZTEL/UZB-Moscow/9_TLGR42/RUS100Gen9
              </p>
            ))}
          </div>
          <div className="flex justify-between items-end text-[15px] font-bold mt-12">
            <div className="w-1/2">TTMQ va B xizmati boshlig‘i</div>
            <div className="w-1/2 text-right">
              {responsible?.first_name || "M. Mirsadikov"}
            </div>
          </div>
        </div>
      </div>
    </MyModal>
  );
};

export default OrderApplicationView1770;
