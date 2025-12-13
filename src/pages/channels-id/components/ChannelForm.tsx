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
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<ChannelDto>
            control={form.control}
            name={"id_number"}
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
            required
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
            name={"organization_order_number"}
            label={t("распоряжения на орг")}
            placeholder={t("распоряжения на орг")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"deciphering_notes"}
            label={t("Примечания расформиров")}
            placeholder={t("Примечания расформиров")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"is_archived"}
            label={t("архив")}
            placeholder={t("архив")}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelDto>
            control={form.control}
            name={"verification_status"}
            label={t("Сверка")}
            placeholder={t("Сверка")}
            required
            disabled={readOnly}
          />

          {/* <MyInput<ChannelDto>
            control={form.control}
            name={"channel_mode"}
            label={t("Channel mode")}
            placeholder={t("Enter channel mode")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"timeslot_number"}
            label={t("Timeslot number")}
            placeholder={t("Enter timeslot number")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"fac_group_bc"}
            label={t("FAC group BC")}
            placeholder={t("Enter FAC group BC")}
            required
            disabled={readOnly}
          /> */}

          {/* <MyInput<ChannelDto>
            control={form.control}
            name={"site_a"}
            label={t("Site A")}
            placeholder={t("Enter site A")}
            required
            disabled={readOnly}
          />
          <MyInput<ChannelDto>
            control={form.control}
            name={"ne_a_id"}
            label={t("NE A ID")}
            placeholder={t("Enter NE A ID")}
            required
            disabled={readOnly}
          /> */}
        </div>
        {!readOnly && (
          <FormContainerFooter>
            <Button
              size={"sm"}
              variant={"ghost"}
              type={"button"}
              onClick={() => navigate("/channels-5_3")}
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

export default ChannelForm;
