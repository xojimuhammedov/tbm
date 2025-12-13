import { DocumentFieldsInterface } from "@/pages/rtsi/f-56/interfaces/document-fields.interface.ts";
import { useTranslation } from "react-i18next";

interface F56DocumentProps {
  document: DocumentFieldsInterface[] | undefined;
  title?: string;
}

const F56Document = ({ document, title }: F56DocumentProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="p-4">
        <div className="rounded-lg shadow-sm border p-6 space-y-3">
          <div className="flex items-center justify-end">
            <div className="text-sm">{title}</div>
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
                    {t("Ishchi (O'lchashlari) amalga oshirish vaqti")}
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
                      "TE va OE tarmoqlari trafiklari(kanallari)ning belglanishi",
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
                    {t("Aylanib o’tish va almashtirishlar grafigi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs"
                    rowSpan={2}
                  >
                    {t(
                      "O’lchashlar hamda aylanib o’tishlar va almashtirishlar grafigini joriy qilish sababli ekspluatatsiyadan chiqariladigan iste’molchilar traktlari (kanallari)ning belgilanishi, aloqalarining nomerlari",
                    )}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs"
                    rowSpan={2}
                  >
                    {t("Profilaktika turi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs w-12"
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
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    4
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-20">
                    5
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-24">
                    6
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    7
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-20">
                    8
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    9
                  </th>
                </tr>
              </thead>
              <tbody>
                {document?.map((field, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-1 py-1 text-center text-sm font-medium">
                      {field.date}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {field.minute}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {field.noNumber}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {field.teOeDesignation}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {field.workArea}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {field.rerouteSchedule}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {field.consumersDesignation}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {field.prophylaxisType}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {field.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default F56Document;
