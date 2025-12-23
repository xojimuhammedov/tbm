import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon, Plus, Trash2 } from "lucide-react";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useFApplicationForm from "@/pages/rh-252/f-252/hooks/useFApplicationForm.ts";

const RH_F_Application = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    form,
    fields,
    actionOptions,
    handleAppend,
    handleRemove,
    onSubmit,
  } = useFApplicationForm({ id });

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          <div className="w-full max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">
              {t(
                  "«Ўзбектелеком» АК фармойишлари бажарилганлиги тўғрисида маълумот шакли",
              )}
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
                      required
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
                  className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                «Ўзбектелеком» АК филиали фармойишининг номери ва сана
              </th>
              <th
                  rowSpan={2}
                  className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Алоқаларни ташкил этиш санаси
              </th>
              <th
                  rowSpan={2}
                  className="border border-gray-300 px-4 py-3 text-xs text-center"
              >
                Ташкил этилган алоқалар трассаси
              </th>
              <th
                  rowSpan={2}
                  className="border border-gray-300 px-4 py-3 text-xs text-center w-32"
              >
                Изох*
              </th>
              <th className="border border-gray-300 px-2 py-3 w-10"></th>
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
                        control={form.control}
                        name={`data.${index}.order_code`}
                        className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Order #12345 - 2025-12-10"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <MyInput
                        control={form.control}
                        name={`data.${index}.connection_established_date`}
                        className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                        placeholder="2025-12-20"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <MyInput
                        control={form.control}
                        name={`data.${index}.connection_route_details`}
                        className="border-0 border-b border-gray-300 rounded-none focus-visible:ring-0"
                        placeholder="Completed"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <MyInput
                        control={form.control}
                        name={`data.${index}.comment`}
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

          <div className="mt-4 text-sm mb-4 flex flex-col gap-2">
            <MyInput
                placeholder={t("")}
                control={form.control}
                name="ap_input"
                label="АП номери, бажарувчининг исм-шарифи, фамилияси ва сана"
                className="w-1/3"
            />
            <MyInput
                control={form.control}
                name="ubp_input"
                label="УБП номери, бажарувчининг исм-шарифи, фамилияси ва сана"
                placeholder={t("")}
                className="w-1/3"
            />
          </div>

          <FormContainerFooter>
            <Button
                size={"sm"}
                variant={"ghost"}
                type={"button"}
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

export default RH_F_Application;