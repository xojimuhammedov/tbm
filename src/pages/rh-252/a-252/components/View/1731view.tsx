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

const OrderApplicationView1731 = ({
  open,
  onOpenChange,
  document,
  asComponent,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const flows = (document as any)?.payload?.flow_ids || [];

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
      className="bg-white w-full max-w-[1200px] min-h-[1100px] flex flex-col relative text-black leading-tight h-fit mx-auto"
    >
      <DocumentHeader />

      <div className="text-center font-bold text-[17px] mb-2 leading-tight mt-6">
        <p>"O'zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
        <p>respublika markazi" davlat unitar korxonasi</p>
        <p className="mt-2 tracking-[0.2em] text-[18px]">FARMOYISHI</p>
      </div>

      <div className="flex justify-between font-bold py-1 mb-6 text-[14px]">
        <div>
          SANA:{" "}
          <span className="px-2">
            {document?.order_date
              ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
              : "____-yil __-________"}
          </span>
        </div>
        <div>№ {document?.code || "17-31"}</div>
        <div>Nusxa: 1</div>
      </div>

      {flows.map((flow: any, fIdx: number) => {
        const meta = flow.flow_id_metadata;
        const firstRoute = flow.route?.[0];

        return (
          <div key={meta?._id || fIdx} className="mb-10 last:mb-0">
            <div className="bg-gray-50 border border-black border-b-0 p-2 font-bold text-[13px]">
              OQIM (ID): {flow.flow_id}
            </div>
            <table
              className="w-full text-[11px]"
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <thead>
                <tr className="bg-gray-100/50">
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    To'g'ri raqam
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Teskari raqam
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Port A
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Multipleksor A
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    p.A
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Name_MS_final
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Tezlik
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    № ts
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    p.B
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Multipleksor B
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Port B
                  </th>
                </tr>
              </thead>
              <tbody>
                {flow.route.map((route: any, rIdx: number) => (
                  <tr key={rIdx} className="text-center">
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.forward}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.reverse}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.port_a}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.mux_a}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.pa}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.final_ms_name}
                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "4px" }}
                      className="uppercase"
                    >
                      {route.speed}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.ts}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.pb}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.mux_b}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px" }}>
                      {route.port_b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="grid grid-cols-2 gap-x-10 gap-y-3 p-4 border border-black border-t-0 text-[12px]">
              <div className="flex items-end gap-2">
                <span className="font-bold text-gray-700 whitespace-nowrap">
                  Xalqaro raqam:
                </span>
                <span className="border-b border-dotted border-gray-400 flex-1 pb-0.5 italic">
                  {meta?.international_code || firstRoute?.international || " "}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-bold text-gray-700 whitespace-nowrap">
                  Farmoyish №:
                </span>
                <span className="border-b border-dotted border-gray-400 flex-1 pb-0.5">
                  {meta?.order_number || firstRoute?.order_number || " "}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-bold text-gray-700 whitespace-nowrap">
                  Iste'molchi:
                </span>
                <span className="border-b border-dotted border-gray-400 flex-1 pb-0.5">
                  {meta?.consumer_for_route || firstRoute?.consumer || " "}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-bold text-gray-700 whitespace-nowrap">
                  Manfaatdorlik:
                </span>
                <span className="border-b border-dotted border-gray-400 flex-1 pb-0.5">
                  {meta?.note || firstRoute?.interest_level || " "}
                </span>
              </div>
            </div>
          </div>
        );
      })}

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
      size="7xl"
      className="overflow-auto p-0"
      header={null}
    >
      <div className="bg-gray-100 min-h-full w-full py-5">
        {DocumentContent}
      </div>
    </MyModal>
  );
};

export default OrderApplicationView1731;