import { ArrowLeft, Send } from "lucide-react";
import {
  Form,
  MyInput,
  MySelect,
  MyTextarea,
} from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import useF54DocumentForm from "@/pages/rtsi/f-54/hooks/useF54DocumentForm.ts";
import { F54Dto } from "@/pages/rtsi/f-54/schemas/createF54Schema.ts";
import useChannelsOptions from "@/pages/channels-5_3/hooks/useChannelsOptions.ts";
import useFlowsOptions from "@/pages/flows-5_1/hooks/useFlowsOptions.ts";
import { Button } from "dgz-ui/button";

interface F54DocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const F56DocumentForm = ({ id, onSave, onCancel }: F54DocumentFormProps) => {
  const { t } = useTranslation();
  const { staffOptions } = useStaffOptions();
  const { channelOptions } = useChannelsOptions();
  const { flowMbbOptions } = useFlowsOptions();
  const { form, handleSubmit } = useF54DocumentForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4">
        <div className="rounded-lg shadow-sm border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              className="flex items-center gap-2 hover:text-gray-800"
              onClick={onCancel}
            >
              <ArrowLeft size={20} />
              <span>{t("Bekor qilish")}</span>
            </Button>
            <div className="text-sm text-gray-500">{t("RH 45-232/2012")}</div>
          </div>

          <h1 className="text-2xl font-bold">{t("Hujjat yaratish F-54")}</h1>

          <div className="text-center">
            <h2 className="text-lg font-semibold">{t("V ilova")}</h2>
            <p className="text-sm text-gray-300">{t("(Majburiy)")}</p>
          </div>

          <p className="text-center text-sm">
            {t(
              "Rejaga oid va rejadan tashqari ta'mirlash-sozlash ishlari o'tkazilishini hisobga olish qaydnomasi va uni to'ldrish tartibi",
            )}
          </p>
          <h3 className="text-lg font-semibold">
            {t(
              "B.1 Rejaga oid va rejadan tashqari ta'mirlash-sozlash ishlari o'tkazilishini hisobga olish qaydnomasining shakli",
            )}
          </h3>

          <div>
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
                <tr>
                  <td className="border border-gray-300 px-1 py-1 text-center text-sm font-medium">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`date`}
                      placeholder={t("Kiriting")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`minute`}
                      placeholder={t("00")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`real_minutes`}
                      placeholder={t("00")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MySelect<F54Dto>
                      className={
                        "!border-0 rounded-none text-center h-full !focus-visible:ring-0"
                      }
                      control={form.control}
                      name={`channel_id`}
                      options={channelOptions || []}
                      placeholder={t("Channel")}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`noNumber`}
                      placeholder={t("Raqami")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`teOeDesignation`}
                      placeholder={t("Belgilanishi")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`workArea`}
                      placeholder={t("Uchastka")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`prophylaxisType`}
                      placeholder={t("Profilaktika turi")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`cause`}
                      placeholder={t("Nomerlar")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MySelect<F54Dto>
                      className={
                        "!border-0 rounded-none text-center h-full !focus-visible:ring-0"
                      }
                      control={form.control}
                      name={`ubpZone`}
                      options={flowMbbOptions || []}
                      placeholder={t("MBB")}
                      isMulti
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F54Dto>
                      control={form.control}
                      name={`note`}
                      placeholder={t("Eslatma")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <MyTextarea<F54Dto>
            className={"min-h-[150px]"}
            control={form.control}
            name={"description"}
            placeholder={"Izoh..."}
          />

          <MySelect<F54Dto>
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
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={onCancel}
            >
              {t("Bekor qilish")}
            </Button>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
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
