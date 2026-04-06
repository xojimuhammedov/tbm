import DocumentHeader from "@/pages/tbp/hujjatlar/components/View/DocumentHeader.tsx";
import type { OrderApplication } from "@/pages/tbp/hujjatlar/interfaces/order.interface.ts";
import { MyModal } from "@/shared/components/moleculas/modal";
import { dateFormatter } from "@/shared/utils/utils";
import { useRef } from "react";

interface Props {
  asComponent?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | any | null;
}

const OrderView1212 = ({
  open,
  onOpenChange,
  document,
  asComponent,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const payload = document?.payload;
  const basic = payload?.basic;
  const createFlows = payload?.create_pending?.flow_ids || [];
  const updateChannels = payload?.update_pending?.channels || [];
  const updateFlows = payload?.update_pending?.flows || [];
  const deleteElements = payload?.delete_pending?.elements || [];
  const responsible = document?.responsible;

  const actions: string[] = basic?.actions || [];

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
          SANA:{" "}
          <span>
            {document?.order_date
              ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
              : ""}
          </span>
        </div>
        <div>№ {document?.code || "12-12"}</div>
        <div>SONI: 1</div>
      </div>

      <div className="grid grid-cols-[90px_1fr] gap-y-1 mb-6 text-[15px]">
        <span className="font-bold">Kimga:</span>
        <div className="font-bold uppercase">
          {document?.to?.map((item: any, i: number) => (
            <p key={i}>{renderText(item)}</p>
          )) || "________________"}
        </div>
        {document?.copy?.length > 0 && (
          <>
            <span className="font-bold">Nusxasi:</span>
            <div className="uppercase">
              {document.copy.map((item: any, i: number) => (
                <p key={i}>{renderText(item?.name)}</p>
              ))}
            </div>
          </>
        )}
        {document?.from?.length > 0 && (
          <>
            <span className="font-bold">Kimdan:</span>
            <div className="uppercase">
              {document.from.map((item: any, i: number) => (
                <p key={i}>{renderText(item?.name)}</p>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="text-[15px] text-justify mb-6 space-y-3">
        <p className="indent-12">
          <span className="font-bold">
            {basic?.organization_name || "____"}
          </span>{" "}
          {formatDate(basic?.request_date)}{" "}
          {basic?.request_number ? `№ ${basic.request_number}-sonli` : ""}{" "}
          murojaatiga binoan{" "}
          {basic?.signal_level && (
            <span className="font-bold">{basic.signal_level}</span>
          )}{" "}
          oqimni{" "}
          {actions.length > 0 && (
            <span className="font-bold">
              {actions
                .map((a) =>
                  a === "create"
                    ? "tashkil etish"
                    : a === "update"
                      ? "ko'chirish"
                      : a === "delete"
                        ? "o'chirish"
                        : a,
                )
                .join(", ")}
            </span>
          )}{" "}
          to'g'risida:
        </p>

        {basic?.start_time && (
          <p className="indent-12">
            <span className="font-bold">Boshlanish vaqti:</span>{" "}
            {dateFormatter(basic.start_time, "YYYY-yil DD-MMMM HH:mm", "uz")}
          </p>
        )}

        {basic?.description && (
          <p className="text-[14px] italic border-l-4 border-gray-300 pl-3 py-1">
            {basic.description}
          </p>
        )}
      </div>

      {/* Create section */}
      {actions.includes("create_pending") && createFlows.length > 0 && (
        <div className="mb-6">
          <p className="font-bold text-[15px] mb-2 uppercase">
            Tashkil etiladigan oqimlar:
          </p>
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Code
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Signal
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Point A
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Port A
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Device A
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Point B
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Port B
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Device B
                </th>
              </tr>
            </thead>
            <tbody>
              {createFlows.map((f: any, i: number) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-1 font-bold">
                    {f.code}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.signal_level}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.point_a}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.port_a}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.device_a}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.point_b}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.port_b}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.device_b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {actions.includes("update_pending") && updateChannels.length > 0 && (
        <div className="mb-6">
          <p className="font-bold text-[15px] mb-2 uppercase">
            Ko'chiriladigan kanallar:
          </p>
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-3 py-1 text-left w-1/2">
                  Eski (Old)
                </th>
                <th className="border border-gray-400 px-3 py-1 text-left w-1/2">
                  Yangi (New)
                </th>
              </tr>
            </thead>
            <tbody>
              {updateChannels.map((ch: any, i: number) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-1">{ch.old}</td>
                  <td className="border border-gray-300 px-3 py-1 font-bold">
                    {ch.new}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {actions.includes("update_pending") && updateFlows.length > 0 && (
        <div className="mb-6">
          <p className="font-bold text-[15px] mb-2 uppercase">
            Ko'chiriladigan oqimlar:
          </p>
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Code
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Point A
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Point B
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Device A
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Device B
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Port A
                </th>
                <th className="border border-gray-400 px-2 py-1 text-left">
                  Port B
                </th>
              </tr>
            </thead>
            <tbody>
              {updateFlows.map((f: any, i: number) => (
                <tr key={i} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-1 font-bold">
                    {f.code}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.point_a}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.point_b}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.device_a}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.device_b}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.port_a}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {f.port_b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {actions.includes("delete_pending") && deleteElements.length > 0 && (
        <div className="mb-6">
          <p className="font-bold text-[15px] mb-2 uppercase">
            O'chiriladigan elementlar:
          </p>
          <div className="flex flex-wrap gap-3">
            {deleteElements.map((el: any, i: number) => (
              <span
                key={i}
                className="font-bold text-[15px] border border-red-300 bg-red-50 px-2 py-0.5 rounded"
              >
                {typeof el === "string" ? el : el.value || el.code}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between items-end text-[15px] font-bold mt-auto mb-10">
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

export default OrderView1212;
