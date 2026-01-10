import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";

interface FlowViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: any | null;
}
const FlowView = ({ open, onOpenChange, document }: FlowViewProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="5xl"
      className="overflow-auto"
    >
      <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-[80vh]">
        <div
          ref={contentRef}
          style={{ fontFamily: '"Times New Roman", serif' }}
          className="bg-white w-full max-w-[800px] shadow-2xl p-8 md:p-12 relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-8 leading-tight"
        >
          <div className="mb-8">
            <table className="w-full border-collapse border border-black text-base">
              <tbody>
                <tr>
                  <td className="border border-black p-3 bg-gray-50 font-bold w-1/3">
                    Flow ID:
                  </td>
                  <td className="border border-black p-3">
                    {document?.code || "---"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-3 bg-gray-50 font-bold w-1/3">
                    A punkti:
                  </td>
                  <td className="border border-black p-3">
                    {document?.point_a || "---"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-3 bg-gray-50 font-bold">
                    B punkti:
                  </td>
                  <td className="border border-black p-3">
                    {document?.point_b || "---"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-3 bg-gray-50 font-bold">
                    Signal darajasi:
                  </td>
                  <td className="border border-black p-3">
                    {document?.signal_level || "---"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {document?.organization_order?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-base mb-3 underline">
                Oxirgi yaratilgan farmoyish:
              </h3>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="border border-black p-3">
                  <p className="font-bold mb-1">Farmoyish sanasi:</p>
                  <p>
                    {document?.organization_order?.[0]?.order_date ||
                      "Mavjud emas"}
                  </p>
                </div>
                <div className="border border-black p-3">
                  <p className="font-bold mb-1">Farmoyish raqami:</p>
                  <p>
                    {document?.organization_order?.[0]?.order_code ||
                      "Mavjud emas"}
                  </p>
                </div>
              </div>
            </div>
          )}
          {document?.organization_order?.length > 1 && (
            <div className="mb-8">
              <h3 className="font-bold text-base mb-3 underline">
                Arxivdagi farmoyishlar:
              </h3>
              {document?.organization_order?.slice(1)?.map((item: any) => (
                <div className="grid grid-cols-2 my-4 text-base">
                  <div className="border border-black p-3">
                    <p className="font-bold mb-1">Farmoyish sanasi:</p>
                    <p>{item?.order_date || "Mavjud emas"}</p>
                  </div>
                  <div className="border border-black p-3">
                    <p className="font-bold mb-1">Farmoyish raqami:</p>
                    <p>{item?.order_code || "Mavjud emas"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {document?.dissolution_order?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-base mb-3 underline">
                Bekor qilingan oxirgi farmoyish:
              </h3>
              <div className="grid grid-cols-2 my-4 text-base">
                <div className="border border-black p-3">
                  <p className="font-bold mb-1">Farmoyish sanasi:</p>
                  <p>
                    {document?.dissolution_order?.[0]?.order_date ||
                      "Mavjud emas"}
                  </p>
                </div>
                <div className="border border-black p-3">
                  <p className="font-bold mb-1">Farmoyish raqami:</p>
                  <p>
                    {document?.dissolution_order?.[0]?.order_code ||
                      "Mavjud emas"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {document?.dissolution_order?.length > 1 && (
            <div className="mb-8">
              <h3 className="font-bold text-base mb-3 underline">
                Bekor qilingan arxivdagi farmoyishlar:
              </h3>
              {document?.dissolution_order?.slice(1)?.map((item: any) => (
                <div className="grid grid-cols-2 my-4 text-base">
                  <div className="border border-black p-3">
                    <p className="font-bold mb-1">Farmoyish sanasi:</p>
                    <p>{item?.order_date || "Mavjud emas"}</p>
                  </div>
                  <div className="border border-black p-3">
                    <p className="font-bold mb-1">Farmoyish raqami:</p>
                    <p>{item?.order_code || "Mavjud emas"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {document?.note && (
            <div className="mb-10">
              <p className="font-bold text-base mb-1">Izoh:</p>
              <p className="text-[13px] italic border-b border-black pb-1">
                {document.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </MyModal>
  );
};

export default FlowView;
