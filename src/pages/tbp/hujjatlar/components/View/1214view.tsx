import DocumentHeader from "@/pages/tbp/hujjatlar/components/View/DocumentHeader.tsx";
import type { OrderApplication } from "@/pages/tbp/hujjatlar/interfaces/order.interface.ts";
import { MyModal } from "@/shared/components/moleculas/modal";
import { dateFormatter } from "@/shared/utils/utils";
import { useRef } from "react";

interface Props {
  asComponent?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | any | null;
}

const OrderView1214 = ({
  open,
  onOpenChange,
  document,
  asComponent,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const payload = (document?.payload || null) as any;

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

  const orderDateText = document?.order_date
    ? dateFormatter(document.order_date, "YYYY-yil DD-MMMM", "uz")
    : "";

  const startFullText = payload?.basic?.start_time
    ? dateFormatter(payload.basic.start_time, "YYYY-yil DD-MMMM HH:mm", "uz")
    : "";

  const endFullText = payload?.basic?.end_time
    ? dateFormatter(payload.basic.end_time, "YYYY-yil DD-MMMM HH:mm", "uz")
    : "";

  const endOnlyTimeText = payload?.basic?.end_time
    ? dateFormatter(payload.basic.end_time, "HH:mm", "uz")
    : "";

  const docNumber = document?.code || "12-14";
  const docTitle = hasText(payload?.basic?.title) ? payload?.basic?.title : "";

  const contentText =
    (typeof payload?.content === "string"
      ? payload.content
      : payload?.basic?.context) ?? "";

  const contentOk = hasText(contentText);
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

  type StoppedFlowPending = { point_b: string; code: string };
  const stoppedFlowsPending: StoppedFlowPending[] = Array.isArray(
    payload?.stopped_flows_pending,
  )
    ? (payload.stopped_flows_pending as any[]).map((f: any) => ({
        point_b: String(f?.point_b ?? ""),
        code: String(f?.code ?? ""),
      }))
    : Array.isArray(payload?.flow_ids)
      ? (payload.flow_ids as any[]).map((f: any) => ({
          point_b: "",
          code: String(f?.code ?? f),
        }))
      : [];

  const stoppedFlowsGrouped = Object.entries(
    stoppedFlowsPending.reduce(
      (acc: Record<string, string[]>, f: StoppedFlowPending) => {
        const key = f.point_b || "";
        if (!acc[key]) acc[key] = [];
        acc[key].push(f.code);
        return acc;
      },
      {} as Record<string, string[]>,
    ),
  ) as Array<[string, string[]]>;

  
  const stoppedFlowsOk = stoppedFlowsGrouped.length > 0
  const includingOk = hasText(payload?.including);
  const responsibleOk = hasText(payload?.responsible_person);
  const concertOk = hasText(payload?.concert_text);
  const basisOk = hasText(payload?.basis);
  const toOk = hasArray(document?.to);
  const copyOk = hasArray(document?.copy);

  const closureText =
    payload?.basic?.connection_closure_type ||
    "2-8 aloqani yopish yoʻli bilan";

  const DocumentContent = (
    <div
      ref={contentRef}
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        paddingLeft: "3cm",
        paddingRight: "3cm",
        paddingTop: "1.5cm",
        paddingBottom: "1.5cm",
      }}
      className="bg-white w-full max-w-[950px] min-h-[1100px] flex flex-col relative text-black leading-tight h-fit mx-auto"
    >
      <DocumentHeader />

      <div className="text-center font-bold text-[17px] mb-2 leading-tight">
        <p>"O'zbekiston telekommunikatsiya tarmoqlarini boshqarish</p>
        <p>respublika markazi" davlat unitar korxonasi</p>
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
                {document?.to?.map((item: any, i: number) => (
                  <p key={i}>{item?.name}</p>
                ))}
              </div>
            </>
          ) : null}
          {copyOk ? (
            <>
              <span className="font-bold">Nusxasi:</span>
              <div>
                {document?.copy?.map((item: any, i: number) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </>
          ) : null}
        </div>
      )}

      {hasText(docTitle) || timeOk || contentOk ? (
        <div className="text-[15px] text-justify space-y-2 mb-4">
          {hasText(docTitle) ? (
            <div className="font-bold text-center text-[16px]">{docTitle}</div>
          ) : null}
          {timeOk || contentOk ? (
            <div className="indent-12 m-0">
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
                  <span>{closureText}</span>
                </>
              ) : null}
            </div>
          ) : null}
          {contentOk ? <p className="w-full">{contentText}</p> : null}
        </div>
      ) : null}

      {routesOk ? (
        <div className="text-[15px] mb-2 space-y-2">
          {mainRoutesOk ? (
            <div>
              <span className="font-bold">Asosiy yo'nalishlar:</span>{" "}
              <span className="u-pre">{payload!.main_routes}</span>
            </div>
          ) : null}
          {reserveRoutesOk ? (
            <div>
              <span className="font-bold">Zaxira yo'nalishlar:</span>{" "}
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

      {stoppedFlowsOk ? (
        <div className="text-[15px] mb-4">
          <div className="font-bold mb-2">
            To'xtalish kuzatiladigan oqimlar:
          </div>
          <div className="leading-relaxed">
            {stoppedFlowsGrouped.map(([pointB, codes], index, array) => (
              <span key={`${pointB}-${index}`}>
                <span className="font-bold">ID {codes.join(", ")}</span> (
                {pointB || "—"}){index < array.length - 1 ? " – " : "."}
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
          <span className="font-bold mr-2">Ish o'tkazish bo'yicha mas'ul:</span>
          <span>{payload!.responsible_person}</span>
        </div>
      ) : null}

      {concertOk ? (
        <div className="text-[15px] mb-2">
          <span className="font-bold mr-2">Kelishilgan:</span>
          <span>{payload!.concert_text}</span>
        </div>
      ) : null}

      {basisOk ? (
        <div className="text-[15px]">
          <span className="font-bold mr-2">Asos:</span>
          <span>{payload!.basis}</span>
        </div>
      ) : null}

      <div className="mt-auto text-sm text-[#5a76a8]">
        <p>
          {(document as any)?.created_by?.first_name?.[0]}.{" "}
          {(document as any)?.created_by?.second_name}
        </p>
        <p>{(document as any)?.created_by?.short_phone}</p>
      </div>
    </div>
  );
  if (asComponent) {
    return (
      <div className="w-full bg-gray-100 p-0 overflow-auto">
        {DocumentContent}
      </div>
    );
  }

  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="4xl"
      className="overflow-auto p-0"
      header={null}
    >
      <div className="bg-gray-100 min-h-full w-full py-5">
        {DocumentContent}
      </div>
    </MyModal>
  );
};

export default OrderView1214;
