import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { Download } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";

interface FlowViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: any | null;
}

const FlowView = ({
  open,
  onOpenChange,
  document: flowData,
}: FlowViewProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadFile = async (baseFile: string) => {
    try {
      const fileUrl = `/api/upload/${baseFile}`;

      const response = await fetch(fileUrl);

      if (!response.ok) {
        console.error("File topilmadi:", response.status);
        alert("Faylni yuklab olishda xatolik yuz berdi");
        return;
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = window.document.createElement("a"); // window.document ishlatildi
      link.href = blobUrl;
      link.download = baseFile;
      window.document.body.appendChild(link);
      link.click();

      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("File yuklab olishda xatolik:", error);
      alert("Faylni yuklab olishda xatolik yuz berdi");
    }
  };

  const renderOrderItem = (item: any) => (
    <div className="grid grid-cols-2 my-4 text-base">
      <div className="border border-black p-3">
        <p className="font-bold mb-1">Farmoyish sanasi:</p>
        <p>{item?.order_date || "Mavjud emas"}</p>
      </div>
      <div className="border border-black p-3">
        <p className="font-bold mb-1">Farmoyish raqami:</p>
        <div className="flex items-center gap-2">
          <p>{item?.order_code || "Mavjud emas"}</p>
          {item?.base_file && (
            <MyTooltip content="Faylni yuklab olish">
              <Download
                className="size-4 cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDownloadFile(item.base_file);
                }}
              />
            </MyTooltip>
          )}
        </div>
      </div>
    </div>
  );

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
                    {flowData?.code || "---"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-3 bg-gray-50 font-bold w-1/3">
                    A punkti:
                  </td>
                  <td className="border border-black p-3">
                    {flowData?.point_a || "---"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-3 bg-gray-50 font-bold">
                    B punkti:
                  </td>
                  <td className="border border-black p-3">
                    {flowData?.point_b || "---"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-3 bg-gray-50 font-bold">
                    Signal darajasi:
                  </td>
                  <td className="border border-black p-3">
                    {flowData?.signal_level || "---"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {flowData?.organization_order?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-base mb-3 underline">
                Oxirgi yaratilgan farmoyish:
              </h3>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="border border-black p-3">
                  <p className="font-bold mb-1">Farmoyish sanasi:</p>
                  <p>
                    {flowData?.organization_order?.[0]?.order_date ||
                      "Mavjud emas"}
                  </p>
                </div>
                <div className="border border-black p-3">
                  <p className="font-bold mb-1">Farmoyish raqami:</p>
                  <div className="flex items-center gap-2">
                    <p>
                      {flowData?.organization_order?.[0]?.order_code ||
                        "Mavjud emas"}
                    </p>
                    {flowData?.organization_order?.[0]?.base_file && (
                      <MyTooltip content="Faylni yuklab olish">
                        <Download
                          className="size-4 cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDownloadFile(
                              flowData.organization_order[0].base_file,
                            );
                          }}
                        />
                      </MyTooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {flowData?.organization_order?.length > 1 && (
            <div className="mb-8">
              <h3 className="font-bold text-base mb-3 underline">
                Arxivdagi farmoyishlar:
              </h3>
              {flowData?.organization_order
                ?.slice(1)
                ?.map((item: any, index: number) => (
                  <div key={index}>{renderOrderItem(item)}</div>
                ))}
            </div>
          )}

          {flowData?.dissolution_order?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-base mb-3 underline">
                Bekor qilingan oxirgi farmoyish:
              </h3>
              <div className="grid grid-cols-2 my-4 text-base">
                <div className="border border-black p-3">
                  <p className="font-bold mb-1">Farmoyish sanasi:</p>
                  <p>
                    {flowData?.dissolution_order?.[0]?.order_date ||
                      "Mavjud emas"}
                  </p>
                </div>
                <div className="border border-black p-3">
                  <p className="font-bold mb-1">Farmoyish raqami:</p>
                  <div className="flex items-center gap-2">
                    <p>
                      {flowData?.dissolution_order?.[0]?.order_code ||
                        "Mavjud emas"}
                    </p>
                    {flowData?.dissolution_order?.[0]?.base_file && (
                      <MyTooltip content="Faylni yuklab olish">
                        <Download
                          className="size-4 cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDownloadFile(
                              flowData.dissolution_order[0].base_file,
                            );
                          }}
                        />
                      </MyTooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {flowData?.dissolution_order?.length > 1 && (
            <div className="mb-8">
              <h3 className="font-bold text-base mb-3 underline">
                Bekor qilingan arxivdagi farmoyishlar:
              </h3>
              {flowData?.dissolution_order
                ?.slice(1)
                ?.map((item: any, index: number) => (
                  <div key={index}>{renderOrderItem(item)}</div>
                ))}
            </div>
          )}

          {flowData?.note && (
            <div className="mb-10">
              <p className="font-bold text-base mb-1">Izoh:</p>
              <p className="text-[13px] italic border-b border-black pb-1">
                {flowData.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </MyModal>
  );
};

export default FlowView;
