import { MemoDocument } from "../../interfaces/MbbDocument.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";

export const MemoView = ({ document }: { document: MemoDocument }) => {
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
