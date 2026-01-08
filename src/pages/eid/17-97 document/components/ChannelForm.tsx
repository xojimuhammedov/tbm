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
      ? `${t("Tahrirlash")} ${t("Chiquvchi hujjatlar")}`
      : `${t("Yaratish")} ${t("Chiquvchi hujjatlar")}`;

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <h2 className={"text-xl font-medium"}>{title}</h2>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
            {/* 1-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"order_number"}
                label={t("Tartib raqami")}
                placeholder={t("Tartib raqami")}
                required
                disabled={readOnly}
            />
            {/* 2-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"date"}
                label={t("Sana")}
                placeholder={t("Sana")}
                required
                disabled={readOnly}
            />
            {/* 3-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"external_outbound_number"}
                label={t("Tashqi chiquvchi hujjat raqami")}
                placeholder={t("Tashqi chiquvchi hujjat raqami")}
                required
                disabled={readOnly}
            />

            {/* 4-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"recipient_organization"}
                label={t("Jo‘natilayotgan tashkilot (korxona)")}
                placeholder={t("Jo‘natilayotgan tashkilot (korxona)")}
                required
                disabled={readOnly}
            />
            {/* 5-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"short_content"}
                label={t("Qisqa mazmuni")}
                placeholder={t("Qisqa mazmuni")}
                required
                disabled={readOnly}
            />
            {/* 6-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"incoming_response_number"}
                label={t("Kelib tushgan javob raqami")}
                placeholder={t("Kelib tushgan javob raqami")}
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
                    onClick={() => navigate("/eid/eid-97")}
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