import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { dateFormatter } from "@/shared/utils/utils";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";

interface Props {
  asComponent?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: any;
}

const OrderApplicationView1770 = ({
  open,
  onOpenChange,
  document,
  asComponent,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

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

  const DocumentContent = (
    <div
      ref={contentRef}
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        paddingLeft: "3cm",
        paddingRight: "3cm",
        paddingTop: "1.5cm",
        paddingBottom: "1.5cm",
      }}
      className="bg-white w-full max-w-[900px] min-h-[1100px] flex flex-col relative text-black leading-snug h-fit mx-auto"
    >
      <DocumentHeader />

      <div className="text-center font-bold text-[14px] uppercase">
        O'ZBEKISTON RESPUBLIKASI RAQAMLI TEXNOLOGIYALAR VAZIRLIGI
      </div>
      <div className="text-center font-bold text-[15px] uppercase">
        "O'ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI
      </div>
      <div className="text-center font-bold text-[15px] uppercase">
        BOSHQARISH RESPUBLIKA MARKAZI"
      </div>
      <div className="text-center font-bold text-[14px] uppercase mb-4">
        DAVLAT UNITAR KORXONASI
      </div>

      <div className="border-t-2 border-black mb-2"></div>
      <div className="text-center text-[10px] leading-tight mb-1 italic">
        O'zbekiston Respublikasi, Toshkent shahri, Mirzo Ulug'bek tumani,
        Navnihol MFY, Tepamasjid ko'chasi, 4-uy
        <br />
        ☎: +998 71 240 27 72 📠: +998 71 240 54 19
        <br />
        E-mail: tmc@rtmc.uz
      </div>
      <div className="border-t-2 border-black mb-5"></div>

      <div className="text-center font-bold text-[18px] tracking-[0.3em] mb-5">
        XABARNOMA
      </div>

      <div className="grid grid-cols-3 font-bold text-[15px] items-center">
        <div className="flex gap-1">
          SANA:
          <span>
            {document?.order_date
              ? dateFormatter(document.order_date, "YYYY-yil D-MMMM", "uz")
              : "____-yil __-________"}
          </span>
        </div>
        <div className="text-center">№ {document?.code || "17-70-XX/XXXX"}</div>
        <div className="text-right">SONI: 1</div>
      </div>

      <div className="grid grid-cols-[60px_1fr] mb-8 text-[15px]">
        <span className="font-bold">Kimga:</span>
        <div className="font-bold">
          {document?.to?.map((item: string, i: number) => (
            <span key={i}>
              {item}
              {i !== document?.to?.length - 1 ? ", " : ""}
            </span>
          )) || "________________"}
        </div>
        <span className="font-bold">Nusxasi:</span>
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
        <p className="font-bold text-[16px]">"{basic?.title || "Telegraph"}"</p>
        <p className="text-[14px]">
          (Asos: "{basic?.title || "Telegraph"}"ning{" "}
          {basic?.request_date
            ? dateFormatter(basic.request_date, "YYYY-yil D-MMMM", "uz")
            : "____-yil"}
          dagi {basic?.request_number || ""})
        </p>
        <p className="font-bold text-[16px]">
          {basic?.max_duration_minutes === 0
            ? ""
            : basic?.connection_closure_type}
          (
          <b>
            {basic?.max_duration_minutes || "Kanallarda toʻxtalish bolmaydi"}{" "}
            {basic?.max_duration_minutes ? "daqiqagacha" : ""}
          </b>
          )
        </p>
        <p className="font-bold text-[16px]">
          {basic?.start_time
            ? dateFormatter(basic.start_time, "YYYY-yil D-MMMM", "uz")
            : "____-yil"}{" "}
          {formatTime(basic?.start_time)} dan {formatTime(basic?.end_time)}{" "}
          gacha ({basic?.timezone || "UTC+5"})
        </p>
      </div>

      <div className="space-y-4 mb-15 text-[15px] font-medium italic">
        {flowIds.map((flow: any, idx: number) => (
          <p key={idx}>{flow.code || "IDXXXX"} &nbsp;</p>
        ))}
      </div>

      <div className="flex justify-between items-end text-[15px] font-bold mt-12">
        <div className="w-1/2">TTMQ va B xizmati boshlig'i</div>
        <div className="w-1/2 text-right">
          {responsible?.first_name} {responsible?.second_name}
        </div>
      </div>

      <div className="mt-auto text-sm text-[#5a76a8]">
        <p>
          {(document as any)?.created_by?.first_name?.[0]}.{" "}
          {(document as any)?.created_by?.second_name}
        </p>
        <p>{(document as any)?.created_by?.short_phone}</p>
      </div>
    </div>
  );

  if (asComponent) {
    return (
      <div className="w-full bg-gray-100 p-0 overflow-auto">
        {DocumentContent}
      </div>
    );
  }

  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="4xl"
      className="overflow-auto p-0"
      header={null}
    >
      <div className="bg-gray-100 min-h-full w-full py-5">
        {DocumentContent}
      </div>
    </MyModal>
  );
};

export default OrderApplicationView1770;
