import DocumentHeader from "@/pages/tbp/hujjatlar/components/View/DocumentHeader.tsx";
import type {
    OrderApplication,
} from "@/pages/tbp/hujjatlar/interfaces/order.interface.ts";
import { MyModal } from "@/shared/components/moleculas/modal";
import { dateFormatter } from "@/shared/utils/utils";
import { useRef } from "react";

interface Props {
  asComponent?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | any | null;
}

const OrderView1248 = ({
  open,
  onOpenChange,
  document,
  asComponent,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const payload = document?.payload;
  const basic = payload?.basic;
  const withAPause = payload?.with_a_pause || [];
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
      className="bg-white w-full max-w-[950px] min-h-[1100px] flex flex-col relative text-black leading-tight h-fit mx-auto"
    >
      <DocumentHeader />

      <div className="text-center font-bold text-[17px] mb-2 leading-tight">
        <p>"O'zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
        <p>respublika markazi" davlat unitar korxonasi</p>
        <p className="mt-2 tracking-[0.2em] text-[18px]">FARMOYISHI</p>
      </div>

      <div className="flex justify-between font-bold py-1 mb-5 text-[14px]">
        <div>
          SANA: <span>{document?.order_date ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz") : ""}</span>
        </div>
        <div>№ {document?.code || "12-48"}</div>
        <div>SONI: 1</div>
      </div>

      <div className="grid grid-cols-[70px_1fr] gap-y-1 mb-8 text-[15px]">
        <span className="font-bold">Kimga:</span>
        <div className="font-bold uppercase">
          {document?.to?.map((item: string, i: number) => (
            <p key={i}>{item}</p>
          )) || "________________"}
        </div>
        <span className="font-bold">Nusxasi:</span>
        <div className="uppercase">
          {document?.copy?.map((item: string, i: number) => (
            <p key={i}>{item}</p>
          )) || "TPB"}
        </div>
      </div>

      <div className="text-[15px] text-justify space-y-4 mb-8">
        <div className="font-bold text-center text-[16px] uppercase underline">
          {basic?.title || "Tezkor ishlar"}
        </div>

        <div className="indent-12">
          {basic?.station_interval && (
            <p>
              <span className="font-bold">Stansiya intervali:</span> {basic.station_interval}
            </p>
          )}

          {basic?.no_raqami?.length > 0 && (
            <p>
              <span className="font-bold">N/O raqamlari:</span> {basic.no_raqami.join(", ")}
            </p>
          )}

          {basic?.no_status && (
            <p>
              <span className="font-bold">N/O statusi:</span> {basic.no_status}
              {basic.no_status_date ? ` (${dateFormatter(basic.no_status_date, "DD.MM.YYYY")})` : ""}
            </p>
          )}

          {basic?.cause && (
            <p>
              <span className="font-bold">Sabab:</span> {basic.cause}
            </p>
          )}

          {basic?.control_station && (
            <p>
              <span className="font-bold">Nazorat stansiyasi:</span> {basic.control_station}
            </p>
          )}

          {basic?.agreed && (
            <p>
              <span className="font-bold">Kelishilgan:</span> {basic.agreed}
            </p>
          )}

          {basic?.requirement_ip && (
            <p>
              <span className="font-bold">Talabnoma:</span> {basic.requirement_ip}
              {basic.requirement_ip_date ? ` (${dateFormatter(basic.requirement_ip_date, "DD.MM.YYYY")})` : ""}
              {basic.requirement_user ? ` - ${basic.requirement_user}` : ""}
            </p>
          )}

          <p>
            <span className="font-bold">Vaqti:</span> {basic?.start_time ? dateFormatter(basic.start_time, "YYYY-yil DD-MMMM", "uz") : ""} {formatTime(basic?.start_time)} dan {formatTime(basic?.end_time)} gacha {basic?.connection_closure_type ? `(${basic.connection_closure_type})` : ""}
          </p>
        </div>
      </div>

      {withAPause?.length > 0 && (
        <div className="text-[15px] mb-8">
          <div className="font-bold mb-2">To'xtalish kuzatiladigan oqimlar:</div>
          <div className="grid grid-cols-4 gap-2">
            {withAPause.map((flow: any, idx: number) => (
              <span key={idx} className="font-bold">ID {flow.code || flow}</span>
            ))}
          </div>
        </div>
      )}

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

export default OrderView1248;
