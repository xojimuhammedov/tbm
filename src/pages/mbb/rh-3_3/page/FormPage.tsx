import { Button } from "dgz-ui/button";
import { Form, MyInput, MySelect, MyDatePicker } from "dgz-ui-shared/components/form";
import { ArrowLeftIcon, Plus, Trash2 } from "lucide-react";
import useNum3ApplicationForm from "@/pages/mbb/rh-3_3/hooks/useNum3ApplicationForm.ts";
import { useNavigate, useParams } from "react-router-dom";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { useTranslation } from "react-i18next";

const Num3ApplicationPage = () => {
  const { id } = useParams();
  const {
    form,
    fields,
    handleAppend,
    handleRemove,
    onSubmit,
  } = useNum3ApplicationForm({ id });
  const { staffOptions } = useStaffOptions();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-4">
          <h1 className="text-xl font-bold text-center">
            ʻʻOʼzTTBRMʼʼ DUK farmoyishini bajarilishi boʼyicha 3.3.-son shakl
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-lg font-bold mt-2">
            <span>MAʼLUMOTNOMA №</span>
            <MyInput
              name="code"
              control={form.control}
              className="w-20 text-center border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              placeholder="21"
            />
          </div>

          <MyInput
            name="title"
            control={form.control}
            className="text-lg font-semibold text-center border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 mt-2 mb-4"
            placeholder="Xalqaro Ethernet kanalni o'chirish bo'yicha"
          />

          <div className="flex gap-4 mb-4 justify-end">
            <div className="w-64">
              <MySelect
                name="signer"
                control={form.control}
                options={staffOptions || []}
                placeholder="Imzolovchini tanlang"
                label="Imzolovchi"
              />
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
                № t/r
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                "O'zTTBRM" DUK farmoyish №
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Farmoyishda ko'rsatilgan vaqt
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Farmoyish bajarilgan vaqt
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Farmoyish bajarilishida ma'sul shaxs
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Iste'molchi (Aloqani ishga qabul qilib olgan ise'molchining F.I.SH.)
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center w-32"
              >
                Izoh
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center w-12"
              >
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
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyDatePicker
                    name={`data.${index}.assigned_time`}
                    control={form.control}
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyDatePicker
                    name={`data.${index}.completed_time`}
                    control={form.control}
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.responsible_executor`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.customer_details`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    name={`data.${index}.comment`}
                    control={form.control}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
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

       <FormContainerFooter>
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
            {t("Back")}
          </Button>
        </FormContainerFooter>
      </form>
    </Form>
  );
};

export default Num3ApplicationPage;
