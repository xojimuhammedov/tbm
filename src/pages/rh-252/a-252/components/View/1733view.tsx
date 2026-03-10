import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { dateFormatter } from "@/shared/utils/utils";
import { OrderApplication } from "@/pages/rh-252/a-252/interfaces/order.interface.ts";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";

interface Props {
  asComponent?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | null;
}

const OrderApplicationView1733 = ({ open, onOpenChange, document, asComponent }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const payload = (document as any)?.payload;
  const basic = payload?.basic;
  const channels = payload?.delete?.channels || [];
  const responsible = document?.responsible;

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
          className="bg-white w-full max-w-[950px] min-h-[1100px] flex flex-col relative text-black leading-tight h-fit mx-auto"
      >
        <DocumentHeader />

        <div className="text-center font-bold text-[17px] mb-4 leading-tight">
          <p>"O'zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
          <p>respublika markazi" davlat unitar korxonasi</p>
          <p className="mt-4 tracking-[0.2em] text-[18px]">FARMOYISHI</p>
        </div>

        <div className="flex justify-between font-bold py-1 mb-1 text-[14px]">
          <div>
            SANA:{" "}
            {document?.order_date
                ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
                : "____-yil __-________"}
          </div>
          <div className="uppercase">№ {document?.code || ""}</div>
          <div>SONI: 1</div>
        </div>

        <div className="grid grid-cols-[60px_1fr] gap-y-2 mb-5 text-[15px]">
          <span className="font-bold">Kimga:</span>
          <div className="font-bold uppercase">
            {document?.to?.map((item: string, i: number) => (
                <p key={i} className="mb-1">{item}</p>
            )) || "________________"}
          </div>
        </div>

        <div className="text-center font-bold text-[17px] mb-2">
          Zaxira AAG kanallarni o'chirish to'g'risida
        </div>

        <div className="text-[15px] text-justify space-y-4 mb-6">
          <p className="indent-12">
            {basic?.organization_name || "________________"}ning{" "}
            {basic?.request_date
                ? dateFormatter(basic.request_date, "YYYY-yil DD-MMMM", "uz")
                : "____-yil __-________"}
            dagi {basic?.request_number || "____"} ga binoan{" "}
            {basic?.justification || "___________________________________"}
            {basic?.deadline
                ? dateFormatter(basic.deadline, " YYYY-yil DD-MMMM", "uz")
                : "____-yildan"}
            dan boshlab ushbu kanallar uchun ishlagan quyidagi zaxira (AAG)
            kanallari o'chirilsin:
          </p>
        </div>

        <div className="space-y-3 mb-4 text-[15px] ml-4">
          {channels.map((ch: any, idx: number) => (
              <div key={idx} className="flex">
                <span className="mr-2">{idx + 1})</span>
                <span>
              <b>{ch.international_stream_number || "____"}</b>{" "}
                  yo'nalishidagi <b>{ch.flow_id?.code || "ID-____"}</b> oqimdagi{" "}
                  <b>{ch.channel_number_in_stream || "____"}</b> kanallar;
            </span>
              </div>
          ))}
        </div>

        <div className="text-[15px] mb-12 text-justify">
          <p className="indent-12">
            Shuningdek zaxira (AAG) kanallari o'chirilgandan so'ng bo'shagan
            {channels.length > 0 && (
                <span className="font-bold mx-1">
              1x2 Mbit/s {channels[0]?.flow_id?.code || ""}
            </span>
            )}
            oqim ishlab chiqarish ehtiyoji yo'qligi sababli tarmoqdan
            o'chirilsin.
          </p>
        </div>

        <div className="mt-20 space-y-4 text-[15px]">
          <p>
            <b>Oqimni o'chirish bo'yicha mas'ul</b> – tarmoq administratori (
            <b>
              {responsible?.first_name} {responsible?.second_name}
            </b>
            ).
          </p>
          <p>
            <b>
              Kanallarni o'chirish hamda 3.3-son shakl ma'lumot berish
              bo'yicha mas'ul
            </b>
          </p>
        </div>

        <div className="mt-auto text-sm text-[#4a76a8] leading-[1.2]">
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

export default OrderApplicationView1733;