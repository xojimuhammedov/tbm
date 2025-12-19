import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Num3ApplicationInterface } from "../interfaces/Num3.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";

interface BApplicationDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: Num3ApplicationInterface | null;
}

const BApplicationDocumentView = ({
                                    open,
                                    onOpenChange,
                                    document,
                                  }: BApplicationDocumentViewProps) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Hujjat_${document?.request_number || "3-3-shakl"}`,
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
              {t("Farmoyishlar bajarilganligi to'g'risida ma'lumot")}
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
            <div className="absolute top-8 right-8 text-[12px] font-bold print:static print:text-right print:mb-2">
              RH 45-252:2013
            </div>

            <div className="text-right mb-4">
              <p className="font-bold text-[14px]">B ilova</p>
              <p className="text-[12px] italic">(majburiy)</p>
            </div>

            <div className="text-center mb-6">
              <h2 className="font-bold text-[16px] uppercase">
                «UzTTBRM» DUK farmoyishlari bajarilganligi to‘g‘risida ma’lumot shakli
              </h2>
              <div className="w-full border-t border-dashed border-black my-4"></div>
              <p className="text-[11px] text-right font-bold">3.3-shakl</p>
            </div>

            <div className="text-center mb-6 px-10">
              <p className="text-[14px] font-bold leading-tight">
                «UzTTBRM» DUKning aloqalarni shakllantirish/tugatish/qayta
                shakllantirish/blokirovkalash/blokdan chiqarish bo‘yicha
                farmoyishlarining bajarilishi to‘g‘risida
              </p>
              <p className="mt-4 uppercase text-[16px]">
              <span className="inline-block border-b-2 border-black px-4 min-w-[120px] font-bold">
                {document?.request_number || "_________"}
              </span>{" "}
                -son MA’LUMOT
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-[1.5px] border-black text-[11px]">
                <thead>
                <tr className="bg-gray-50 text-center">
                  <th className="border-[1.5px] border-black p-1 w-8">T.r.</th>
                  <th className="border-[1.5px] border-black p-1 leading-tight">
                    «UzTTBRM» DUK farmoyishining raqami va sanasi
                  </th>
                  <th className="border-[1.5px] border-black p-1 leading-tight">
                    Farmoyishda ko‘rsatilgan bajarish muddati
                  </th>
                  <th className="border-[1.5px] border-black p-1 leading-tight">
                    Farmoyish haqiqatda bajarilganligi
                  </th>
                  <th className="border-[1.5px] border-black p-1 leading-tight">
                    Farmoyishni bajarish uchun javobgarlar
                  </th>
                  <th className="border-[1.5px] border-black p-1 leading-tight">
                    Iste’molchi (aloqani qabul qilgan iste’molchining familiyasi)
                  </th>
                  <th className="border-[1.5px] border-black p-1 leading-tight">
                    Bajarilmaganlik sababi
                  </th>
                  <th className="border-[1.5px] border-black p-1">Izoh*</th>
                </tr>
                </thead>
                <tbody>
                <tr className="h-14 text-center">
                  <td className="border-[1.5px] border-black">1</td>
                  <td className="border-[1.5px] border-black font-medium">
                    {document?.request_number} <br />
                    {document?.created_at
                        ? dateFormatter(document.created_at, DATE)
                        : ""}
                  </td>
                  <td className="border-[1.5px] border-black">
                    {document?.created_at
                        ? dateFormatter(document.created_at, DATE)
                        : ""}
                  </td>
                  <td className="border-[1.5px] border-black font-medium">Bajarildi</td>
                  <td className="border-[1.5px] border-black font-semibold uppercase">
                    {document?.ap_input}
                  </td>
                  <td className="border-[1.5px] border-black font-semibold uppercase">
                    {document?.ubp_input}
                  </td>
                  <td className="border-[1.5px] border-black">-</td>
                  <td className="border-[1.5px] border-black">-</td>
                </tr>
                {[2, 3].map((i) => (
                    <tr key={i} className="h-10">
                      <td className="border-[1.5px] border-black text-center">{i}</td>
                      {Array(7)
                          .fill(0)
                          .map((_, idx) => (
                              <td key={idx} className="border-[1.5px] border-black"></td>
                          ))}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-[11px]">
              <p>
                * Farmoyishni bajarish imkoniyati bo‘lmaganida izohda farmoyishni
                bajarishning yangi muddatlari ko‘rsatiladi
              </p>
            </div>

            <div className="mt-12 space-y-12 text-[14px]">
              <div className="flex gap-4">
                <span className="font-bold">1.</span>
                <div className="flex-1 flex flex-col">
                  <div className="min-h-[24px] px-2 font-bold text-[15px] italic uppercase">
                    {document?.ap_input}
                  </div>
                  <div className="border-t-2 border-black"></div>
                  <div className="text-[11px] text-center pt-1 italic font-medium text-gray-700">
                    (AP raqami, bajaruvchining ismi-sharifi, familiyasi va sana)
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-bold">2.</span>
                <div className="flex-1 flex flex-col">
                  <div className="min-h-[24px] px-2 font-bold text-[15px] italic uppercase">
                    {document?.ubp_input}
                  </div>
                  <div className="border-t-2 border-black"></div>
                  <div className="text-[11px] text-center pt-1 italic font-medium text-gray-700">
                    (UBP raqami, bajaruvchining ismi-sharifi, familiyasi va sana)
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full border-t-2 border-dashed border-black mt-16"></div>
          </div>
        </div>
      </MyModal>
  );
};

export default BApplicationDocumentView;