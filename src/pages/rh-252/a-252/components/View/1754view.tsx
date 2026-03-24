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

const OrderApplicationView1754 = ({
  open,
  onOpenChange,
  document,
  asComponent,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const payload = (document as any)?.payload;
  const DocumentContent = (
    <div
      ref={contentRef}
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        paddingLeft: "3cm",
        paddingRight: "1.5cm",
        paddingTop: "1.5cm",
        paddingBottom: "1.5cm",
      }}
      className="bg-white w-full max-w-[950px] min-h-[1100px] flex flex-col relative text-black leading-tight h-fit mx-auto"
    >
      <DocumentHeader />

      <div className="text-center font-bold text-[17px] mb-2 leading-tight">
        <p>“O‘zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
        <p>respublika markazi” davlat unitar korxonasi</p>
        <p className="mt-2 tracking-[0.2em] text-[18px]">FARMOYISHI</p>
      </div>

      <div className="flex justify-between font-bold py-1 mb-1 text-[14px]">
        <div>
          SANA:{" "}
          <span>
            {document?.order_date
              ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
              : "____-yil __-________"}
          </span>
        </div>
        <div>№ {document?.code || "17-54"}</div>
        <div>SONI: 1</div>
      </div>

      <div className="grid grid-cols-[60px_1fr] gap-y-1 mb-5 text-[15px]">
        <span className="font-bold">Kimga:</span>
        <div className="font-bold uppercase">
          {document?.to?.length
            ? document.to.map((item: any, i: number) => <p key={i}>{item}</p>)
            : "________________"}
        </div>
        <span className="font-bold">Nusxasi:</span>
        <div>
          {document?.copy?.length
            ? document.copy.map((item, i) => <p key={i}>{item}</p>)
            : "________________"}
        </div>
      </div>

      <div className="text-center font-bold text-[16px] mb-4 uppercase">
        TV-RV chiqishlar to‘g‘risida
      </div>

      <div className="text-[15px] text-justify space-y-4 mb-5">
        <p className="indent-12">
          {payload?.basic?.organization_name || "________________"}ning{" "}
          {payload?.basic?.request_date
            ? dateFormatter(
                payload.basic.request_date,
                "YYYY-yil DD-MMMM",
                "uz",
              )
            : "____-yil __-________dagi"}{" "}
          dagi {payload?.basic?.request_number || "____"}-son xatiga muvofiq{" "}
          {payload?.basic?.justification || ""} {payload?.basic?.context || ""}
        </p>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse border border-black text-[14px]">
          <tbody>
            {payload?.events?.map((event: any, eventIdx: number) => (
              <tr key={eventIdx}>
                <td className="border border-black p-3 w-1/4 text-center align-middle">
                  {event.location}
                </td>
                <td className="border border-black p-3 w-1/6 text-center align-middle font-bold">
                  {event.connection_spec}
                </td>
                <td className="border border-black p-0 h-px">
                  <table className="w-full h-full border-collapse">
                    <tbody className="h-full">
                      {event.schedule?.map((item: any, itemIdx: number) => (
                        <tr
                          key={itemIdx}
                          className={
                            itemIdx !== event.schedule.length - 1
                              ? "border-b border-black"
                              : ""
                          }
                        >
                          <td className="p-2 border-r border-black w-1/3 text-center">
                            {dateFormatter(item.date, "YYYY-yil D-MMMM", "uz")}
                          </td>
                          <td className="p-2 border-r border-black w-1/3 text-center font-bold">
                            {item.duration}
                          </td>
                          <td
                            className={`p-2 text-center ${
                              item.event_type === "Jonli efir"
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            {item.event_type}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[15px] mb-12 indent-12 leading-relaxed">
        Tadbirlar yakuni bilan TV-RV chiqishlar holati yuzasidan tegishli
        Mintaqaviy boshqaruv bog‘lamasi tomonidan batafsil ma’lumot taqdim
        etilsin.
      </p>

      <div className="mt-20 text-sm text-[#5a76a8]">
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

export default OrderApplicationView1754;
