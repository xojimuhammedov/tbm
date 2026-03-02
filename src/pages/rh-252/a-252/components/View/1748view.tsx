import { useMemo, useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { FileTextIcon, DownloadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { dateFormatter } from "@/shared/utils/utils";
import { useReactToPrint } from "react-to-print";
import { Button } from "dgz-ui/button";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";
import type {
  OrderApplication,
  Payload1748,
} from "@/pages/rh-252/a-252/interfaces/order.interface.ts";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | any | null;
}

const cleanText = (v: unknown) => {
  if (typeof v !== "string") return "";
  return v
    .replace(/<[^>]*>/g, "")
    .replace(/\u00A0/g, " ")
    .trim();
};

const hasText = (v: unknown) => {
  const s = cleanText(v);
  if (!s) return false;

  const emptyLike = new Set([
    "..",
    ".",
    "-",
    "—",
    "_",
    "__",
    "___",
    "____",
    "________________",
  ]);
  if (emptyLike.has(s)) return false;

  if (/^[._\-\s—]+$/.test(s)) return false;

  return true;
};

const hasArray = (v: unknown) => Array.isArray(v) && v.length > 0;

const isSameDay = (a?: string, b?: string) => {
  if (!a || !b) return false;
  const d1 = new Date(a);
  const d2 = new Date(b);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const isSameDateTime = (a?: string, b?: string) => {
  if (!a || !b) return false;
  return new Date(a).getTime() === new Date(b).getTime();
};

const OrderView1748 = ({ open, onOpenChange, document }: Props) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Farmoyish_17-48_${document?.document_index || document?._id || ""}`,
  });

  const payload = useMemo(() => {
    return (document?.payload || null) as Payload1748 | null;
  }, [document]);

  const orderDateText = useMemo(() => {
    return document?.order_date
      ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
      : "";
  }, [document?.order_date]);

  const startFullText = useMemo(() => {
    return payload?.basic?.start_time
      ? dateFormatter(payload.basic.start_time, "YYYY-yil DD-MMMM HH:mm", "uz")
      : "";
  }, [payload?.basic?.start_time]);

  const endFullText = useMemo(() => {
    return payload?.basic?.end_time
      ? dateFormatter(payload.basic.end_time, "YYYY-yil DD-MMMM HH:mm", "uz")
      : "";
  }, [payload?.basic?.end_time]);

  const endOnlyTimeText = useMemo(() => {
    return payload?.basic?.end_time
      ? dateFormatter(payload.basic.end_time, "HH:mm", "uz")
      : "";
  }, [payload?.basic?.end_time]);

  const docNumber = document?.code || "17-48";
  const docTitle = hasText(payload?.basic?.title) ? payload!.basic.title : "";

  const contentOk = hasText(payload?.content);

  const timeOk =
    hasText(payload?.basic?.start_time) && hasText(payload?.basic?.end_time);
  const sameDay = timeOk
    ? isSameDay(payload?.basic?.start_time, payload?.basic?.end_time)
    : false;
  const sameDateTime = timeOk
    ? isSameDateTime(payload?.basic?.start_time, payload?.basic?.end_time)
    : false;

  const mainRoutesOk = hasText(payload?.main_routes);
  const reserveRoutesOk = hasText(payload?.reserve_routes);
  const routesOk = mainRoutesOk || reserveRoutesOk;

  const stoppedFlowsOk = hasArray(payload?.stopped_flows);

  const includingOk = hasText(payload?.including);

  const responsibleOk = hasText(payload?.responsible_person);
  const concertOk = hasText(payload?.concert_text);
  const basisOk = hasText(payload?.basis);

  const toOk = hasArray(document?.to);
  const copyOk = hasArray(document?.copy);
  const director = useMemo(() => {
    return document?.director || null;
  }, [document]);

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
              {t("Farmoyishni ko'rish (17-48)")}
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
          <style
            dangerouslySetInnerHTML={{
              __html: `
                        @page {
                        
                    }
                        @media print {
                            body { margin: 0; }
                          
                        }
                    `,
            }}
          />

          <DocumentHeader />

          <div className="text-center font-bold text-[17px] mb-2 leading-tight">
            <p>“O‘zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
            <p>respublika markazi” davlat unitar korxonasi</p>
            <p className="mt-2 tracking-[0.2em] text-[18px]">FARMOYISHI</p>
          </div>

          <div className="flex justify-between font-bold py-1 mb-1 text-[14px]">
            <div>
              {hasText(orderDateText) ? (
                <>
                  SANA: <span>{orderDateText}</span>
                </>
              ) : null}
            </div>
            <div>№ {docNumber}</div>
            <div>SONI: 1</div>
          </div>

          {(toOk || copyOk) && (
            <div className="grid grid-cols-[70px_1fr] gap-y-1 mb-5 text-[15px]">
              {toOk ? (
                <>
                  <span className="font-bold">Kimga:</span>
                  <div className="font-bold uppercase">
                    {document.to.map((item: string, i: number) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </>
              ) : null}

              {copyOk ? (
                <>
                  <span className="font-bold">Nusxasi:</span>
                  <div>
                    {document.copy.map((item: string, i: number) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          )}

          {/* Title + time + short closure text + content — bitta blok qilib */}
          {hasText(docTitle) || timeOk || contentOk ? (
            <div className="text-[15px] text-justify space-y-2 mb-4">
              {hasText(docTitle) ? (
                <div className="font-bold text-center text-[16px] ">
                  {docTitle}
                </div>
              ) : null}

              {timeOk || contentOk ? (
                <div className="indent-12  m-0">
                  {timeOk ? (
                    <>
                      {sameDateTime ? (
                        startFullText
                      ) : sameDay ? (
                        <>
                          {startFullText} dan {endOnlyTimeText} gacha
                        </>
                      ) : (
                        <>
                          {startFullText} dan {endFullText} gacha
                        </>
                      )}
                      <span> “2-8” aloqani yopish yoʻli bilan</span>
                    </>
                  ) : null}
                </div>
              ) : null}

              {contentOk ? <p className="w-full">{payload!.content}</p> : null}
            </div>
          ) : null}

          {routesOk ? (
            <div className="text-[15px] mb-2 space-y-2">
              {mainRoutesOk ? (
                <div>
                  <span className="font-bold">Asosiy yo‘nalishlar:</span>{" "}
                  <span className="u-pre">{payload!.main_routes}</span>
                </div>
              ) : null}
              {reserveRoutesOk ? (
                <div>
                  <span className="font-bold">Zaxira yo‘nalishlar:</span>{" "}
                  <span className="u-pre">{payload!.reserve_routes}</span>
                </div>
              ) : null}
              {reserveRoutesOk ? (
                <div>
                  <span className="font-bold">Kelishilgan:</span>{" "}
                  <span className="u-pre">{payload!.concert_second}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          {/*{stoppedFlowsOk ? (*/}
          {/*    <div className="text-[15px] mb-4">*/}
          {/*        <div className="font-bold mb-2">To‘xtalish kuzatiladigan oqimlar:</div>*/}
          {/*        <table className="w-full border-collapse border border-black text-[14px]">*/}
          {/*            <thead>*/}
          {/*            <tr className="font-bold">*/}
          {/*                <td className="border border-black p-2 w-[18%] text-center">Oqim kodi</td>*/}
          {/*                <td className="border border-black p-2 text-center">Point A</td>*/}
          {/*                <td className="border border-black p-2 text-center">Point B</td>*/}
          {/*            </tr>*/}
          {/*            </thead>*/}
          {/*            <tbody>*/}
          {/*            {payload!.stopped_flows.map((f) => (*/}
          {/*                <tr key={f._id}>*/}
          {/*                    <td className="border border-black p-2 text-center font-bold">{f.code}</td>*/}
          {/*                    <td className="border border-black p-2 text-center">{f.point_a}</td>*/}
          {/*                    <td className="border border-black p-2 text-center">{f.point_b}</td>*/}
          {/*                </tr>*/}
          {/*            ))}*/}
          {/*            </tbody>*/}
          {/*        </table>*/}
          {/*    </div>*/}
          {/*) : null}*/}

          {stoppedFlowsOk ? (
            <div className="text-[15px] mb-4">
              <div className="font-bold mb-2">
                To‘xtalish kuzatiladigan oqimlar:
              </div>
              <div className="leading-relaxed">
                {Object.entries(
                  payload!.stopped_flows.reduce(
                    (acc, f) => {
                      // Point B bo'yicha guruhlaymiz (XKM-1, XKM-4 va h.k.)
                      const key = f.point_b;
                      if (!acc[key]) acc[key] = [];
                      acc[key].push(f.code);
                      return acc;
                    },
                    {} as Record<string, string[]>,
                  ),
                ).map(([pointB, codes], index, array) => (
                  <span key={pointB}>
                    <span className="font-bold">ID {codes.join(", ")}</span> (
                    {pointB}){index < array.length - 1 ? " – " : "."}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {includingOk ? (
            <div className="text-[15px] mb-2">
              <div className="font-bold mb-2">Shu jumladan:</div>
              <div
                className="html-content"
                dangerouslySetInnerHTML={{ __html: payload!.including }}
              />
            </div>
          ) : null}

          {responsibleOk ? (
            <div className="text-[15px] mb-2">
              <span className="font-bold mr-2">
                Ish o‘tkazish bo‘yicha mas’ul:
              </span>
              <span className="">{payload!.responsible_person}</span>
            </div>
          ) : null}

          {concertOk ? (
            <div className="text-[15px] mb-2">
              <span className="font-bold mr-2">Kelishilgan:</span>
              <span className="">{payload!.concert_text}</span>
            </div>
          ) : null}

          {basisOk ? (
            <div className="text-[15px] ">
              <span className="font-bold mr-2">Asos:</span>
              <span className="">{payload!.basis}</span>
            </div>
          ) : null}
          <div className="flex justify-between items-end text-[15px] font-bold mt-10">
            <div className="w-1/2">Direktor</div>
            <div className="w-1/2 text-right">
               {director?.first_name}
            </div>
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

export default OrderView1748;
