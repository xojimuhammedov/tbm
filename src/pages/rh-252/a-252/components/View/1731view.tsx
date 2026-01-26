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
                    className="bg-white w-full max-w-[1200px] shadow-2xl relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 leading-tight"
                >
                    <DocumentHeader />

                    <div className="text-center font-bold text-[17px] mb-2 leading-tight mt-6">
                        <p>“O‘zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
                        <p>respublika markazi” davlat unitar korxonasi</p>
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
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-black text-[11px]">
                            <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-black p-1">ID</th>
                                <th className="border border-black p-1">Xalqaro raqam</th>
                                <th className="border border-black p-1">To'g'ri raqam</th>
                                <th className="border border-black p-1">Teskari raqam</th>
                                <th className="border border-black p-1">Port A</th>
                                <th className="border border-black p-1">Multipleksor A</th>
                                <th className="border border-black p-1">p.A</th>
                                <th className="border border-black p-1">Name_MS_final</th>
                                <th className="border border-black p-1">Tezlik</th>
                                <th className="border border-black p-1">№ stm</th>
                                <th className="border border-black p-1">Oqim raqami</th>
                                <th className="border border-black p-1">p.B</th>
                                <th className="border border-black p-1">Multipleksor B</th>
                                <th className="border border-black p-1">Iste'molchi</th>
                                <th className="border border-black p-1">Farmoyish №</th>
                                <th className="border border-black p-1">Manfaatdorlik</th>
                            </tr>
                            </thead>
                            <tbody>
                            {flows.map((flow: any) => (
                                flow.route.map((route: any, rIdx: number) => (
                                    <tr key={`${flow._id}-${rIdx}`} className="text-center">
                                        {rIdx === 0 && (
                                            <td className="border border-black p-1 align-middle" rowSpan={flow.route.length}>
                                                {flow.flow_id}
                                            </td>
                                        )}
                                        <td className="border border-black p-1">{route.international_number ? route.international_number : "----"}</td>
                                        <td className="border border-black p-1">{route.forward_number}</td>
                                        <td className="border border-black p-1">{route.reverse_number}</td>
                                        <td className="border border-black p-1">{route.port_a}</td>
                                        <td className="border border-black p-1">{route.mux_a}</td>
                                        <td className="border border-black p-1">{route.pa}</td>
                                        <td className="border border-black p-1">{route.final_ms_name}</td>
                                        <td className="border border-black p-1 uppercase">{route.speed}</td>
                                        <td className="border border-black p-1">{route.stm}</td>
                                        <td className="border border-black p-1">{route.potok_number}</td>
                                        <td className="border border-black p-1">{route.pb}</td>
                                        <td className="border border-black p-1">{route.mux_b}</td>
                                        <td className="border border-black p-1 text-left">{route.consumer}</td>
                                        <td className="border border-black p-1">{route.order_number}</td>
                                        <td className="border border-black p-1">{route.interest_level}</td>
                                    </tr>
                                ))
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MyModal>
    );
};

export default OrderApplicationView1731;