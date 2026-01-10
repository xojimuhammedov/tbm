import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LocalOutboundDto
} from "@/pages/in & out documents/17-99 local outbound document/schemas/createChannelSchema.ts";
import useLocalOutboundForm
  from "@/pages/in & out documents/17-99 local outbound document/hooks/useLocalOutboundForm.ts";

interface LocalOutboundFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const LocalOutboundForm = ({ id, onSave, readOnly = false }: LocalOutboundFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit } = useLocalOutboundForm({ id, onSave });
  const navigate = useNavigate();

  const title = id
      ? `${t("Tahrirlash")} ${t("Hujjatlar")}`
      : `${t("Yaratish")} ${t("Hujjatlar")}`;

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <h2 className={"text-xl font-medium"}>{title}</h2>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
            <MyInput<LocalOutboundDto>
                control={form.control}
                name={"reg_num"}
                label={t("Bo‘limda ro‘yxatdan o‘tgan tartib raqami")}
                placeholder={t("Bo‘limda ro‘yxatdan o‘tgan tartib raqami")}
                required
                disabled={readOnly}
            />
            <MyInput<LocalOutboundDto>
                control={form.control}
                name={"reg_date"}
                label={t("Sana")}
                placeholder={t("Sana")}
                type={"date"}
                required
                disabled={readOnly}
            />
            <MyInput<LocalOutboundDto>
                control={form.control}
                name={"journal_index"}
                label={t("Jurnal indeksi")}
                placeholder={t("Jurnal indeksi")}
                required
                disabled={readOnly}
            />
            <MyInput<LocalOutboundDto>
                control={form.control}
                name={"recipient_address"}
                label={t("Kimga yo‘llangan manzili")}
                placeholder={t("Kimga yo‘llangan manzili")}
                required
                disabled={readOnly}
            />
            <MyInput<LocalOutboundDto>
                control={form.control}
                name={"summary"}
                label={t("Hujjatning qisqa mazmuni")}
                placeholder={t("Hujjatning qisqa mazmuni")}
                required
                disabled={readOnly}
            />
            <MyInput<LocalOutboundDto>
                control={form.control}
                name={"notes"}
                label={t("Izoh")}
                placeholder={t("Izoh")}
                disabled={readOnly}
            />
          </div>
          {!readOnly && (
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
          )}
        </form>
      </Form>
  );
};

export default LocalOutboundForm;