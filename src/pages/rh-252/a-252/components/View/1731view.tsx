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
                    body * { visibility: hidden; }
                    .print-content, .print-content * { visibility: visible; }
                    .print-content {
                        position: absolute;
                        left: 0; top: 0; width: 100%;
                        background: white; padding: 0 !important; margin: 0 !important;
                    }
                    @page {
                        size: A4 landscape;
                        margin: 1.5cm 2cm;
                    }
                    .no-break {
                        break-inside: avoid;
                    }
                }
            `}</style>

            <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-screen">
                <div
                    ref={contentRef}
                    className="print-content bg-white w-full max-w-[1200px] shadow-2xl relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0"
                    style={{
                        fontFamily: '"Times New Roman", Times, serif',
                        padding: '1.5cm 2cm'
                    }}
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
                            <span className="border-b border-black px-2">
                                {document?.order_date
                                    ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
                                    : "____-yil __-________"}
                            </span>
                        </div>
                        <div>№ {document?.code || "17-31"}</div>
                        <div>Nusxa: 1</div>
                    </div>
                    {flows.map((flow: any, fIdx: number) => (
                        <div key={flow._id || fIdx} className="no-break mb-10 last:mb-0">
                            <div className="bg-gray-50 border border-black border-b-0 p-2 font-bold text-[13px]">
                                OQIM (ID): {flow.flow_id}
                            </div>
                            <table className="w-full text-[11px]" style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                                <thead>
                                <tr className="bg-gray-100/50">
                                    <th style={{ border: '1px solid black', padding: '4px' }}>To'g'ri raqam</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>Teskari raqam</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>Port A</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>Multipleksor A</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>p.A</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>Name_MS_final</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>Tezlik</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>№ stm</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>Oqim №</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>p.B</th>
                                    <th style={{ border: '1px solid black', padding: '4px' }}>Multipleksor B</th>
                                </tr>
                                </thead>
                                <tbody>
                                {flow.route.map((route: any, rIdx: number) => (
                                    <tr key={rIdx} className="text-center">
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.forward_number}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.reverse_number}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.port_a}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.mux_a}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.pa}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.final_ms_name}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }} className="uppercase">{route.speed}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.stm}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.potok_number}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.pb}</td>
                                        <td style={{ border: '1px solid black', padding: '4px' }}>{route.mux_b}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div
                                className="grid grid-cols-2 gap-x-10 gap-y-3 p-4 border border-black border-t-0 text-[12px]"
                            >
                                <div className="flex items-end gap-2">
                                    <span className="font-bold text-gray-700 whitespace-nowrap">Xalqaro raqam:</span>
                                    <span className="border-b border-dotted border-gray-400 flex-1 pb-0.5 italic">
                                        {flow.route[0]?.international_number || "----"}
                                    </span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold text-gray-700 whitespace-nowrap">Farmoyish №:</span>
                                    <span className="border-b border-dotted border-gray-400 flex-1 pb-0.5">
                                        {flow.route[0]?.order_number || "----"}
                                    </span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold text-gray-700 whitespace-nowrap">Iste'molchi:</span>
                                    <span className="border-b border-dotted border-gray-400 flex-1 pb-0.5">
                                        {flow.route[0]?.consumer || "----"}
                                    </span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="font-bold text-gray-700 whitespace-nowrap">Manfaatdorlik:</span>
                                    <span className="border-b border-dotted border-gray-400 flex-1 pb-0.5">
                                        {flow.route[0]?.interest_level || "----"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MyModal>
    );
};

export default OrderApplicationView1731;