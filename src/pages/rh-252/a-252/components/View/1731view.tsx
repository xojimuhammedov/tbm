import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { dateFormatter } from "@/shared/utils/utils";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: any;
}

const OrderApplicationView1731 = ({ open, onOpenChange, document }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Farmoyish_${document?.code || "17-31"}`,
  });

  const flows = document?.payload?.flow_ids || [];

  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="full"
      className="overflow-auto"
      header={
        <div className="flex items-center justify-between w-full pr-12 font-sans">
          <div className="flex items-center gap-2">
            <FileTextIcon className="size-5 text-blue-600" />
            <span className="font-semibold text-gray-800">
              Farmoyishni ko'rish (17-31)
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
      <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-content, .print-content * {
                        visibility: visible;
                    }
                    .print-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    @page {
                        size: A4 landscape;
                        margin: 1.5cm 3cm;
                    }
                }
            `}</style>

      <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-screen">
        <div
          ref={contentRef}
          className="print-content bg-white w-full max-w-[1200px] shadow-2xl relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 leading-tight"
          style={{
            fontFamily: '"Times New Roman", Times, serif',
            paddingLeft: "3cm",
            paddingRight: "3cm",
            paddingTop: "1.5cm",
            paddingBottom: "1.5cm",
          }}
        >
          <DocumentHeader />

          <div className="text-center font-bold text-[17px] mb-2 leading-tight mt-6">
            <p>"O'zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
            <p>respublika markazi" davlat unitar korxonasi</p>
            <p className="mt-2 tracking-[0.2em] text-[18px]">FARMOYISHI</p>
          </div>

          <div className="flex justify-between font-bold py-1 mb-4 text-[14px]">
            <div>
              SANA:{" "}
              <span>
                {document?.order_date
                  ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
                  : "____-yil __-________"}
              </span>
            </div>
            <div>№ {document?.code || "17-31"}</div>
            <div>Nusxa: 1</div>
          </div>

          <div className="w-full" style={{ overflowX: "visible" }}>
            <table
              className="w-full text-[11px]"
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
              }}
            >
              <thead>
                <tr className="bg-gray-50">
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    ID
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Xalqaro raqam
                  </th>
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
                    № stm
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Oqim raqami
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    p.B
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Multipleksor B
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Iste'molchi
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Farmoyish №
                  </th>
                  <th style={{ border: "1px solid black", padding: "4px" }}>
                    Manfaatdorlik
                  </th>
                </tr>
              </thead>
              <tbody>
                {flows.map((flow: any) =>
                  flow.route.map((route: any, rIdx: number) => (
                    <tr key={`${flow._id}-${rIdx}`} className="text-center">
                      {rIdx === 0 && (
                        <td
                          className="align-middle"
                          rowSpan={flow.route.length}
                          style={{ border: "1px solid black", padding: "4px" }}
                        >
                          {flow.flow_id}
                        </td>
                      )}
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {route.international_number
                          ? route.international_number
                          : "----"}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {route.forward_number}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {route.reverse_number}
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
                        {route.stm}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {route.potok_number}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {route.pb}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {route.mux_b}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "4px",
                          textAlign: "left",
                        }}
                      >
                        {route.consumer}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {route.order_number}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {route.interest_level}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MyModal>
  );
};

export default OrderApplicationView1731;
