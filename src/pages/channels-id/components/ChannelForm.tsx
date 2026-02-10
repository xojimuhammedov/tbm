import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useChannelForm from "@/pages/channels-id/hooks/useChannelForm.ts";
import { ChannelDto } from "@/pages/channels-id/schemas/createChannelSchema.ts";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChannelFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const ChannelForm = ({ id, onSave, readOnly = false }: ChannelFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit } = useChannelForm({ id, onSave });
  const navigate = useNavigate();

  const title = id
      ? `${t("Edit")} ${t("Channels ID")}`
      : `${t("Create")} ${t("Channels ID")}`;

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <h2 className={"text-xl font-medium"}>{title}</h2>

          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
            <MyInput<ChannelDto>
                control={form.control}
                name={"code"}
                label={t("ID номера")}
                placeholder={t("ID номера")}
                required
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"consumer_name"}
                label={t("Наименование потребителя")}
                placeholder={t("Наименование потребителя")}
                required
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"connection_number"}
                label={t("Номер связи")}
                placeholder={t("Номер связи")}
                disabled={readOnly}
            />

            <MyInput<ChannelDto>
                control={form.control}
                name={"point_a"}
                label={t("Пункт А")}
                placeholder={t("Пункт А")}
                required
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"point_b"}
                label={t("Пункт B")}
                placeholder={t("Пункт B")}
                required
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"link_N1"}
                label={t("Линк №1")}
                placeholder={t("Линк №1")}
                required
                disabled={readOnly}
            />

            <MyInput<ChannelDto>
                control={form.control}
                name={"organization_order"}
                label={t("Распоряжение на орг.")}
                placeholder={t("Распоряжение на орг.")}
                required
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"organization_order_date"}
                label={t("Дата распоряжения")}
                type="date"
                required
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"status"}
                label={t("Статус")}
                placeholder={t("active/inactive")}
                disabled={readOnly}
            />

            <MyInput<ChannelDto>
                control={form.control}
                name={"dissolution_order"}
                label={t("Распоряжение на расформирование")}
                placeholder={t("Номер приказа")}
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"dissolution_order_date"}
                label={t("Дата расформирования")}
                type="date"
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"verification_status"}
                label={t("Сверка")}
                placeholder={t("Статус сверки")}
                disabled={readOnly}
            />

            <MyInput<ChannelDto>
                control={form.control}
                name={"deciphering_notes"}
                label={t("Примечания")}
                placeholder={t("Примечания")}
                disabled={readOnly}
            />
            <MyInput<ChannelDto>
                control={form.control}
                name={"is_archived"}
                label={t("Архив")}
                placeholder={t("Да/Нет")}
                disabled={readOnly}
            />
          </div>

          {!readOnly && (
              <FormContainerFooter>
                <Button
                    size={"sm"}
                    variant={"default"}
                    type={"button"}
                    onClick={() => navigate(-1)}
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  {t("Back")}
                </Button>
              </FormContainerFooter>
          )}
        </form>
      </Form>
  );
};

export default ChannelForm;