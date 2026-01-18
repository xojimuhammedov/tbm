import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import { OrderApplication } from "@/pages/rh-252/a-252/interfaces/order.interface.ts";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document?: OrderApplication | null;
}

const OrderApplicationView1754 = ({ open, onOpenChange, document }: Props) => {
    const { t } = useTranslation();
    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: `Farmoyish_17-54_${document?.document_index || ""}`,
    });
    const payload = (document as any)?.payload;

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
                            {t("TV-RV chiqishlari farmoyishini ko'rish")}
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
                    className="bg-white w-full max-w-[950px] shadow-2xl p-12 relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-10 leading-tight"
                >
                    <div className="text-center uppercase font-bold text-[15px] mb-2 leading-tight">
                        <p>“O‘zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
                        <p>respublika markazi” davlat unitar korxonasi</p>
                        <p className="mt-2 tracking-[0.2em] text-[18px]">FARMOYISHI</p>
                    </div>
                    <div className="flex justify-between font-bold py-1 mb-6 text-[14px]">
                        <div>
                            SANA:{" "}
                            <span className="">
                                {document?.order_date ? dateFormatter(document.order_date, "YYYY-MM-DD") : "____-yil __-________"}
                            </span>
                        </div>
                        <div>№ {document?.code || "17-54"}</div>
                        <div>SONI: 1</div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-y-2 mb-8 text-[15px]">
                        <span className="font-bold italic">Kimga:</span>
                        <div className="font-bold uppercase">
                            {document?.to?.length ? document.to.map((item, i) => (
                                <p key={i}>{item}</p>
                            )) : "________________"}
                        </div>

                        <span className="font-bold italic">Nusxasi:</span>
                        <div>
                            {document?.copy?.length ? document.copy.map((item, i) => (
                                <p key={i}>{item}</p>
                            )) : "________________"}
                        </div>
                    </div>

                    <div className="text-center font-bold text-[16px] mb-8 uppercase">
                        TV-RV chiqishlar to‘g‘risida
                    </div>

                    <div className="text-[15px] text-justify space-y-4 mb-6 leading-relaxed">
                        <p className="indent-12">
                            {payload?.basic?.organization_name || "________________"}ning{" "}
                            {payload?.basic?.request_date ? dateFormatter(payload.basic.request_date, "YYYY-yil DD-MMMM") : "____-yil __-________dagi"}dagi{" "}
                            {payload?.basic?.request_number || "____"}-son xatiga muvofiq {payload?.basic?.justification || ""} {payload?.basic?.context || ""}
                        </p>
                    </div>
                    <div className="overflow-x-auto mb-8">
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
                                        <td className="border border-black p-0">
                                            <table className="w-full h-full border-none">
                                                <tbody>
                                                    {event.schedule?.map((item: any, itemIdx: number) => (
                                                        <tr key={itemIdx} className={itemIdx !== event.schedule.length - 1 ? "border-b border-black" : ""}>
                                                            <td className="p-2 border-black w-1/3 text-center">
                                                                {dateFormatter(item.date, "YYYY-yil d-MMMM")}
                                                            </td>
                                                            <td className="p-2 border-black w-1/3  text-center font-bold">
                                                                {item.duration}
                                                            </td>
                                                            <td className={`p-2 text-center ${item.event_type === "Jonli efir" ? "font-bold" : ""}`}>
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
                        Tadbirlar yakuni bilan TV-RV chiqishlar holati yuzasidan tegishli Mintaqaviy boshqaruv bog‘lamasi tomonidan batafsil ma’lumot taqdim etilsin.
                    </p>
                </div>
            </div>
        </MyModal>
    );
};

export default OrderApplicationView1754;