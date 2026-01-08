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
      ? `${t("Tahrirlash")} ${t("Kiruvchi hujjatlar")}`
      : `${t("Yaratish")} ${t("Kiruvchi hujjatlar")}`;

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <h2 className={"text-xl font-medium"}>{title}</h2>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
            {/* 1-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"dept_reg_number"}
                label={t("Bo‘limda ro‘yxatdan o‘tgan tartib raqami")}
                placeholder={t("Bo‘limda ro‘yxatdan o‘tgan tartib raqami")}
                required
                disabled={readOnly}
            />
            {/* 2-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"reg_date"}
                label={t("Sana")}
                placeholder={t("Sana")}
                required
                disabled={readOnly}
            />
            {/* 4-ustun (Rasmda 4-raqam ostida) */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"journal_index"}
                label={t("Jurnal indeksi")}
                placeholder={t("Jurnal indeksi")}
                required
                disabled={readOnly}
            />

            {/* 3-ustun (Rasmda 3-raqam ostida) */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"sender_doc_info"}
                label={t("Kimdan kelib tushgan hujjat va uning raqami")}
                placeholder={t("Kimdan kelib tushgan hujjat va uning raqami")}
                required
                disabled={readOnly}
            />
            {/* 5-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"doc_short_content"}
                label={t("Hujjatning qisqa mazmuni")}
                placeholder={t("Hujjatning qisqa mazmuni")}
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
                    onClick={() => navigate("/eid/eid-98")}
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