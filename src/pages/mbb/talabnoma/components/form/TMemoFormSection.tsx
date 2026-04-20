import React from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MyInput, MySelect } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui/button";
import { Plus, Trash2 } from "lucide-react";
import { MbbDocumentDto } from "../../schemas/createMbbDocumentSchema";

interface TMemoFormSectionProps {
  form: UseFormReturn<MbbDocumentDto>;
  dataFields: any[];
  handleAppendData: () => void;
  handleRemoveData: (index: number) => void;
}

export const TMemoFormSection: React.FC<TMemoFormSectionProps> = ({
  form,
  dataFields,
  handleAppendData,
  handleRemoveData,
}) => {
  const { t } = useTranslation();

  const actionOptions = [
    { label: t("Tashkil etish"), value: "create" },
    { label: t("Ko'chirish"), value: "update" },
    { label: t("O'chirish"), value: "delete" },
  ];

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto p-4 mb-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          {t("«Ўзбектелеком» АК фармойишлари бажарилганлиги тўғрисида маълумот шакли")}
        </h1>
        <div className="flex flex-col mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm mb-2">
            <span>
              «Ўзбектелеком» АК филиалларининг фармойишлари асосида алоқаларни
            </span>
            <div className="w-[300px] text-left">
              <MySelect
                control={form.control}
                name="action_type"
                options={actionOptions}
                placeholder={t("Tanlang...")}
                isClearable
                isMulti
              />
            </div>
            <span>тўғрисида</span>
          </div>

          <div className="flex items-end gap-2 justify-center">
            <MyInput
              control={form.control}
              placeholder={t("")}
              name={"request_number"}
              className="border border-t-0 border-l-0 border-r-0 rounded-none w-[100px]"
            />{" "}
            {t("сон МАЪЛУМОТ")}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="border border-gray-300 w-full">
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
                className="border border-gray-300 px-4 py-3 text-xs text-center min-w-[200px]"
              >
                «Ўзбектелеком» АК филиали фармойишининг номери ва сана
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center min-w-[150px]"
              >
                Алоқаларни ташкил этиш санаси
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center min-w-[200px]"
              >
                Ташкил этилган алоқалар трассаси
              </th>
              <th
                rowSpan={2}
                className="border border-gray-300 px-4 py-3 text-xs text-center w-48"
              >
                Изох*
              </th>
              <th className="border border-gray-300 px-2 py-3 w-12"></th>
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
                    control={form.control}
                    name={`t_memo_data.${index}.order_code`}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Order #12345 - 2025-12-10"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    control={form.control}
                    name={`t_memo_data.${index}.connection_established_date`}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                    placeholder="2025-12-20"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    control={form.control}
                    name={`t_memo_data.${index}.connection_route_details`}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                    placeholder="Completed"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <MyInput
                    control={form.control}
                    name={`t_memo_data.${index}.comment`}
                    className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                    placeholder="No issues"
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
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          onClick={handleAppendData}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
        </Button>
      </div>

      <div className="mt-6 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <MyInput
          placeholder={t("")}
          control={form.control}
          name="ap_input"
          label={t("АП номери, бажарувчининг исм-шарифи, фамилияси ва сана")}
        />
        <MyInput
          control={form.control}
          name="ubp_input"
          label={t("УБП номери, бажарувчининг исм-шарифи, фамилияси ва сана")}
          placeholder={t("")}
        />
      </div>
    </div>
  );
};
