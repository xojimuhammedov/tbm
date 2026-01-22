import {useRef} from "react";
import {MyModal} from "@/shared/components/moleculas/modal";
import {FileTextIcon, DownloadIcon} from "lucide-react";
import {useTranslation} from "react-i18next";
import {dateFormatter} from "@/shared/utils/utils";
import {useReactToPrint} from "react-to-print";
import {Button} from "dgz-ui/button";
import {OrderApplication} from "@/pages/rh-252/a-252/interfaces/order.interface.ts";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document?: OrderApplication | null;
}

const OrderApplicationView1733 = ({open, onOpenChange, document}: Props) => {
    const {t} = useTranslation();
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: contentRef,
        documentTitle: `Farmoyish_17-33_${document?.code || ""}`,
    });

    const payload = (document as any)?.payload;
    const basic = payload?.basic;
    const channels = payload?.delete?.channels || [];
    const responsible = document?.responsible;

    return (
        <MyModal
            open={open}
            onOpenChange={onOpenChange}
            size="8xl"
            className="overflow-auto"
            header={
                <div className="flex items-center justify-between w-full pr-12 font-sans">
                    <div className="flex items-center gap-2">
                        <FileTextIcon className="size-5 text-blue-600"/>
                        <span className="font-semibold text-gray-800">
              {t("Zaxira AAG kanallarini o‘chirish farmoyishi")}
            </span>
                    </div>
                    <Button
                        onClick={() => handlePrint()}
                        variant="default"
                        size="sm"
                        className="flex items-center gap-2 h-9 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
                    >
                        <DownloadIcon className="size-4"/>
                        <span className="text-xs font-bold uppercase">PDF YUKLASH</span>
                    </Button>
                </div>
            }
        >
            <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-screen">
                <div
                    ref={contentRef}
                    style={{
                        fontFamily: '"Times New Roman", Times, serif',
                        paddingLeft: '3cm',
                        paddingRight: '3cm',
                        paddingTop: '1.5cm',
                        paddingBottom: '1.5cm'
                    }}
                    className="bg-white w-full max-w-[950px] shadow-2xl  relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-10 leading-tight"
                >

                    <style dangerouslySetInnerHTML={{ __html: `
                        @page {
                            size: auto;
                            margin: 0;
                        }
                        @media print {
                            body { margin: 0; }
                            div[ref="contentRef"] {
                                padding-left: 3cm !important;
                                padding-right: 3cm !important;
                                padding-top: 1.5cm !important;
                                padding-bottom: 1.5cm !important;
                            }
                        }
                    `}} />

                    <DocumentHeader />
                    <div className="text-center uppercase font-bold text-[15px] mb-4 leading-tight">
                        <p>“O‘zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
                        <p>respublika markazi” davlat unitar korxonasi</p>
                        <p className="mt-4 tracking-[0.2em] text-[18px]">FARMOYISHI</p>
                    </div>
                    <div className="flex justify-between font-bold py-1 mb-6 text-[14px] border-b border-black pb-2">
                        <div>
                            SANA: {document?.order_date ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM") : "____-yil __-________"}
                        </div>
                        <div className="uppercase">
                            № {document?.code || "17-33-26/2276"}
                        </div>
                        <div>SONI: 1</div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-y-2 mb-8 text-[15px]">
                        <span className="font-bold italic">Kimga:</span>
                        <div className="font-bold uppercase">
                            {document?.to?.map((item: string, i: number) => (
                                <p key={i} className="mb-1">{item}</p>
                            )) || "________________"}
                        </div>
                    </div>
                    <div className="text-center font-bold text-[16px] mb-8 uppercase">
                        Zaxira AAG kanallarni o‘chirish to‘g‘risida
                    </div>
                    <div className="text-[15px] text-justify space-y-4 mb-6 leading-relaxed">
                        <p className="indent-12">
                            {basic?.organization_name || "________________"}ning {basic?.request_date ? dateFormatter(basic.request_date, "YYYY-yil DD-MMMM") : "____-yil __-________"}dagi {basic?.request_number || "____"}-son
                            bildirgisiga binoan tarmoqda tashkil qilingan asosiy kanallar o‘chirilganligi sababli
                            {basic?.deadline ? dateFormatter(basic.deadline, "YYYY-yil DD-MMMM") : "____-yildan"} boshlab
                            ushbu kanallar uchun ishlagan quyidagi zaxira (AAG) kanallari o‘chirilsin:
                        </p>
                    </div>
                    <div className="space-y-3 mb-8 text-[15px] ml-4">
                        {channels.map((ch: any, idx: number) => (
                            <div key={idx} className="flex">
                                <span className="mr-2">{idx + 1})</span>
                                <span>
                  <b>{ch.international_stream_number || "____"}</b> yo‘nalishidagi <b>{ch.flow_id?.code || "ID-____"}</b> oqimdagi <b>{ch.channel_number_in_stream || "____"}</b> kanallar;
                </span>
                            </div>
                        ))}
                    </div>

                    <div className="text-[15px] mb-12 text-justify leading-relaxed">
                        <p>
                            Shuningdek zaxira (AAG) kanallari o‘chirilgandan so‘ng bo‘shagan
                            {channels.length > 0 && (
                                <span className="font-bold mx-1">
                                    1x2 Mbit/s {channels[0]?.flow_id?.code || "ID-3623"}
      </span>
                            )}
                            oqim ishlab chiqarish ehtiyoji yo‘qligi sababli tarmoqdan o‘chirilsin.
                        </p>
                    </div>

                    <div className="mt-20 space-y-4 text-[15px]">
                        <p>
                            <b>Oqimni o‘chirish bo‘yicha mas’ul</b> – tarmoq administratori
                            (<b>{responsible?.first_name} {responsible?.second_name}</b>).
                        </p>
                        <p>
                            <b>Kanallarni o‘chirish hamda 3.3-son shakl ma’lumot berish bo‘yicha mas’ul</b> – MBB-1.
                        </p>
                    </div>
                </div>
            </div>
        </MyModal>
    );
};

export default OrderApplicationView1733;