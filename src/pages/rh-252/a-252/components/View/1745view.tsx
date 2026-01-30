import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import { OrderApplication } from "@/pages/rh-252/a-252/interfaces/order.interface.ts";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | null;
}

const OrderApplicationView1745 = ({ open, onOpenChange, document }: Props) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Farmoyish_${document?.code || ""}`,
  });

  const payload = (document as any)?.payload;
  const basic = payload?.basic;

  const getDynamicTitle = () => {
    const hasCreate = payload?.create?.flow_ids?.length > 0;
    const hasUpdate =
      payload?.update?.channels?.length > 0 ||
      payload?.update?.flows?.length > 0;
    const hasDelete =
      payload?.delete?.channels?.length > 0 ||
      payload?.delete?.channel_ids?.length > 0;

    const signal = basic?.signal_level || "2 Mbit/s";
    const actions: string[] = [];

    if (hasUpdate) actions.push("yo‘nalishini o‘zgartirish");
    if (hasCreate) actions.push("tashkil etish");
    if (hasDelete) actions.push("o‘chirish");

    if (actions.length === 0) return `${signal} oqimlar to‘g‘risida`;

    const actionText =
      actions.length > 1
        ? actions.slice(0, -1).join(", ") + " va " + actions.slice(-1)
        : actions[0];

    return `${signal} oqimni ${actionText} to‘g‘risida`;
  };

  let globalStep = 0;

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
              {t("Farmoyishni ko'rish")} ({document?.code})
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
          className="bg-white w-full max-w-[950px] shadow-2xl relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-10 leading-tight"
        >
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
            O‘zbekiston Respublikasi, Toshkent shahri, Mirzo Ulug'bek tumani,
            Navnihol MFY, Tepamasjid ko'chasi, 4-uy
            <br />
            ☎: +998 71 240 27 72 📠: +998 71 240 54 19
            <br />
            E-mail: tmc@rtmc.uz
          </div>
          <div className="border-t-2 border-black mb-5"></div>

          <div className="text-center font-bold text-[22px] tracking-[0.3em] mb-4">
            FARMOYISHI
          </div>

          <div className="flex justify-between font-bold py-1 mb-5 text-[14px]">
            <div>
              SANA:{" "}
              {document?.order_date
                ? dateFormatter(document.order_date, "DD.MM.YYYY", "uz")
                : "____.____._______"}
              -yil
            </div>
            <div>№ {document?.code || "17-45"}</div>
            <div>SONI: 1</div>
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-y-1 mb-8 text-[15px]">
            <span className="font-bold italic">Kimga:</span>
            <div className="font-bold uppercase">
              {document?.to?.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            <span className="font-bold italic">Nusxasi:</span>
            <div>
              {document?.copy?.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            <span className="font-bold italic">Kimdan:</span>
            <div className="font-bold uppercase">“O‘zTTBRM” DUK</div>
          </div>

          <div className="text-center font-bold text-[16px] mb-2  ">
            {getDynamicTitle()}
          </div>

          <div className="text-[15px] text-justify space-y-3 mb-10">
            <p className="indent-12 leading-relaxed">
              {basic?.organization_name}ning{" "}
              {basic?.request_date
                ? dateFormatter(basic.request_date, "YYYY-yil D-MMMM", "uz")
                : "____-yil __-________"}
              dagi {basic?.request_number}-son murojaatiga binoan,{" "}
              {basic?.justification}{" "}
              {document?.order_date
                ? dateFormatter(document.order_date, "YYYY-yil D-MMMM", "uz")
                : "____-yil __-________"}
              dan quyidagi ishlar amalga oshirilsin:
            </p>

            {/* 1. UPDATE QISMI */}
            {payload?.update?.channels?.map((item: any, i: number) => {
              globalStep++;
              return (
                <div key={`upd-${i}`} className="pl-4">
                  <p>
                    {globalStep}. {item.old?.international_stream_number}{" "}
                    yo‘nalishidagi {basic?.signal_level} oqim{" "}
                    {item.new?.international_stream_number} yo‘nalishiga
                    quyidagicha o‘zgartirilsin:
                  </p>
                  <div className="pl-12 mt-2 text-[14px]">
                    <p>
                      Oldin: {item.old?.international_stream_number} (Kod:{" "}
                      {item.old?.code})
                    </p>
                    <p className="">
                      Hozir: {item.new?.international_stream_number} (Kod:{" "}
                      {item.new?.code})
                    </p>
                  </div>
                </div>
              );
            })}

            {/* 2. CREATE QISMI */}
            {payload?.create?.flow_ids &&
              payload.create.flow_ids.length > 0 && (
                <div className="pl-4">
                  <p>
                    {++globalStep}. Tegishli manzillar oralig‘idagi oqimlar
                    quyidagicha tashkil etilsin va ma’lumot o‘rnida qabul
                    qilinsin:
                  </p>

                  <div className="pl-12 mt-2 ">
                    {payload.create.flow_ids.map((item: any, i: number) => (
                      <div key={`cre-item-${i}`} className="leading-relaxed">
                        <p>
                          {item.point_a} ({item.device_a || ""}) –{" "}
                          {item.point_b} ({item.device_b || ""}) oralig‘idagi{" "}
                          <span className="">
                            {item.signal_level || basic?.signal_level}
                          </span>{" "}
                          oqim UFTF{" "}
                          <span className={"font-bold"}>{item.code}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* 3. DELETE QISMI */}
            {(payload?.delete?.channels?.length > 0 ||
              payload?.delete?.channel_ids?.length > 0) && (
              <div className="pl-4">
                <p>
                  {++globalStep}. Xizmat ehtiyoji yo‘qligi sababli quyidagi{" "}
                  {basic?.signal_level} oqimlar o‘chirilsin:
                </p>
                <p className="pl-12 font-bold italic mt-1">
                  {[
                    ...(payload?.delete?.channels || []),
                    ...(payload?.delete?.channel_ids || []),
                  ].join(", ")}
                </p>
              </div>
            )}

            <div className="mt-5 space-y-1 text-[14px]">
              <p>
                Murojaat uchun tel: +
                {document?.responsible?.phone || "71-240-27-72"}
              </p>
              <p>
                Mas’ul xodim:{" "}
                <span className="font-bold">
                  {document?.responsible?.first_name}
                </span>
              </p>
            </div>
          </div>

          {/*<div className="mt-20 flex justify-between items-end font-bold px-4">*/}
          {/*  <div className="w-1/2">Direktorning birinchi o‘rinbosari</div>*/}
          {/*  <div className="w-1/2 text-right">{document?.responsible?.second_name || "Sh. Meliboyev"}</div>*/}
          {/*</div>*/}
        </div>
      </div>
    </MyModal>
  );
};

export default OrderApplicationView1745;
