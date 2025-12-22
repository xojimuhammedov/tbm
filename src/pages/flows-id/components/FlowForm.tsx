import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useFlowForm from "@/pages/flows-id/hooks/useFlowForm.ts";
import { FlowDto } from "@/pages/flows-id/schemas/createFlowSchema.ts";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FlowFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const FlowForm = ({ id, onSave, readOnly = false }: FlowFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit } = useFlowForm({ id, onSave });
  const navigate = useNavigate();
  const title = id
    ? `${t("Edit")} ${t("Flows ID")}`
    : `${t("Create")} ${t("Flows ID")}`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<FlowDto>
            control={form.control}
            name={"code"}
            label={t("ID nomer")}
            placeholder={t("Enter ID nomer")}
            required
            disabled={readOnly}
          />
          <MyInput<FlowDto>
            control={form.control}
            name={"name_point_a"}
            label={t("Наименование A")}
            placeholder={t("Наименование A")}
            required
            disabled={readOnly}
          />
          <MyInput<FlowDto>
            control={form.control}
            name={"name_point_b"}
            label={t("Наименование B")}
            placeholder={t("Наименование B")}
            required
            disabled={readOnly}
          />
          <MyInput<FlowDto>
            control={form.control}
            name={"point_a"}
            label={t("Пункт A")}
            placeholder={t("Пункт B")}
            required
            disabled={readOnly}
          />
          <MyInput<FlowDto>
            control={form.control}
            name={"point_b"}
            label={t("Пункт B")}
            placeholder={t("Пункт B")}
            required
            disabled={readOnly}
          />

          <MyInput<FlowDto>
            control={form.control}
            name={"signal_level"}
            label={t("Уровень сигнала")}
            placeholder={t("Уровень сигнала")}
            required
            disabled={readOnly}
          />

          <MyInput<FlowDto>
            control={form.control}
            name={"organization_order"}
            label={t("Номер распоряжения на организацию")}
            placeholder={t("Номер распоряжения на организацию")}
            required
            disabled={readOnly}
          />
          <MyInput<FlowDto>
            control={form.control}
            name={"deciphering_order_number"}
            label={t("Номер распоряжения на расформирование")}
            placeholder={t("Номер распоряжения на расформирование")}
            required
            disabled={readOnly}
          />

          <MyInput<FlowDto>
            control={form.control}
            name={"note"}
            label={t("Примечание")}
            placeholder={t("Примечание")}
            required
            disabled={readOnly}
          />
          <MyInput<FlowDto>
            control={form.control}
            name={"deciphering_archive"}
            label={t("Архив распоряжения")}
            placeholder={t("Архив распоряжения")}
            required
            disabled={readOnly}
          />
          <MyInput<FlowDto>
            control={form.control}
            name={"organization_archive"}
            label={t("Архив организации")}
            placeholder={t("Архив организации")}
            required
            disabled={readOnly}
          />
        </div>
        {!readOnly && (
          <FormContainerFooter>
            <Button
              size={"sm"}
              variant={"ghost"}
              type={"button"}
              onClick={() => navigate("/flows-5_1")}
            >
              <ArrowLeftIcon />
              {t("Back")}
            </Button>
          </FormContainerFooter>
        )}
      </form>
    </Form>
  );
};

export default FlowForm;
