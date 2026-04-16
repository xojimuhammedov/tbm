import { MyInput, MyDatePicker } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui";
import { Plus, Trash2 } from "lucide-react";
import useMbbDocumentForm from "@/pages/mbb/talabnoma/hooks/useMbbDocumentForm.ts";

export const MemoFormSection = ({
  form,
  dataFields,
  handleAppendData,
  handleRemoveData,
}: {
  form: ReturnType<typeof useMbbDocumentForm>["form"];
  dataFields: ReturnType<typeof useMbbDocumentForm>["dataFields"];
  handleAppendData: ReturnType<typeof useMbbDocumentForm>["handleAppendData"];
  handleRemoveData: ReturnType<typeof useMbbDocumentForm>["handleRemoveData"];
}) => (
  <>
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
          ></th>
        </tr>
      </thead>
      <tbody>
        {dataFields.map((field, index) => (
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
                onClick={() => handleRemoveData(index)}
                disabled={dataFields.length === 1}
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
        onClick={handleAppendData}
        className="flex items-center gap-2"
      >
        <Plus size={20} />
      </Button>
    </div>
  </>
);
