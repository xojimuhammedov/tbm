import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";
import { DApplicationInterface } from "@/pages/rh-252/d-252/interfaces/d-252.interface.ts";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";

interface DApplicationViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: DApplicationInterface | null;
}

const DApplicationView = ({
  open,
  onOpenChange,
  document,
}: DApplicationViewProps) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Talabnoma_${document?.request_number || "D-Ilova"}`,
  });

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
              {t("Talabnomani ko'rish")}
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
          className="bg-white w-full max-w-[850px] shadow-2xl p-8 md:p-14 relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-10 leading-normal"
        >
          <div className="absolute top-8 left-8 text-[12px] font-bold print:static print:mb-2">
            RH 45-252:2013
          </div>
          <div className="text-center mb-2">
            <p className="font-bold text-[16px]">D ilova</p>
            <p className="text-[14px] italic">(majburiy)</p>
          </div>
          <div className="text-center mb-6">
            <h2 className="font-bold text-[16px] leading-tight uppercase">
              Aloqalarni blokirovkalash/blokdan chiqarish uchun <br /> talabnoma
              shakli
            </h2>
            <div className="w-full border-t border-black my-4"></div>
            <p className="text-[12px] text-right font-bold uppercase">
              ID/7-shakl
            </p>
          </div>
          <div className="text-center mb-8 space-y-1">
            <p className="text-[14px] mb-4 font-bold uppercase leading-tight">
              O‘ZBEKISTON RESPUBLIKASI ALOQA, AXBOROTLASHTIRISH VA <br />
              TELEKOMMUNIKATSIYA TEXNOLOGIYALARI DAVLAT QO‘MITASI
            </p>
            <p className="text-[14px] font-bold uppercase leading-tight">
              «O‘ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI BOSHQARISH RESPUBLIKA
              MARKAZI»
            </p>
            <p className="text-[13px] font-bold uppercase">
              DAVLAT UNITAR KORXONASI
            </p>

            <div className="border-y border-black py-2 mt-4 text-[11px] text-center">
              <p className="mb-1 font-bold">
                O‘zbekiston Respublikasi, Toshkent sh., 100000, Oloy ko‘chasi 23
              </p>
              <div className="flex justify-center items-center gap-6 mb-1">
                <div className="flex items-center gap-1">
                  <span>Tel: +998 71 233-36-63</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Faks: +998 71 233-72-78</span>
                </div>
              </div>
              <p>
                E-mail: <span className="underline italic">tmc@rtmc.uz</span>
              </p>
            </div>
          </div>
          <div className="text-center mb-10">
            <h3 className="text-[22px] font-bold tracking-[8px] uppercase">
              TALABNOMA
            </h3>
          </div>
          <div className="flex justify-between mb-10 text-[16px]">
            <p>
              SANA:{" "}
              <span className="border-b border-black px-4 font-bold">
                {document?.created_at
                  ? dateFormatter(document.created_at, DATE)
                  : "___.___.______"}
              </span>
            </p>
            <p>
              №{" "}
              <span className="border-b border-black min-w-[120px] inline-block text-center font-bold">
                {document?.request_number || "__________"}
              </span>
            </p>
          </div>
          <div className="space-y-6 text-[16px] mb-20">
            <div className="flex items-end gap-2">
              <span className="font-bold min-w-[70px]">Kimga:</span>
              <span className="border-b border-black flex-1 font-bold pb-1">
                {document?.recipient || "_________________________________"}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-bold min-w-[70px]">Kimdan:</span>
              <span className="border-b border-black flex-1 font-bold  pb-1">
                {document?.sender || "_________________________________"}
              </span>
            </div>
          </div>
          <div className="w-full border-t border-black mt-16"></div>
        </div>
      </div>
    </MyModal>
  );
};

export default DApplicationView;
