import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon } from "lucide-react";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";
import { OrderApplication } from "../interfaces/order.interface";

interface ApplicationDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | null;
}

const ApplicationDocumentView = ({
  open,
  onOpenChange,
  document,
}: ApplicationDocumentViewProps) => {
  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="8xl"
      className="overflow-auto"
      header={
        <div className="flex items-center gap-2">
          <FileTextIcon className="size-5" />
          <span>{document?.title || "Application document"}</span>
        </div>
      }
    >
      <div className="py-10 px-4 flex justify-center">
        <div className="bg-white w-full max-w-[800px] shadow-2xl p-8 md:p-12 relative text-gray-900 border border-gray-200">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-5xl font-black tracking-tighter">TBM</h1>
            </div>
            <div className="text-[10px] text-center max-w-[350px] leading-tight">
              <p className="font-bold mb-5">
                "O'zbekiston telekommunikatsiya tarmoqlarini boshqarish
                respublika markazi" davlat unitar korxonasi
              </p>
              <p className="font-bold">
                "Republican telecommunications management center of Uzbekistan"
                government unitary enterprise
              </p>
            </div>
          </div>
          <div className="text-center mb-8">
            <h2 className="font-bold text-sm uppercase">
              "O'zbekiston telekommunikatsiya tarmoqlarini boshqarish respublika
              markazi" davlat unitar korxonasi
            </h2>
            <h3 className="font-bold text-lg mt-2 underline decoration-1 underline-offset-4">
              FARMOYISHI
            </h3>
          </div>
          <div className="flex justify-between items-center mb-6 text-sm">
            <div>
              <span className="font-bold">
                SANA:{" "}
                {document?.order_date
                  ? dateFormatter(document?.order_date, DATE)
                  : ""}
              </span>
            </div>
            <div className="font-bold">{document?.code}</div>
            <div className="border-2 border-black rounded-full px-4 py-1 flex items-center gap-2">
              <span className="font-bold">SONI: 1</span>
            </div>
          </div>
          <div className="mb-8 text-sm leading-relaxed">
            <div className="flex">
              <span className="font-bold w-16">Kimga:</span>
              <div className="font-bold">{document?.to}</div>
            </div>
          </div>
          <div className="text-center mb-6">
            <h4 className="font-bold text-md">
              2Mbit/s oqimlarni tarmoqdan o'chirish to'g'risida.
            </h4>
          </div>
          <div className="text-sm leading-relaxed space-y-6 text-justify">
            <p>
              “O‘zTTBRM” DUK mintaqaviy boshqaruv bog‘lamasining 2-oktabrdagi
              18-bildirgisiga binoan “O‘zbektelekom” G‘arbiy filialiga tegishli
              bo‘lgan quyidagi 51x2Mbit/s oqimlarni
              <span className="font-bold ml-1">
                {document?.dead_line
                  ? dateFormatter(document?.dead_line, DATE)
                  : ""}
              </span>{" "}
              {document?.content}
            </p>
          </div>

          {document?.create?.flows?.map((item) => (
            <div className="flex flex-col gap-2">
              <p className="mt-4">
                <span className="font-bold">{item?.point_a}</span> stansiyasida
                (0601)
                <span className="font-bold">{item?.device_a}:</span>
                <span className="font-bold">{item.port_a}</span> portlar
              </p>

              <p className="mb-4">
                <span className="font-bold">{item?.point_b}</span> stansiyasida
                (0607)
                <span className="font-bold">{item?.device_b}:</span>
                <span className="font-bold">{item.port_b}</span> portga
              </p>
            </div>
          ))}

          <p className="mb-4">
            Tashkil qilingan:{" "}
            {document?.create?.flow_ids?.map((item) => (
              <span className="font-bold">{item}, {" "}</span>
            ))}
          </p>
        </div>
      </div>
      {/* <div className="flex flex-1 flex-col xl:flex-row gap-4 overflow-hidden">
        <div
          className="
            flex-1 border rounded-lg p-2
            overflow-visible
            xl:overflow-y-auto
            xl:max-h-[80vh]
            scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full
          "
        >
          <ApplicationDocument title={document?.title} document={document} />
        </div>

        <DocumentInfo
          docType={t("Application")}
          onOpenChange={onOpenChange}
          document={document}
        />
      </div> */}
    </MyModal>
  );
};

export default ApplicationDocumentView;
