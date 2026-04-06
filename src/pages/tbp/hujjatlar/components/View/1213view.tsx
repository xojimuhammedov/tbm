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

const OrderView1213 = ({
  open,
  onOpenChange,
  document,
  asComponent,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const payload = document?.payload;
  const basic = payload?.basic;
  const consumers = payload?.consumers || [];
  const responsible = document?.responsible;

  const renderText = (item: any) => {
    if (item === null || item === undefined) return "";
    if (typeof item === "string") return item;
    if (typeof item === "number" || typeof item === "boolean")
      return String(item);
    if (typeof item === "object") {
      return (
        item?.name ?? item?.description ?? item?._id ?? JSON.stringify(item)
      );
    }
    return String(item);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "____";
    return dateFormatter(dateStr, "DD.MM.YYYY");
  };

  const headerTitle =
    basic?.title === "BAN_REMOVE" ? "Taqiq (yechildi)" : "Taqiq kiritildi";

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
        <p className="mt-2 tracking-[0.2em] text-[18px]">{headerTitle}</p>
      </div>

      <div className="flex justify-between font-bold py-1 mb-5 text-[14px]">
        <div>
          SANA:{" "}
          <span>
            {document?.order_date
              ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
              : ""}
          </span>
        </div>
        <div>№ {document?.code || "12-13"}</div>
        <div>SONI: 1</div>
      </div>

      <div className="grid grid-cols-[90px_1fr] gap-y-1 mb-6 text-[15px]">
        <span className="font-bold">Kimga:</span>
        <div className="font-bold uppercase">
          {document?.to?.map((item: any, i: number) => (
            <p key={i}>{renderText(item)}</p>
          )) || "________________"}
        </div>

        <span className="font-bold">Nusxasi:</span>
        <div className="uppercase">
          {document?.copy?.length > 0
            ? document.copy.map((item: any) => renderText(item)).join(", ")
            : "TPB"}
        </div>

        <span className="font-bold">Kimdan:</span>
        <div className="uppercase">
          {document?.from?.length > 0
            ? document.from.map((item: any) => renderText(item)).join(", ")
            : ""}
        </div>
      </div>

      <div className="text-[15px] text-justify mb-6 space-y-3">
        <p className="indent-12">
          {basic?.start_time
            ? `${formatDate(basic.start_time)} yil ${new Date(basic.start_time).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit", hour12: false })}`
            : "____"}{" "}
          dan {basic?.orientation || ""}{" "}
          {basic?.context || ""}
        </p>

        {consumers.length > 0 && (
          <p className="indent-12">
            <span className="font-bold">Iste'molchilar:</span>{" "}
            {consumers.map((c: any) => renderText(c)).join(", ")}
          </p>
        )}

        {basic?.base_file && (
          <p className="indent-12">
            <span className="font-bold">Asos hujjat:</span>{" "}
            {renderText(basic.base_file)}
          </p>
        )}

        {basic?.responsible && (
          <p className="indent-12">
            <span className="font-bold">Mas'ul:</span>{" "}
            {renderText(basic.responsible)}
          </p>
        )}
      </div>

      <div className="flex justify-between items-end text-[15px] font-bold mt-auto">
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

export default OrderView1213;
