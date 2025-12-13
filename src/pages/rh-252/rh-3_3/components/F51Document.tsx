import { F51DocumentInterface } from "@/pages/rtsi/f-51/interfaces/f51Document.interface.ts";
import { useTranslation } from "react-i18next";

interface F51DocumentProps {
  document: F51DocumentInterface | undefined;
}

const F51Document = ({ document }: F51DocumentProps) => {
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
                <tr className="bg-gray-50">
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600"
                    colSpan={2}
                  >
                    {t("Ishchi (O'lchashlari) amalga oshirish vaqti")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600 w-12"
                    rowSpan={2}
                  >
                    {t("NO nomeri")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600 w-12"
                    rowSpan={2}
                  >
                    {t(
                      "TE va OE tarmoqlari trafiklari(kanallari)ning belglanishi",
                    )}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600"
                    rowSpan={2}
                  >
                    {t("Ishlar uchastkasi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600"
                    rowSpan={2}
                  >
                    {t("Aylanib o’tish va almashtirishlar grafigi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600"
                    rowSpan={2}
                  >
                    {t("Profilaktika turi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600"
                    rowSpan={2}
                  >
                    {t("UBP zonasi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600"
                    rowSpan={2}
                  >
                    {t("Manfaatdor UBP")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs text-gray-600 w-12"
                    rowSpan={2}
                  >
                    {t("Eslatma")}
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-1 py-1 text-xs text-gray-600">
                    Sana, Oy
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs text-gray-600 w-12">
                    Soat minutlar
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-16">
                    1
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700">
                    2
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-12">
                    3
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-12">
                    4
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-20">
                    5
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-24">
                    6
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-12">
                    7
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-20">
                    8
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-12">
                    9
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium text-gray-700 w-12">
                    10
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
                    {document?.noNumber}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.teOeDesignation}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.workArea}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.rerouteSchedule}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.prophylaxisType}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.ubpZone}
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    {document?.interestedUbp}
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

export default F51Document;
