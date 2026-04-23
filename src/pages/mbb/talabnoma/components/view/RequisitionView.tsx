import dayjs from "dayjs";
import { RequisitionDocument } from "../../interfaces/MbbDocument.interface";

export const RequisitionView = ({ document }: { document: RequisitionDocument }) => {
  const payload = document.payload;

  const formatSchedule = () => {
    if (!payload?.schedule || payload.schedule.length === 0) return "";
    return payload.schedule
      .map((s) => {
        const start = s.start_at
          ? dayjs(s.start_at).format("DD.MM.YYYY [y.] HH.mm")
          : "";
        const end = s.end_at ? dayjs(s.end_at).format("HH.mm") : "";
        return `${start}-${end}`;
      })
      .join(", ");
  };

  const getApplicationsText = () => {
    if (!payload?.application || payload.application.length === 0) return "";
    return payload.application
      .map((app) => {
        const ranges = app.ranges?.map((r) => `${r.from}-${r.to}`).join(", ");
        return `${app.operator_name}: ${ranges}`;
      })
      .join(" | ");
  };

  return (
    <>
      <div className="text-center mb-10">
        <h2 className="font-bold text-[20px] uppercase">
          TALABNOMA №{document?.code || "30"}
        </h2>
        <p className="text-[12px] font-normal leading-tight">(tartib raqami)</p>
      </div>

      <div className="space-y-6 text-[16px] text-justify tracking-wide">
        {/* 1 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">1.</span>
            <span>Ish olib borish sharti:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">
              "{payload?.working_condition || ""}"
            </span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (aloqani yopish yo'li bilan/yopmaslik yo'li bilan/qisqa yo'qolish
            bilan)
          </div>
        </div>

        {/* 2 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">2.</span>
            <span>Sana:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">{formatSchedule()}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (ish olib boorish yili, oyi, kuni, soat/min.)
          </div>
        </div>

        {/* 3 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">3.</span>
            <span>Uchastka, stansiya:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">{payload?.station || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (Magistral nomi, № IP)
          </div>
        </div>

        {/* 4 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">4.</span>
            <span>NO raqami:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">{payload?.no_number || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (uzatish liniyasi, liniyaviy/gruppa traktlar va x.k)
            {payload?.application && payload.application.length > 0 && (
              <span className="block font-bold no-italic text-[14px] mt-2">
                Kanallar: {getApplicationsText()}
              </span>
            )}
          </div>
        </div>

        {/* 5 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">5.</span>
            <span>AI kanallari:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">{payload?.ai_channel || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (bor/yo'q, aloqa raqami ID)
          </div>
        </div>

        {/* 6 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">6.</span>
            <span className="font-bold">{payload?.reason_work || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (ish olib borish sababi)
          </div>
        </div>

        {/* 7 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">7.</span>
            <span className="font-bold">{payload?.content_work || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (ish olib borish mazmuni)
          </div>
        </div>

        {/* 8 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">8.</span>
            <span>NO xolati:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">{payload?.no_status || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (indeks xolati va NO o'zgargan sanasi)
          </div>
        </div>

        {/* 9 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">9.</span>
            <span>AvaO'J:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">{payload?.aoj_number || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (almashtirish va aylanib o'tish jadval raqami)
          </div>
        </div>

        {/* 10 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">10.</span>
            <span className="font-bold">{payload?.reverse || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (boshqa zaxiralash usuli)
          </div>
        </div>

        {/* 11 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">11.</span>
            <span>Boshqaruv stansiya:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">
              {payload?.responsible_person || ""}
            </span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            (Olib boriladigan ishga javobgar shaxs)
          </div>
        </div>

        {/* 12 */}
        <div className="flex flex-col">
          <div>
            <span className="min-w-[24px] inline-block">12.</span>
            <span>Kelishildi:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">{payload?.agreed || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            ("O'zbektelekom" AK ekspluatatsiya korxonasining texnik boshliqlari)
          </div>
        </div>

        {/* 13 */}
        <div className="flex flex-col mt-4">
          <div>
            <span className="min-w-[24px] inline-block">13.</span>
            <span>Kelishildi:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="font-bold">{payload?.ai_agreed || ""}</span>
          </div>
          <div className="text-[12px] text-center w-full block ml-8 mt-1 italic leading-none">
            F.I.SH. AI-9 (joyidagi)
          </div>
        </div>

        {/* 14 */}
        <div className="flex items-end mt-4 text-[16px]">
          <span className="min-w-[24px] inline-block">14.</span>
          <span className="flex-1 whitespace-nowrap">
            Talabnoma tuzuvchi (IP):&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="font-bold px-2">{payload?.creator_ip || ""}</span>
          {document?.created_at && (
            <span className="font-bold ml-4">
              {dayjs(document.created_at).format("DD.MM.YYYY")}y.
            </span>
          )}
        </div>

        {/* 15 */}
        <div className="flex items-end mt-4 text-[16px]">
          <span className="min-w-[24px] inline-block">15.</span>
          <span className="flex-1 whitespace-nowrap">
            Talabnoma tuzuvchi (MBB-1):&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="font-bold px-2">{payload?.creator_mbb || ""}</span>
          {document?.created_at && (
            <span className="font-bold ml-4">
              {dayjs(document.created_at).format("DD.MM.YYYY")}y.
            </span>
          )}
        </div>
      </div>
    </>
  );
};
