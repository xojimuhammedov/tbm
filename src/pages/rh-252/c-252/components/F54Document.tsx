import { F54DocumentInterface } from "@/pages/rtsi/f-54/interfaces/f54Document.interface.ts";
import { useTranslation } from "react-i18next";

interface F54DocumentProps {
  document: F54DocumentInterface | undefined;
}

const F54Document = ({ document }: F54DocumentProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-gray-50 p-4">
        <div className="rounded-lg shadow-sm border p-6 space-y-3">
          <div className="flex items-center justify-end">
            <div className="text-sm">{t("RH 45-232/2025")}</div>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold">{t("V ilova")}</h2>
            <p className="text-sm text-gray-300">{t("(Majburiy)")}</p>
          </div>

          <p className="text-center text-sm">
            {t(
              "Rejaga oid ta'mirlash-sozlash ishlari qayidnomasi va uni to'ldrish tartibi",
            )}
          </p>
          <h3 className="text-lg font-semibold">
            {t(
              "B.1 Rejaga oid ta'mirlash-sozlash ishlari qayidnomaning shakli",
            )}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs"
                    colSpan={2}
                  >
                    {t("RTSI, RTTSI ni o'tkazish sanasi va vaqti")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs w-12"
                    rowSpan={2}
                  >
                    {t("Ishlarni o'tkazishning haqiqiy vaqti")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs w-15"
                    rowSpan={2}
                  >
                    {t("Kanal kodi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs w-12"
                    rowSpan={2}
                  >
                    {t("NO nomeri")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs w-12"
                    rowSpan={2}
                  >
                    {t(
                      "O'lchanadigan TE va OE tarmoqlari kanallarining belglanishi",
                    )}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs"
                    rowSpan={2}
                  >
                    {t("Ishlar uchastkasi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs"
                    rowSpan={2}
                  >
                    {t("Profilaktika turi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs"
                    rowSpan={2}
                  >
                    {t("Ishlarini o'tkazish yoki bekor qilish sababi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs"
                    rowSpan={2}
                  >
                    {t("UBP zonasi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs"
                    rowSpan={2}
                  >
                    {t("Eslatma")}
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-1 py-1 text-xs">
                    {t("Sana, Oy")}
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs w-12">
                    {t("Soat minutlar")}
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-16">
                    1
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium">
                    2
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    3
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-15">
                    4
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    5
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    6
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-20">
                    7
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-24">
                    8
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    9
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-20">
                    10
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    11
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-1 py-1 text-center text-sm font-medium text-gray-700">
                    {document?.date}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.minute}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.real_minutes}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.channel_id.code}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.noNumber}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.teOeDesignation}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.workArea}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.prophylaxisType}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.cause}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.ubpZone}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.note}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default F54Document;
