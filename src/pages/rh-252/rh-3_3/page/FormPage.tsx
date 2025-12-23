import { useTranslation } from "react-i18next";
import { Button } from "dgz-ui/button";
import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { Plus, Trash2 } from "lucide-react";
import useNum3ApplicationForm from "@/pages/rh-252/rh-3_3/hooks/useNum3ApplicationForm.ts";
import { useParams } from "react-router-dom";

const Num3ApplicationPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    form,
    fields,
    actionOptions,
    isLoading,
    handleAppend,
    handleRemove,
    onSubmit,
  } = useNum3ApplicationForm({ id });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <div className="w-full max-w-7xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            «ЎзТТБРМ» ДУК фармойишлари бажарилганлиги тўғрисида маълумот шакли
          </h1>
          <div className="flex flex-col mb-6">
            <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm mb-2">
              <span>«ЎзТТБРМ» ДУКнинг алоқаларини</span>
              <div className="w-[300px] text-left">
                <MySelect
                  control={form.control}
                  name="action_type"
                  options={actionOptions}
                  placeholder={t("Tanlang...")}
                  isClearable
                  isMulti
                  required
                />
              </div>
              <span>бўйича фармойишларининг бажарилиши тўғрисида</span>
            </div>

            <div className="flex items-center justify-center">
              <MyInput
                control={form.control}
                placeholder={t("")}
                name={"request_number"}
                className="border border-t-0 border-l-0 border-r-0 rounded-none w-[100px]"
              />{" "}
              сон МАЪЛУМОТ
            </div>
          </div>
        </div>

        <table className="border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th
                rowSpan={2}
                className="border border-gray-300 px-2 py-3 text-xs text-center align-middle w-12"
              >
                Т.р.
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                «ЎзТТБРМ» ДУК фармойишининг сони ва сана
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Фармойиш хатката бажарилганлиги
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Фармойишни бажариш учун жавобгарлар
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Ижрочи (алоқани қабул қилган ижрочи фамилияси)
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Бажарилмаганлик сабаби
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center w-32"
              >
                Изох*
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-2 text-center font-medium">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.order_code`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Order #12345 - 2025-12-10"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.execution_status`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                    placeholder="Completed"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.responsible_executor`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                    placeholder="John Doe"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.customer_details`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                    placeholder="Customer ABC"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.failure_reason`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.comment`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                    placeholder="No issues"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(index)}
                    disabled={fields.length === 1}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={handleAppend}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
          </Button>
        </div>

        <div className="mt-4 text-sm">
          <MyInput
            placeholder={t("")}
            name="ap_input"
            control={form.control}
            label="АП номери, бажарувчининг исм-шарифи, фамилияси ва сана"
            className="w-1/3"
          />
          <MyInput
            name="ubp_input"
            control={form.control}
            label="УБП номери, бажарувчининг исм-шарифи, фамилияси ва сана"
            placeholder={t("")}
            className="w-1/3"
          />
        </div>

        <div className="mt-8 cursor-pointer">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Num3ApplicationPage;
