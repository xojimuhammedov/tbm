import DocumentHeader from "@/pages/tbp/hujjatlar/components/View/DocumentHeader.tsx";
import { MyModal } from "@/shared/components/moleculas/modal";
import { dateFormatter } from "@/shared/utils/utils";
import { useRef } from "react";

interface Props {
  asComponent?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: any;
}

const OrderApplicationView1214 = ({
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

      <div className="text-center font-bold text-[14px] uppercase mb-4">
        "O'zbekiston telekommunikatsiya tarmoqlarini boshqarish respublika markazi"
        <br />
        DAVLAT UNITAR KORXONASI
      </div>

      <div className="border-t-2 border-black mb-5"></div>

      <div className="text-center font-bold text-[18px] tracking-[0.3em] mb-5 uppercase">
        Xabarnoma
      </div>

      <div className="grid grid-cols-3 font-bold text-[15px] items-center mb-8">
        <div className="flex gap-1">
          SANA:
          <span>
            {document?.order_date
              ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
              : "____-yil __-________"}
          </span>
        </div>
        <div className="text-center">№ {document?.code || "12-14"}</div>
        <div className="text-right">SONI: 1</div>
      </div>

      <div className="grid grid-cols-[80px_1fr] mb-8 text-[15px]">
        <span className="font-bold">Kimga:</span>
        <div className="font-bold uppercase">
          {document?.to?.map((item: string, i: number) => (
            <p key={i}>{item}</p>
          )) || "________________"}
        </div>
        <span className="font-bold">Nusxasi:</span>
        <div className="uppercase">
          {document?.copy?.length > 0 ? document.copy.join(", ") : "TPB"}
        </div>
      </div>

      <div className="text-center space-y-4 mb-10">
        <p className="font-bold text-[17px] uppercase">
          {basic?.organization_name} hamkori tarmog'ida ishlar to'g'risida хаЬаrпоmа
        </p>

        <p className="text-[15px] italic">
          (Asos: "{basic?.organization_name}"ning{" "}
          {basic?.request_date
            ? dateFormatter(basic.request_date, "DD.MM.YYYY")
            : "____"} yildagi {basic?.request_number || "___"}-sonli xati)
        </p>

        <div className="text-[16px] space-y-2">
          <p className="font-bold">
            {basic?.connection_closure_type || "2-8 aloqani yopish yo'li bilan"}
          </p>
          <p className="font-bold">
            {basic?.start_time ? dateFormatter(basic.start_time, "YYYY-yil DD-MMMM", "uz") : ""} {formatTime(basic?.start_time)} dan {formatTime(basic?.end_time)} gacha
          </p>
        </div>
      </div>

      <div className="mb-8">
        <p className="font-bold text-[15px] mb-2">To'xtalish kuzatiladigan oqimlar:</p>
        <div className="grid grid-cols-4 gap-2">
          {flowIds.map((flow: any, idx: number) => (
            <span key={idx} className="font-bold text-[15px]">ID {flow.code || flow}</span>
          ))}
        </div>
      </div>

      {basic?.context && (
        <div className="mb-8 text-[15px]">
          <p className="font-bold mb-1">Qo'shimcha ma'lumot:</p>
          <p>{basic.context}</p>
        </div>
      )}

      <div className="flex justify-between items-end text-[15px] font-bold mt-auto mb-12">
        <div className="w-1/2 text-left">TTMQ va B xizmati boshlig'i</div>
        <div className="w-1/2 text-right">
          {responsible?.first_name} {responsible?.second_name}
        </div>
      </div>

      <div className="text-sm text-[#5a76a8]">
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

export default OrderApplicationView1214;
