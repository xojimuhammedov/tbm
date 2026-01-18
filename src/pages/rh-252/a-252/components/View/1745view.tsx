import { useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import { OrderApplication } from "@/pages/rh-252/a-252/interfaces/order.interface.ts";

interface OrderApplicationViewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document?: OrderApplication | null;
}

const OrderApplicationView1745 = ({
    open,
    onOpenChange,
    document,
}: OrderApplicationViewProps) => {
    const { t } = useTranslation();
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: `Farmoyish_${document?.document_index || "17-45"}`,
    });

    const is1745 = document?.code === "17-45";
    const payload = is1745 ? document.payload : null;

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
                            {t("Farmoyishni ko'rish")} ({document?.code})
                        </span>
                    </div>

                    <Button
                        onClick={() => handlePrint()}
                        variant="default"
                        size="sm"
                        className="flex items-center gap-2 h-9 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                    >
                        <DownloadIcon className="size-4" />
                        <span className="text-xs font-bold uppercase">PDF YUKLASH (PRINT)</span>
                    </Button>
                </div>
            }
        >
            <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-screen">
                <div
                    ref={contentRef}
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    className="bg-white w-full max-w-[900px] shadow-2xl p-12 relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-10 leading-snug"
                >
                    <div className="text-center uppercase font-bold text-[13px] border-b-2 border-black pb-2 mb-1">
                        <p>O‘ZBEKISTON RESPUBLIKASI RAQAMLI TEXNOLOGIYALAR VAZIRLIGI</p>
                        <p className="text-[15px] mt-1">
                            “O‘ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI BOSHQARISH RESPUBLIKA MARKAZI”
                        </p>
                        <p>DAVLAT UNITAR KORXONASI</p>
                    </div>

                    <div className="text-center text-[10px] mb-4">
                        O‘zbekiston Respublikasi, Toshkent sh., 100019, Olmazor tumani, Sebzor dahasi, 18 «A» -uy <br />
                        📞: +998 71 240 27 72 | 📠: +998 71 240 54 19 | E-mail: tmc@rtmc.uz
                    </div>

                    <div className="border-t border-black mb-6">
                        <h1 className="text-center font-bold text-[22px] tracking-[0.3em] py-4 uppercase">
                            FARMOYISHI
                        </h1>
                    </div>

                    <div className="flex justify-between font-bold border-b border-black py-1 mb-8 text-[14px]">
                        <div>SANA: {document?.order_date ? dateFormatter(document.order_date, DATE) : ""}</div>
                        <div>{document?.code}-{document?.document_index}</div>
                        <div>SONI: 1</div>
                    </div>

                    <div className="space-y-4 mb-10 text-[14px]">
                        <div className="flex">
                            <span className="font-bold w-28 italic">Kimga:</span>
                            <div className="font-bold uppercase flex-1">
                                {document?.to?.map((item, i) => <p key={i}>{item}</p>)}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-28 italic">Nusxasi:</span>
                            <div className="flex-1">
                                {document?.copy?.map((item, i) => <p key={i}>{item}</p>)}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-28 italic">Kimdan:</span>
                            <div className="font-bold uppercase flex-1">“O‘zTTBRM” DUK</div>
                        </div>
                    </div>

                    <div className="text-center font-bold text-[15px] mb-8 underline uppercase px-10">
                        {payload?.basic?.signal_level} oqim yo‘nalishini o‘zgartirish va tashkil etish to‘g‘risida
                    </div>

                    <div className="text-[15px] space-y-6 text-justify">
                        <p className="indent-12 leading-relaxed">
                            “O‘zbektelekom” AK {payload?.basic?.organization_name}ning{" "}
                            {payload?.basic?.request_date ? dateFormatter(payload.basic.request_date, "yyyy-yil d-martdagi") : ""}{" "}
                            {payload?.basic?.request_number}-son murojaatiga binoan, {payload?.basic?.justification} uchun{" "}
                            <span className="font-bold underline italic">
                                {document?.order_date ? dateFormatter(document.order_date, "yyyy-yil d-martdan") : ""}
                            </span>{" "}
                            quyidagi ishlar amalga oshirilsin:
                        </p>

                        <div className="space-y-8">
                            {payload?.update?.flows?.map((flow, index) => (
                                <div key={`upd-${index}`} className="pl-4">
                                    <p className="font-medium">
                                        {index + 1}. {flow.code} yo‘nalishidagi {payload?.basic?.signal_level} oqim (ID-{flow.code}) {flow.point_b} yo‘nalishga o‘zgartirilsin:
                                    </p>
                                    <div className="pl-12 mt-2 space-y-1 italic text-[14px]">
                                        <p>Oldin: {flow.point_a} ({flow.device_a}) – {flow.point_b} ({flow.device_b})</p>
                                        <p className="font-bold not-italic">
                                            Hozir: {flow.point_a} ({flow.device_a}) – <span className="underline">{flow.point_b}</span> ({flow.device_b})
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {payload?.create?.flow_ids?.map((flow, index) => {
                                const startIdx = (payload?.update?.flows?.length || 0) + index + 1;
                                return (
                                    <div key={`cre-${index}`} className="pl-4">
                                        <p className="font-medium">
                                            {startIdx}. {flow.point_a} – {flow.point_b} oralig‘ida {flow.signal_level || payload?.basic?.signal_level} oqim tashkil etilsin
                                        </p>
                                        <div className="pl-12 mt-1 text-[14px]">
                                            <p>{flow.point_a} ({flow.port_a}) – {flow.point_b} ({flow.port_b})</p>
                                            <p className="font-bold">Ushbu oqimga ID-{flow.code} biriktirilsin</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </MyModal>
    );
};

export default OrderApplicationView1745;