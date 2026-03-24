import { JSX, useRef } from "react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { dateFormatter } from "@/shared/utils/utils";
import { OrderApplication } from "@/pages/rh-252/a-252/interfaces/order.interface.ts";
import DocumentHeader from "@/pages/rh-252/a-252/components/View/DocumentHeader.tsx";

interface Props {
  asComponent?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: OrderApplication | null;
}

const OrderApplicationView1745 = ({
  open,
  onOpenChange,
  document,
  asComponent,
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const payload = (document as any)?.payload;
  const basic = payload?.basic;

  const actions: string[] = basic?.actions || [];

  // _pending fieldlardan o'qiymiz
  const createData = payload?.create_pending;
  const updateData = payload?.update_pending;
  const deleteData = payload?.delete_pending;

  const hasCreate =
    actions.includes("create") && createData?.flow_ids?.length > 0;
  const hasUpdate =
    actions.includes("update") &&
    (updateData?.channels?.length > 0 || updateData?.flows?.length > 0);
  const hasDelete =
    actions.includes("delete") &&
    (deleteData?.channels?.length > 0 ||
      deleteData?.channel_ids?.length > 0 ||
      deleteData?.flow_ids?.length > 0);

  const totalActiveActions = [hasCreate, hasUpdate, hasDelete].filter(Boolean);
  const isMultiple = totalActiveActions.length > 1;

  const getDynamicTitle = () => {
    const signal = basic?.signal_level || "2 Mbit/s";
    const actionLabels: string[] = [];

    for (const action of actions) {
      if (action === "create" && hasCreate) actionLabels.push("tashkil etish");
      if (action === "update" && hasUpdate)
        actionLabels.push("yo'nalishini o'zgartirish");
      if (action === "delete" && hasDelete) actionLabels.push("o'chirish");
    }

    if (actionLabels.length === 0) return `${signal} oqimlar to'g'risida`;

    const actionText =
      actionLabels.length > 1
        ? actionLabels.slice(0, -1).join(", ") + " va " + actionLabels.slice(-1)
        : actionLabels[0];

    return `${signal} oqimni ${actionText} to'g'risida`;
  };

  const baseIntro = (
    <>
      {basic?.organization_name}ning{" "}
      {basic?.request_date
        ? dateFormatter(basic.request_date, "YYYY-yil D-MMMM", "uz")
        : "____-yil __-________"}
      dagi {basic?.request_number}-son murojaatiga binoan,{" "}
      {basic?.justification}{" "}
      {document?.order_date
        ? dateFormatter(document.order_date, "YYYY-yil D-MMMM", "uz")
        : "____-yil __-________"}
      dan{" "}
    </>
  );

  const renderSections = () => {
    let step = 0;
    const sections: JSX.Element[] = [];

    for (const action of actions) {
      if (action === "create" && hasCreate) {
        step++;
        sections.push(
          <div key="create" className="pl-4">
            {isMultiple ? (
              <p>
                {step}. Tegishli manzillar oralig'idagi oqimlar quyidagicha
                tashkil etilsin va ma'lumot o'rnida qabul qilinsin:
              </p>
            ) : null}
            <div className={isMultiple ? "pl-12 mt-2" : "mt-2"}>
              {createData.flow_ids.map((item: any, i: number) => (
                <p key={`cre-${i}`} className="leading-relaxed">
                  {item.point_a} ({item.device_a || ""}) – {item.point_b} (
                  {item.device_b || ""}) oralig'idagi{" "}
                  <span>{item.signal_level || basic?.signal_level}</span> oqim
                  UFTF <span className="font-bold">{item.code}</span>
                </p>
              ))}
            </div>
            {payload?.responsible_organizing && (
              <p className="mt-3">
                Mas'ul tashkilot:{" "}
                <span className="font-bold">
                  {payload.responsible_organizing}
                </span>
              </p>
            )}
          </div>,
        );
      }

      if (action === "update" && hasUpdate) {
        for (const item of updateData?.channels || []) {
          step++;
          sections.push(
            <div key={`upd-ch-${step}`} className="pl-4">
              <p>
                {isMultiple && `${step}. `}
                {item.old?.international_stream_number} yo'nalishidagi{" "}
                {basic?.signal_level} oqim{" "}
                {item.new?.international_stream_number} yo'nalishiga quyidagicha
                o'zgartirilsin:
              </p>
              <div className="pl-12 mt-2 text-[14px]">
                <p>
                  Oldin: {item.old?.international_stream_number} (Kod:{" "}
                  {item.old?.code})
                </p>
                <p>
                  Hozir: {item.new?.international_stream_number} (Kod:{" "}
                  {item.new?.code})
                </p>
              </div>
            </div>,
          );
        }

        for (const item of updateData?.flows || []) {
          step++;
          const old = item.old;
          const nw = item.new;
          sections.push(
            <div key={`upd-fl-${step}`} className="pl-4">
              <p>
                {isMultiple && `${step}. `}
                {old?.point_a} – {old?.point_b} yo'nalishidagi{" "}
                {basic?.signal_level} oqim ({old?.code}) {nw?.point_a} –{" "}
                {nw?.point_b} yo'nalishga quyidagicha o'zgartirilsin:
              </p>
              <div className="pl-12 mt-2 text-[14px]">
                <p>
                  Oldin: {old?.point_a}
                  {old?.device_a ? ` (${old.device_a}` : ""}
                  {old?.port_a
                    ? `&${old.port_a})`
                    : old?.device_a
                      ? ")"
                      : ""} – {old?.point_b}
                  {old?.device_b ? ` (${old.device_b}` : ""}
                  {old?.port_b ? `&${old.port_b})` : old?.device_b ? ")" : ""}
                </p>
                <p>
                  Hozir: {nw?.point_a}
                  {nw?.device_a ? ` (${nw.device_a}` : ""}
                  {nw?.port_a
                    ? `&${nw.port_a})`
                    : nw?.device_a
                      ? ")"
                      : ""} – {nw?.point_b}
                  {nw?.device_b ? ` (${nw.device_b}` : ""}
                  {nw?.port_b ? `&${nw.port_b})` : nw?.device_b ? ")" : ""}
                </p>
              </div>
            </div>,
          );
        }
      }

      if (action === "delete" && hasDelete) {
        step++;
        const deleteCodes: string[] = [
          ...(deleteData?.channels || []),
          ...(deleteData?.channel_ids || []),
          ...(deleteData?.flow_ids || []).map((f: any) => f.code || f._id),
        ].filter(Boolean);

        sections.push(
          <div key="delete" className="pl-4">
            {isMultiple && (
              <p>
                {step}. Xizmat ehtiyoji yo'qligi sababli quyidagi{" "}
                {basic?.signal_level} oqimlar o'chirilsin:
              </p>
            )}
            <p className={`font-bold italic mt-1 ${isMultiple ? "pl-12" : ""}`}>
              {deleteCodes.join(", ")}
            </p>
          </div>,
        );
      }
    }

    return sections;
  };

  const renderIntroWithSingleAction = () => {
    if (isMultiple) {
      return (
        <p className="indent-12 leading-relaxed">
          {baseIntro}quyidagi ishlar amalga oshirilsin:
        </p>
      );
    }

    if (hasCreate) {
      return (
        <p className="indent-12 leading-relaxed">
          {baseIntro}tegishli manzillar oralig'idagi oqimlar quyidagicha tashkil
          etilsin va ma'lumot o'rnida qabul qilinsin:
        </p>
      );
    }

    if (hasUpdate) {
      const channels = updateData?.channels || [];
      const flows = updateData?.flows || [];

      if (channels.length > 0) {
        const item = channels[0];
        return (
          <p className="indent-12 leading-relaxed">
            {baseIntro}
            {item.old?.international_stream_number} yo'nalishidagi{" "}
            {basic?.signal_level} oqim {item.new?.international_stream_number}{" "}
            yo'nalishiga quyidagicha o'zgartirilsin:
          </p>
        );
      }

      if (flows.length > 0) {
        const item = flows[0];
        const old = item.old;
        const nw = item.new;
        return (
          <p className="indent-12 leading-relaxed">
            {baseIntro}
            {old?.point_a} – {old?.point_b} yo'nalishidagi {basic?.signal_level}{" "}
            oqim ({old?.code}) {nw?.point_a} – {nw?.point_b} yo'nalishga
            quyidagicha o'zgartirilsin:
          </p>
        );
      }
    }

    if (hasDelete) {
      const deleteCodes: string[] = [
        ...(deleteData?.channels || []),
        ...(deleteData?.channel_ids || []),
        ...(deleteData?.flow_ids || []).map((f: any) => f.code || f._id),
      ].filter(Boolean);

      return (
        <p className="indent-12 leading-relaxed">
          {baseIntro}xizmat ehtiyoji yo'qligi sababli quyidagi{" "}
          {basic?.signal_level} oqimlar o'chirilsin:{" "}
          <span className="font-bold italic">{deleteCodes.join(", ")}</span>
        </p>
      );
    }

    return (
      <p className="indent-12 leading-relaxed">
        {baseIntro}quyidagi ishlar amalga oshirilsin:
      </p>
    );
  };

  const renderSingleActionSections = () => {
    if (hasDelete) return null;

    if (hasUpdate) {
      const channels = updateData?.channels || [];
      const flows = updateData?.flows || [];

      const remainingChannels = channels.slice(1);
      const remainingFlows = channels.length > 0 ? flows : flows.slice(1);
      const firstFlow = channels.length === 0 ? flows[0] : null;

      const sections: JSX.Element[] = [];

      if (firstFlow) {
        const old = firstFlow.old;
        const nw = firstFlow.new;
        sections.push(
          <div key="upd-fl-detail-0" className="pl-12 mt-2 text-[14px]">
            <p>
              Oldin: {old?.point_a}
              {old?.device_a ? ` (${old.device_a}` : ""}
              {old?.port_a
                ? `&${old.port_a})`
                : old?.device_a
                  ? ")"
                  : ""} – {old?.point_b}
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
          </div>,
        );
      }

      if (channels.length > 0) {
        const firstCh = channels[0];
        sections.push(
          <div key="upd-ch-detail-0" className="pl-12 mt-2 text-[14px]">
            <p>
              Oldin: {firstCh.old?.international_stream_number} (Kod:{" "}
              {firstCh.old?.code})
            </p>
            <p>
              Hozir: {firstCh.new?.international_stream_number} (Kod:{" "}
              {firstCh.new?.code})
            </p>
          </div>,
        );
      }

      remainingChannels.forEach((item: any, i: number) => {
        sections.push(
          <div key={`upd-ch-rem-${i}`} className="pl-4">
            <p>
              {item.old?.international_stream_number} yo'nalishidagi{" "}
              {basic?.signal_level} oqim {item.new?.international_stream_number}{" "}
              yo'nalishiga quyidagicha o'zgartirilsin:
            </p>
            <div className="pl-12 mt-2 text-[14px]">
              <p>
                Oldin: {item.old?.international_stream_number} (Kod:{" "}
                {item.old?.code})
              </p>
              <p>
                Hozir: {item.new?.international_stream_number} (Kod:{" "}
                {item.new?.code})
              </p>
            </div>
          </div>,
        );
      });

      remainingFlows.forEach((item: any, i: number) => {
        const old = item.old;
        const nw = item.new;
        sections.push(
          <div key={`upd-fl-rem-${i}`} className="pl-4">
            <p>
              {old?.point_a} – {old?.point_b} yo'nalishidagi{" "}
              {basic?.signal_level} oqim ({old?.code}) {nw?.point_a} –{" "}
              {nw?.point_b} yo'nalishga quyidagicha o'zgartirilsin:
            </p>
            <div className="pl-12 mt-2 text-[14px]">
              <p>
                Oldin: {old?.point_a}
                {old?.device_a ? ` (${old.device_a}` : ""}
                {old?.port_a
                  ? `&${old.port_a})`
                  : old?.device_a
                    ? ")"
                    : ""} – {old?.point_b}
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
          </div>,
        );
      });

      return sections;
    }

    if (hasCreate) {
      return (
        <div className="mt-2">
          {createData.flow_ids.map((item: any, i: number) => (
            <p key={`cre-${i}`} className="leading-relaxed">
              {item.point_a} ({item.device_a || ""}) – {item.point_b} (
              {item.device_b || ""}) oralig'idagi{" "}
              <span>{item.signal_level || basic?.signal_level}</span> oqim UFTF{" "}
              <span className="font-bold">{item.code}</span>
            </p>
          ))}
          {payload?.responsible_organizing && (
            <p className="mt-3">
              Mas'ul tashkilot:{" "}
              <span className="font-bold">
                {payload.responsible_organizing}
              </span>
            </p>
          )}
        </div>
      );
    }

    return null;
  };

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
          {document?.to?.map((item: any, i: number) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <span className="font-bold italic">Nusxasi:</span>
        <div>
          {(document as any)?.copy?.map((item: string, i: number) => (
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
        {renderIntroWithSingleAction()}

        {isMultiple ? renderSections() : renderSingleActionSections()}

        {payload?.responsible_form_3_3 && (
          <p className="mt-3">
            MBB shakl 3.3:{" "}
            <span className="font-bold">{payload.responsible_form_3_3}</span>
          </p>
        )}
      </div>

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

export default OrderApplicationView1745;