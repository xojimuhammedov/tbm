import { ArrowLeft, Send } from "lucide-react";
import {
  Form,
  MyInput,
  MySelect,
  MyTextarea,
} from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import useF51DocumentForm from "@/pages/rtsi/f-51/hooks/useF51DocumentForm.ts";
import { F51Dto } from "@/pages/rtsi/f-51/schemas/createF51Schema.ts";
import useChannelsOptions from "@/pages/channels-5_3/hooks/useChannelsOptions.ts";
import useFlowsOptions from "@/pages/flows-5_1/hooks/useFlowsOptions.ts";
import { Button } from "dgz-ui/button";

interface F51DocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const F56DocumentForm = ({ id, onSave, onCancel }: F51DocumentFormProps) => {
  const { t } = useTranslation();
  const { staffOptions } = useStaffOptions();
  const { channelOptions } = useChannelsOptions();
  const { flowMbbOptions } = useFlowsOptions();
  const { form, handleSubmit } = useF51DocumentForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4">
        <div className="rounded-lg shadow-sm border p-6 space-y-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-2 hover:text-gray-800"
              onClick={onCancel}
            >
              <ArrowLeft size={20} />
              <span>{t("Bekor qilish")}</span>
            </button>
            <div className="text-sm text-gray-500">{t("RH 45-232/2012")}</div>
          </div>

          <h1 className="text-2xl font-bold">{t("Hujjat yaratish F-51")}</h1>

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

          <div>
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
                    {t("Kanal kodi")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs w-12"
                    rowSpan={2}
                  >
                    {t("NO nomeri")}
                  </th>
                  <th
                    className="border border-gray-300 px-1 py-1 text-xs !w-8"
                    rowSpan={2}
                  >
                    {t("TE va OE tarmoqlari kanallarining belglanishi")}
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
                    {t("Profilaktika turi")}
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
                    {t("Manfaatdor UBP")}
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
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium">
                    5
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-24">
                    6
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-10">
                    7
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
                    8
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-20">
                    9
                  </th>
                  <th className="border border-gray-300 px-1 py-1 text-xs font-medium w-12">
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
                    <MyInput<F51Dto>
                      control={form.control}
                      name={`date`}
                      placeholder={t("Kiriting")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F51Dto>
                      control={form.control}
                      name={`minute`}
                      placeholder={t("00")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1 w-20">
                    <MySelect<F51Dto>
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
                    <MyInput<F51Dto>
                      control={form.control}
                      name={`noNumber`}
                      placeholder={t("Raqami")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F51Dto>
                      control={form.control}
                      name={`teOeDesignation`}
                      placeholder={t("Belgilanishi")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F51Dto>
                      control={form.control}
                      name={`workArea`}
                      placeholder={t("Uchastka")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MySelect<F51Dto>
                      className={
                        "!border-0 rounded-none text-center h-full !focus-visible:ring-0"
                      }
                      control={form.control}
                      name={`rerouteSchedule`}
                      options={[
                        { label: t("HA"), value: "HA" },
                        { label: t("YO'Q"), value: "YO'Q" },
                      ]}
                      placeholder={t("ha/yo'q")}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F51Dto>
                      control={form.control}
                      name={`prophylaxisType`}
                      placeholder={t("Nomerlar")}
                      className={"border-0 rounded-none text-center"}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MySelect<F51Dto>
                      className={
                        "!border-0 rounded-none text-center h-full !focus-visible:ring-0"
                      }
                      control={form.control}
                      name={`ubpZone`}
                      options={flowMbbOptions || []}
                      placeholder={t("MBB lar")}
                      isMulti
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MySelect<F51Dto>
                      className={
                        "!border-0 rounded-none text-center h-full !focus-visible:ring-0"
                      }
                      control={form.control}
                      name={`interestedUbp`}
                      options={flowMbbOptions || []}
                      placeholder={t("MBB")}
                    />
                  </td>
                  <td className="border border-gray-300 px-1 py-1">
                    <MyInput<F51Dto>
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

          <MyTextarea<F51Dto>
            className={"min-h-[150px]"}
            control={form.control}
            name={"description"}
            placeholder={t("Izoh")}
          />

          <MySelect<F51Dto>
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
