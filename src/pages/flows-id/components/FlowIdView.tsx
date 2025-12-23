import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { DownloadIcon, ActivityIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface";

interface FlowViewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document?: FlowInterface | null;
}
const FlowView = ({ open, onOpenChange, document }: FlowViewProps) => {
    const { t } = useTranslation();
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: `Flow_${document?.code || "hujjat"}`,
    });

    return (
        <MyModal
            open={open}
            onOpenChange={onOpenChange}
            size="5xl"
            className="overflow-auto"
            header={
                <div className="flex items-center justify-between w-full pr-12 font-sans">
                    <div className="flex items-center gap-2">
                        <ActivityIcon className="size-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">
              {t("Oqim ma'lumotlarini ko'rish")}
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
            <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-[80vh]">
                <div
                    ref={contentRef}
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    className="bg-white w-full max-w-[800px] shadow-2xl p-8 md:p-12 relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-8 leading-tight"
                >
                    <div className="text-center mb-8">
                        <h2 className="font-bold text-[18px] uppercase leading-tight mb-2">
                            «O‘zbektelekom» AK
                        </h2>
                        <p className="text-[14px] font-bold">
                            Aloqa oqimining texnik pasporti
                        </p>
                        <div className="w-full border-t-2 border-black mt-4 mb-2"></div>
                        <p className="text-[12px] text-right">
                            Kod: <span className="font-bold">{document?.code || "---"}</span>
                        </p>
                    </div>
                    <div className="mb-8">
                        <table className="w-full border-collapse border border-black text-[14px]">
                            <tbody>
                            <tr>
                                <td className="border border-black p-3 bg-gray-50 font-bold w-1/3">
                                    A punkti (Kod):
                                </td>
                                <td className="border border-black p-3">
                                    {document?.point_a || "---"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black p-3 bg-gray-50 font-bold">
                                    A punkti (Nomi):
                                </td>
                                <td className="border border-black p-3">
                                    {document?.name_point_a ||
                                        document?.consumer_id_point_a ||
                                        "---"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black p-3 bg-gray-50 font-bold">
                                    B punkti (Kod):
                                </td>
                                <td className="border border-black p-3">
                                    {document?.point_b || "---"}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black p-3 bg-gray-50 font-bold">
                                    B punkti (Nomi):
                                </td>
                                <td className="border border-black p-3">
                                    {document?.name_point_b ||
                                        document?.consumer_name_point_b ||
                                        "---"}
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
                            <tr>
                                <td className="border border-black p-3 bg-gray-50 font-bold">
                                    Qiziqish darajasi:
                                </td>
                                <td className="border border-black p-3">
                                    {document?.interest_level || "---"}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-8">
                        <h3 className="font-bold text-[15px] mb-3 underline">
                            Tashkiliy asoslar:
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-[13px]">
                            <div className="border border-black p-3">
                                <p className="font-bold mb-1">Tashkilot buyrug'i:</p>
                                <p>{document?.organization_order || "Mavjud emas"}</p>
                            </div>
                            <div className="border border-black p-3">
                                <p className="font-bold mb-1">Deshifrovka buyruq raqami:</p>
                                <p>{document?.deciphering_order_number || "Mavjud emas"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h3 className="font-bold text-[15px] mb-3 underline">
                            Arxiv ma'lumotlari:
                        </h3>
                        <table className="w-full border-collapse border border-black text-[13px]">
                            <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-black p-2 text-left">
                                    Tashkilot arxivi
                                </th>
                                <th className="border border-black p-2 text-left">
                                    Deshifrovka arxivi
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border border-black p-3">
                                    {document?.organization_archive || "---"}
                                </td>
                                <td className="border border-black p-3">
                                    {document?.deciphering_archive || "---"}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    {document?.note && (
                        <div className="mb-10">
                            <p className="font-bold text-[14px] mb-1">Izoh:</p>
                            <p className="text-[13px] italic border-b border-black pb-1">
                                {document.note}
                            </p>
                        </div>
                    )}
                    <div className="flex justify-between items-end mt-12 pt-8 border-t border-dashed border-gray-400">
                        <div className="text-[12px]">
                            <p>Hujjat shakllantirildi:</p>
                            <p className="font-bold">
                                {document?.updated_at
                                    ? dateFormatter(document.updated_at, DATE)
                                    : new Date().toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="mb-6 font-bold">Mas'ul xodim:</p>
                            <div className="w-[150px] border-b border-black"></div>
                            <p className="text-[10px] mt-1">(imzo)</p>
                        </div>
                    </div>
                </div>
            </div>
        </MyModal>
    );
};

export default FlowView;