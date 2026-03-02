import {JSX, useRef} from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import { OrderApplication } from "@/pages/rh-252/a-252/interfaces/order.interface.ts";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | null;
}

const OrderApplicationView1745 = ({ open, onOpenChange, document }: Props) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Farmoyish_${document?.code || ""}`,
  });

  const payload = (document as any)?.payload;
  const basic = payload?.basic;
  const director = document?.director;

  // basic.actions arrayidagi tartibga qarab ishlash
  const actions: string[] = basic?.actions || [];

  const hasCreate = actions.includes("create") && payload?.create?.flow_ids?.length > 0;
  const hasUpdate =
      actions.includes("update") &&
      (payload?.update?.channels?.length > 0 || payload?.update?.flows?.length > 0);
  const hasDelete =
      actions.includes("delete") &&
      (
          payload?.delete?.channels?.length > 0 ||
          payload?.delete?.channel_ids?.length > 0 ||
          payload?.delete?.flow_ids?.length > 0
      );

  // Sarlavhani actions tartibiga qarab yasash
  const getDynamicTitle = () => {
    const signal = basic?.signal_level || "2 Mbit/s";
    const actionLabels: string[] = [];

    for (const action of actions) {
      if (action === "create" && hasCreate) actionLabels.push("tashkil etish");
      if (action === "update" && hasUpdate) actionLabels.push("yo'nalishini o'zgartirish");
      if (action === "delete" && hasDelete) actionLabels.push("o'chirish");
    }

    if (actionLabels.length === 0) return `${signal} oqimlar to'g'risida`;

    const actionText =
        actionLabels.length > 1
            ? actionLabels.slice(0, -1).join(", ") + " va " + actionLabels.slice(-1)
            : actionLabels[0];

    return `${signal} oqimni ${actionText} to'g'risida`;
  };

  // Render sections in actions order
  const renderSections = () => {
    let step = 0;
    const sections: JSX.Element[] = [];

    for (const action of actions) {
      // CREATE
      if (action === "create" && hasCreate) {
        step++;
        sections.push(
            <div key="create" className="pl-4">
              <p>
                {step}. Tegishli manzillar oralig'idagi oqimlar quyidagicha tashkil etilsin va
                ma'lumot o'rnida qabul qilinsin:
              </p>
              <div className="pl-12 mt-2">
                {payload.create.flow_ids.map((item: any, i: number) => (
                    <p key={`cre-${i}`} className="leading-relaxed">
                      {item.point_a} ({item.device_a || ""}) – {item.point_b} ({item.device_b || ""}){" "}
                      oralig'idagi{" "}
                      <span>{item.signal_level || basic?.signal_level}</span> oqim UFTF{" "}
                      <span className="font-bold">{item.code}</span>
                    </p>
                ))}
              </div>
            </div>
        );
      }

      // UPDATE - channels
      if (action === "update" && hasUpdate) {
        // channels
        for (const item of payload?.update?.channels || []) {
          step++;
          sections.push(
              <div key={`upd-ch-${step}`} className="pl-4">
                <p>
                  {step}. {item.old?.international_stream_number} yo'nalishidagi{" "}
                  {basic?.signal_level} oqim {item.new?.international_stream_number}{" "}
                  yo'nalishiga quyidagicha o'zgartirilsin:
                </p>
                <div className="pl-12 mt-2 text-[14px]">
                  <p>Oldin: {item.old?.international_stream_number} (Kod: {item.old?.code})</p>
                  <p>Hozir: {item.new?.international_stream_number} (Kod: {item.new?.code})</p>
                </div>
              </div>
          );
        }

        // flows
        for (const item of payload?.update?.flows || []) {
          step++;
          const old = item.old;
          const nw = item.new;
          sections.push(
              <div key={`upd-fl-${step}`} className="pl-4">
                <p>
                  {step}. {old?.point_a} – {old?.point_b} yo'nalishidagi {basic?.signal_level} oqim
                  ({old?.code}) {nw?.point_a} – {nw?.point_b} yo'nalishga o'zgartirilsin
                  quyidagicha o'zgartirilsin:
                </p>
                <div className="pl-12 mt-2 text-[14px]">
                  <p>
                    Oldin: {old?.point_a}
                    {old?.device_a ? ` (${old.device_a}` : ""}
                    {old?.port_a ? `&${old.port_a})` : old?.device_a ? ")" : ""} –{" "}
                    {old?.point_b}
                    {old?.device_b ? ` (${old.device_b}` : ""}
                    {old?.port_b ? `&${old.port_b})` : old?.device_b ? ")" : ""}
                  </p>
                  <p>
                    Hozir: {nw?.point_a}
                    {nw?.device_a ? ` (${nw.device_a}` : ""}
                    {nw?.port_a ? `&${nw.port_a})` : nw?.device_a ? ")" : ""} –{" "}
                    {nw?.point_b}
                    {nw?.device_b ? ` (${nw.device_b}` : ""}
                    {nw?.port_b ? `&${nw.port_b})` : nw?.device_b ? ")" : ""}
                  </p>
                </div>
              </div>
          );
        }
      }

      // DELETE
      if (action === "delete" && hasDelete) {
        step++;

        // Barcha o'chiriladigan kodlarni to'plash
        const deleteCodes: string[] = [
          ...(payload?.delete?.channels || []),
          ...(payload?.delete?.channel_ids || []),
          ...(payload?.delete?.flow_ids || []).map((f: any) => f.code || f._id),
        ].filter(Boolean);

        sections.push(
            <div key="delete" className="pl-4">
              <p>
                {step}. Xizmat ehtiyoji yo'qligi sababli quyidagi {basic?.signal_level} oqimlar
                o'chirilsin:
              </p>
              <p className="pl-12 font-bold italic mt-1">{deleteCodes.join(", ")}</p>
            </div>
        );
      }
    }

    return sections;
  };

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
                paddingLeft: "3cm",
                paddingRight: "3cm",
                paddingTop: "1.5cm",
                paddingBottom: "1.5cm",
              }}
              className="bg-white w-full max-w-[950px] min-h-[1100px] flex flex-col shadow-2xl relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-10 leading-tight"
          >
            <DocumentHeader />
            <div className="text-center font-bold text-[14px] uppercase">
              O'ZBEKISTON RESPUBLIKASI RAQAMLI TEXNOLOGIYALAR VAZIRLIGI
            </div>
            <div className="text-center font-bold text-[15px] uppercase">
              "O'ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI
            </div>
            <div className="text-center font-bold text-[15px] uppercase">
              BOSHQARISH RESPUBLIKA MARKAZI"
            </div>
            <div className="text-center font-bold text-[14px] uppercase mb-4">
              DAVLAT UNITAR KORXONASI
            </div>

            <div className="border-t-2 border-black mb-2"></div>
            <div className="text-center text-[10px] leading-tight mb-1 italic">
              O'zbekiston Respublikasi, Toshkent shahri, Mirzo Ulug'bek tumani,
              Navnihol MFY, Tepamasjid ko'chasi, 4-uy
              <br />
              ☎: +998 71 240 27 72 📠: +998 71 240 54 19
              <br />
              E-mail: tmc@rtmc.uz
            </div>
            <div className="border-t-2 border-black mb-5"></div>

            <div className="text-center font-bold text-[22px] tracking-[0.3em] mb-4">
              FARMOYISHI
            </div>

            <div className="flex justify-between font-bold py-1 mb-5 text-[14px]">
              <div>
                SANA:{" "}
                {document?.order_date
                    ? dateFormatter(document.order_date, "DD.MM.YYYY", "uz")
                    : "____.____._______"}
                -yil
              </div>
              <div>№ {document?.code || "17-45"}</div>
              <div>SONI: 1</div>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-y-1 mb-8 text-[15px]">
              <span className="font-bold italic">Kimga:</span>
              <div className="font-bold uppercase">
                {document?.to?.map((item, i) => (
                    <p key={i}>{item}</p>
                ))}
              </div>
              <span className="font-bold italic">Nusxasi:</span>
              <div>
                {document?.copy?.map((item, i) => (
                    <p key={i}>{item}</p>
                ))}
              </div>
              <span className="font-bold italic">Kimdan:</span>
              <div className="font-bold uppercase">"O'zTTBRM" DUK</div>
            </div>

            <div className="text-center font-bold text-[16px] mb-2">
              {getDynamicTitle()}
            </div>

            <div className="text-[15px] text-justify space-y-3 mb-10">
              <p className="indent-12 leading-relaxed">
                {basic?.organization_name}ning{" "}
                {basic?.request_date
                    ? dateFormatter(basic.request_date, "YYYY-yil D-MMMM", "uz")
                    : "____-yil __-________"}
                dagi {basic?.request_number}-son murojaatiga binoan,{" "}
                {basic?.justification}{" "}
                {document?.order_date
                    ? dateFormatter(document.order_date, "YYYY-yil D-MMMM", "uz")
                    : "____-yil __-________"}
                dan quyidagi ishlar amalga oshirilsin:
              </p>

              {renderSections()}

              <div className="mt-5 space-y-1 text-[14px]">
                <p>
                  Mas'ul xodim:{" "}
                  <span className="font-bold">
                  {document?.responsible?.first_name}
                </span>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end text-[15px] font-bold mt-5">
              <div className="w-1/2">Direktor</div>
              <div className="w-1/2 text-right">{director?.first_name}</div>
            </div>
            <div className="mt-auto text-[11px] text-[#5a76a8] ">
              <p>
                {(document as any)?.created_by?.first_name?.[0]}. {(document as any)?.created_by?.second_name}
              </p>
              <p>
                {(document as any)?.created_by?.short_phone}
              </p>
            </div>
          </div>
        </div>
      </MyModal>
  );
};

export default OrderApplicationView1745;