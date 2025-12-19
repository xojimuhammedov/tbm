import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";
import { FApplicationInterface } from "../interfaces/f-252.interface";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";

interface FApplicationViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: FApplicationInterface | null;
}

const FApplicationView = ({
  open,
  onOpenChange,
  document,
}: FApplicationViewProps) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `F_Ilova_${document?.request_number || "3-3T-shakl"}`,
  });

  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="8xl"
      className="overflow-auto"
      header={
        <div className="flex items-center justify-between w-full pr-12 font-sans">
          <div className="flex items-center gap-2">
            <FileTextIcon className="size-5 text-blue-600" />
            <span className="font-semibold text-gray-800">
              {t("Ma'lumotni ko'rish (F ilova)")}
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
      <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-screen">
        <div
          ref={contentRef}
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
          className="bg-white w-full max-w-[1000px] shadow-2xl p-8 md:p-12 relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-8 leading-tight"
        >
          <div className="absolute top-8 right-8 text-right print:static print:text-right print:mb-2">
            <p className="text-[12px] font-bold">RH 45-252:2013</p>
          </div>

          <div className="text-center mb-6">
            <p className="font-bold text-[18px]">F ilova</p>
            <p className="text-[14px] italic">(majburiy)</p>
          </div>

          <div className="text-center mb-10">
            <h2 className="font-bold text-[16px] uppercase leading-tight max-w-[750px] mx-auto">
              «O‘zbektelekom» AK farmoyishlari bajarilganligi to‘g‘risida
              ma’lumot shakli
            </h2>
            <div className="w-full border-t border-dashed border-black my-6"></div>
            <p className="text-[11px] text-right font-bold uppercase tracking-tighter">
              3.3T-shakl
            </p>
          </div>

          <div className="text-center mb-8 px-10">
            <p className="text-[15px] font-bold leading-tight">
              «O‘zbektelekom» AK filiallarining farmoyishlari asosida aloqalarni
              tashkil etish to‘g‘risida
            </p>
            <p className="mt-4 uppercase text-[16px]">
              <span className="inline-block border-b border-black px-6 min-w-[80px] font-bold">
                {document?.request_number || "_________"}
              </span>{" "}
              - son MA’LUMOT
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-black text-[12px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-black p-2 w-10 text-center">
                    T/r
                  </th>
                  <th className="border border-black p-2 text-center w-1/4">
                    «O‘zbektelekom» AK filiali farmoyishining raqami va sanasi
                  </th>
                  <th className="border border-black p-2 text-center">
                    Aloqalarni tashkil etish sanasi
                  </th>
                  <th className="border border-black p-2 text-center w-1/3">
                    Tashkil etilgan aloqalar trassasi
                  </th>
                  <th className="border border-black p-2 text-center">Izoh*</th>
                </tr>
              </thead>
              <tbody>
                {document?.data && document.data.length > 0
                  ? document.data.map((item, index) => (
                      <tr key={index} className="min-h-[45px]">
                        <td className="border border-black p-2 text-center font-bold">
                          {index + 1}
                        </td>
                        <td className="border border-black p-2 text-center">
                          {item.order_code}
                        </td>
                        <td className="border border-black p-2 text-center">
                          {item.connection_established_date
                            ? dateFormatter(
                                item.connection_established_date,
                                DATE,
                              )
                            : ""}
                        </td>
                        <td className="border border-black p-2">
                          {item.connection_route_details}
                        </td>
                        <td className="border border-black p-2 text-center">
                          {item.comment}
                        </td>
                      </tr>
                    ))
                  : [1, 2, 3].map((i) => (
                      <tr key={i} className="h-10">
                        <td className="border border-black text-center">{i}</td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] mb-12">
            * Farmoyishni bajarish imkoniyati bo‘lmaganida izohda farmoyishni
            bajarishning yangi muddatlari ko‘rsatiladi.
          </p>

          <div className="mt-10 space-y-12 max-w-[600px]">
            <div className="flex gap-4">
              <span className="font-bold text-[14px]">1.</span>
              <div className="flex-1 flex flex-col">
                <div className="min-h-[26px] px-2 font-bold border-b border-black text-center">
                  {document?.ap_input || ""}
                </div>
                <div className="text-[11px] text-center pt-1">
                  (AP raqami, bajaruvchining ismi-sharifi, familiyasi va sana)
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-[14px]">2.</span>
              <div className="flex-1 flex flex-col">
                <div className="min-h-[26px] px-2 font-bold border-b border-black text-center">
                  {document?.ubp_input || ""}
                </div>
                <div className="text-[11px] text-center pt-1">
                  (UBP raqami, bajaruvchining ismi-sharifi, familiyasi va sana)
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-dashed border-black mt-16"></div>
        </div>
      </div>
    </MyModal>
  );
};

export default FApplicationView;
