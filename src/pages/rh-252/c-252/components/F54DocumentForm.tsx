import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import useF54DocumentForm from "@/pages/rh-252/c-252/hooks/useF54DocumentForm.ts";

interface F54DocumentFormProps {
  id?: string | null;
  onSave?: () => void;
  onCancel?: () => void;
}

const F56DocumentForm = ({ id, onSave }: F54DocumentFormProps) => {
  const { t } = useTranslation();
  const { form, handleSubmit } = useF54DocumentForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4">
        <div className="w-full max-w-7xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center">
            O‘ZBEKISTON RESPUBLIKASI ALOQA, AXBOROTLASHTIRISH VA
            TELEKOMMUNIKATSIYA TEXNOLOGIYALARI DAVLAT QO‘MITASI
          </h1>
          <h2 className="text-xl font-semibold mt-2 text-center">
            “O‘ZBEKISTON TELEKOMMUNIKATSIYA TARMOQLARINI BOSHQARISH RESPUBLIKA
            MARKAZI” DAVLAT UNITAR KORXONASI
          </h2>

          <div className="grid grid-cols-3 gap-12 mb-8 mt-4">
            <MyInput
              control={form.control}
              placeholder={t("Sana")}
              className="border border-t-0 border-l-0 border-r-0 rounded-none"
            />
            <MyInput
              control={form.control}
              placeholder={t("No")}
              className="border border-t-0 border-l-0 border-r-0 rounded-none"
            />
            <MyInput
              control={form.control}
              placeholder={t("Soni")}
              className="border border-t-0 border-l-0 border-r-0 rounded-none"
            />
          </div>
          <MyInput
            control={form.control}
            label={t("Kimga")}
            className="w-1/3 border border-t-0 border-l-0 border-r-0 rounded-none"
          />

          <table className="border border-gray-300 mt-6">
            <thead className="bg-gray-100">
              <tr className="">
                <th
                  rowSpan={2}
                  className="border border-gray-300 p-2 w-48 align-middle"
                >
                  Алоқа йўналиши (А п - В п.)
                </th>
                <th rowSpan={2} className="border border-gray-300 p-2 w-20">
                  ID
                </th>
                <th rowSpan={2} className="border border-gray-300 p-2 w-32">
                  «А» томон адреси
                </th>
                <th rowSpan={2} className="border border-gray-300 p-2 w-32">
                  «В» томон адреси
                </th>
                <th rowSpan={2} className="border border-gray-300 p-2 w-32">
                  Фармойиш номери
                </th>
                <th rowSpan={2} className="border border-gray-300 p-2 w-40">
                  «Ўзбектелеком» АК филиаллари томонидан алоқа-ларни ташкил этиш
                  муддати
                </th>
                <th rowSpan={2} className="p-2">
                  Буёртмачининг алоқани қабул қилган вақти-нинг Ф.И.Ш.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="border border-gray-300 p-1">
                  <MyInput
                    control={form.control}
                    placeholder={t("")}
                    className="border border-t-0 border-l-0 border-r-0 rounded-none"
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <MyInput
                    control={form.control}
                    placeholder={t("")}
                    className="border border-t-0 border-l-0 border-r-0 rounded-none"
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <MyInput
                    control={form.control}
                    placeholder={t("")}
                    className="border border-t-0 border-l-0 border-r-0 rounded-none"
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <MyInput
                    control={form.control}
                    placeholder={t("")}
                    className="border border-t-0 border-l-0 border-r-0 rounded-none"
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <MyInput
                    control={form.control}
                    placeholder={t("")}
                    className="border border-t-0 border-l-0 border-r-0 rounded-none"
                  />
                </td>
                <td className="border border-gray-300 p-1">
                  <MyInput
                    control={form.control}
                    placeholder={t("")}
                    className="border border-t-0 border-l-0 border-r-0 rounded-none"
                  />
                </td>
                <td className="p-1">
                  <div className="flex items-center gap-2">
                    <MyInput
                      control={form.control}
                      placeholder={t("")}
                      className="border border-t-0 border-l-0 border-r-0 rounded-none"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </Form>
  );
};

export default F56DocumentForm;
