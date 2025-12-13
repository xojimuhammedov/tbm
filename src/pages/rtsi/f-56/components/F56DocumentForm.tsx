import { ArrowLeft, Send } from "lucide-react";
import useF56DocumentForm from "@/pages/rtsi/f-56/hooks/useF56DocumentForm.ts";
import { Form, MySelect, MyTextarea } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { F56Dto } from "@/pages/rtsi/f-56/schemas/createF56Schema.ts";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import useF51List from "@/pages/rtsi/f-51/hooks/useF51List.ts";
import { Button } from "dgz-ui/button";

interface F56DocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const F56DocumentForm = ({ id, onSave, onCancel }: F56DocumentFormProps) => {
  const { t } = useTranslation();
  const { staffOptions } = useStaffOptions();
  const { f51List } = useF51List();
  const {
    form,
    handleSubmit,
    selectedF51Ids,
    allSelected,
    toggleAllF51,
    toggleF51,
  } = useF56DocumentForm({
    id,
    onSave,
    allF51Ids: (f51List || []).map((d) => d._id),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4">
        <div className="rounded-lg shadow-sm border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-2  hover:text-gray-800"
              onClick={onCancel}
            >
              <ArrowLeft size={20} />
              <span>{t("Bekor qilish")}</span>
            </button>
            <div className="text-sm text-gray-500">
              <div className="text-sm">{t("RH 45-232/2025")}</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold">{t("Hujjat yaratish F-56")}</h1>

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
                    className="border border-gray-300 px-1 py-1 text-xs "
                    colSpan={2}
                  >
                    {t("Ishchi (O'lchashlari) amalga oshirish vaqti")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs  w-8"
                    rowSpan={2}
                  >
                    {t("NO nomeri")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs  w-12"
                    rowSpan={2}
                  >
                    {t("TE va OE tarmoqlari kanallarining belglanishi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs  w-20"
                    rowSpan={2}
                  >
                    {t("Ishlar uchastkasi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs  w-12"
                    rowSpan={2}
                  >
                    {t("Aylanib o’tish va grafigi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs "
                    rowSpan={2}
                  >
                    {t("Profilaktika turi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs "
                    rowSpan={2}
                  >
                    {t("UBP zonasi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs "
                    rowSpan={2}
                  >
                    {t("Manfaatdor UBP")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs  w-12"
                    rowSpan={2}
                  >
                    {t("Eslatma")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs  text-center w-10"
                    rowSpan={2}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4"
                      checked={allSelected}
                      onChange={toggleAllF51}
                    />
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-1 py-1 text-xs ">
                    {t("Sana, Oy")}
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs  w-12">
                    {t("Soat minutlar")}
                  </th>
                </tr>
                <tr>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-16">
                    1
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium ">
                    2
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-8">
                    3
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-12">
                    4
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-20">
                    5
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-12">
                    6
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-12">
                    7
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-12">
                    8
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-12">
                    9
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium  w-12">
                    10
                  </th>
                </tr>
              </thead>
              <tbody>
                {f51List?.map((document) => {
                  const checked = selectedF51Ids.includes(document._id);
                  return (
                    <tr key={document._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-1 py-1 text-center text-sm font-medium ">
                        {document?.date}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.minute}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.noNumber}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.teOeDesignation}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.workArea}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.rerouteSchedule}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.prophylaxisType}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.ubpZone}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.interestedUbp}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1">
                        {document?.note}
                      </td>
                      <td className="border border-gray-300 text-center px-1 py-1 w-10">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          checked={checked}
                          onChange={() => toggleF51(document._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <MyTextarea<F56Dto>
            className={"min-h-[150px]"}
            control={form.control}
            name={"description"}
            placeholder={t("Izoh")}
          />

          <MySelect<F56Dto>
            control={form.control}
            name={"recipientIds"}
            options={staffOptions || []}
            label={t("Yuboriladigan xodimlar")}
            placeholder={t("Select staffs")}
            isClearable
            required
            isMulti
          />
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={onCancel}
            >
              {t("Bekor qilish")}
            </Button>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
              >
                <Send size={16} />
                {t("Yuborish")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default F56DocumentForm;
