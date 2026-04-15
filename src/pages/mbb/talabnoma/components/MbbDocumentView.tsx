import { MyModal } from "@/shared/components/moleculas/modal";
import {
  MbbDocumentInterface,
  RequisitionDocument,
  MemoDocument,
} from "../interfaces/MbbDocument.interface";
import dayjs from "dayjs";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";

interface MbbDocumentViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: MbbDocumentInterface | null;
}

const RequisitionView = ({ document }: { document: RequisitionDocument }) => {
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
          <span className="flex-1 border-b border-black"></span>
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
          <span className="flex-1 border-b border-black"></span>
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

/* ─── MEMO (Ma'lumotnoma) View ─── */
const MemoView = ({ document }: { document: MemoDocument }) => {
  const payload = document?.payload;

  return (
    <>
      <div className="absolute top-8 right-8 text-[12px] font-bold print:static print:text-right print:mb-2">
        RH 45-252:2013
      </div>

      <div className="text-right mb-4">
        <p className="font-bold text-[14px]">B ilova</p>
        <p className="text-[12px] italic">(majburiy)</p>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-bold text-[16px] uppercase">
          «UzTTBRM» DUK farmoyishlari bajarilganligi to'g'risida ma'lumot shakli
        </h2>
        <div className="w-full border-t border-dashed border-black my-4"></div>
        <p className="text-[11px] text-right font-bold">3.3-shakl</p>
      </div>

      <div className="text-center mb-6 px-10">
        <p className="text-[14px] font-bold leading-tight">
          «UzTTBRM» DUKning aloqalarni shakllantirish/tugatish/qayta
          shakllantirish/blokirovkalash/blokdan chiqarish bo'yicha
          farmoyishlarining bajarilishi to'g'risida
        </p>
        <p className="mt-4 uppercase text-[16px]">
          <span className="inline-block border-b-2 border-black px-4 min-w-[120px] font-bold">
            {document?.code || "_________"}
          </span>{" "}
          -son MA'LUMOT
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-[1.5px] border-black text-[11px]">
          <thead>
            <tr className="bg-gray-50 text-center">
              <th className="border-[1.5px] border-black p-1 w-8">T.r.</th>
              <th className="border-[1.5px] border-black p-1 leading-tight">
                «UzTTBRM» DUK farmoyishining raqami va sanasi
              </th>
              <th className="border-[1.5px] border-black p-1 leading-tight">
                Farmoyishda ko'rsatilgan bajarish muddati
              </th>
              <th className="border-[1.5px] border-black p-1 leading-tight">
                Farmoyish haqiqatda bajarilganligi
              </th>
              <th className="border-[1.5px] border-black p-1 leading-tight">
                Farmoyishni bajarish uchun javobgarlar
              </th>
              <th className="border-[1.5px] border-black p-1 leading-tight">
                Iste'molchi (aloqani qabul qilgan iste'molchining familiyasi)
              </th>
              <th className="border-[1.5px] border-black p-1 leading-tight">
                Bajarilmaganlik sababi
              </th>
              <th className="border-[1.5px] border-black p-1">Izoh*</th>
            </tr>
          </thead>
          <tbody>
            {payload?.data && payload?.data?.length > 0 ? (
              payload?.data?.map((item, index) => (
                <tr key={item._id || index} className="h-14 text-center">
                  <td className="border-[1.5px] border-black">{index + 1}</td>
                  <td className="border-[1.5px] border-black font-medium">
                    {item?.order_code}
                  </td>
                  <td className="border-[1.5px] border-black">
                    {item?.assigned_time
                      ? dateFormatter(item?.assigned_time, DATE)
                      : ""}
                  </td>
                  <td className="border-[1.5px] border-black">
                    {item?.completed_time
                      ? dateFormatter(item?.completed_time, DATE)
                      : ""}
                  </td>
                  <td className="border-[1.5px] border-black font-semibold">
                    {item?.responsible_executor}
                  </td>
                  <td className="border-[1.5px] border-black">
                    {item?.customer_details}
                  </td>
                  <td className="border-[1.5px] border-black">-</td>
                  <td className="border-[1.5px] border-black">
                    {item?.comment || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-14 text-center">
                <td className="border-[1.5px] border-black">1</td>
                <td className="border-[1.5px] border-black font-medium">
                  {document?.code}
                </td>
                <td className="border-[1.5px] border-black">
                  {document?.created_at
                    ? dateFormatter(document?.created_at, DATE)
                    : ""}
                </td>
                <td className="border-[1.5px] border-black font-medium">
                  Bajarildi
                </td>
                <td className="border-[1.5px] border-black font-semibold uppercase">
                  {document?.signer}
                </td>
                <td className="border-[1.5px] border-black font-semibold uppercase">
                  {payload?.title}
                </td>
                <td className="border-[1.5px] border-black">-</td>
                <td className="border-[1.5px] border-black">-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-[11px]">
        <p>
          * Farmoyishni bajarish imkoniyati bo'lmaganida izohda farmoyishni
          bajarishning yangi muddatlari ko'rsatiladi
        </p>
      </div>
    </>
  );
};

/* ─── Main Document View Modal ─── */
const MbbDocumentView = ({
  open,
  onOpenChange,
  document,
}: MbbDocumentViewProps) => {
  return (
    <MyModal
      open={open}
      onOpenChange={onOpenChange}
      size="8xl"
      className="overflow-auto"
    >
      <div className="py-10 px-4 flex justify-center bg-gray-100 min-h-screen">
        <div
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
          className={`bg-white w-full shadow-2xl relative text-black border border-gray-200 print:shadow-none print:border-none print:m-0 print:p-8 ${
            document?.document_type === "REQUISITION"
              ? "max-w-[900px] p-10 md:p-14 leading-relaxed"
              : "max-w-[1000px] p-8 md:p-12 leading-tight"
          }`}
        >
          {document?.document_type === "REQUISITION" ? (
            <RequisitionView document={document as RequisitionDocument} />
          ) : document?.document_type === "MEMO" ? (
            <MemoView document={document as MemoDocument} />
          ) : null}
        </div>
      </div>
    </MyModal>
  );
};

export default MbbDocumentView;
