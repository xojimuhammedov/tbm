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
      ? `${t("Tahrirlash")} ${t("Hujjatlar")}`
      : `${t("Yaratish")} ${t("Hujjatlar")}`;

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <h2 className={"text-xl font-medium"}>{title}</h2>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
            {/* 1-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"reg_number"}
                label={t("Bo‘limda ro‘yxatdan o‘tgan tartib raqami")}
                placeholder={t("Bo‘limda ro‘yxatdan o‘tgan tartib raqami")}
                required
                disabled={readOnly}
            />
            {/* 2-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"reg_date"}
                label={t("Bo‘limda ro‘yxatdan o‘tgan sanasi")}
                placeholder={t("Bo‘limda ro‘yxatdan o‘tgan sanasi")}
                required
                disabled={readOnly}
            />
            {/* 3-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"journal_index"}
                label={t("Jurnal indeksi")}
                placeholder={t("Jurnal indeksi")}
                required
                disabled={readOnly}
            />

            {/* 4-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"reception_reg_number"}
                label={t("Qabulxonada ro‘yxatdan o‘tgan raqami")}
                placeholder={t("Qabulxonada ro‘yxatdan o‘tgan raqami")}
                required
                disabled={readOnly}
            />
            {/* 5-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"reception_reg_date"}
                label={t("Qabulxonada ro‘yxatdan o‘tgan sanasi")}
                placeholder={t("Qabulxonada ro‘yxatdan o‘tgan sanasi")}
                required
                disabled={readOnly}
            />
            {/* 6-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"external_reg_date"}
                label={t("Yuqori tashkilotda ro‘yxatdan o‘tgan sanasi")}
                placeholder={t("Yuqori tashkilotda ro‘yxatdan o‘tgan sanasi")}
                required
                disabled={readOnly}
            />

            {/* 7-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"original_reg_date"}
                label={t("Hujjatning ro‘yxatdan o‘tgan asl sanasi")}
                placeholder={t("Hujjatning ro‘yxatdan o‘tgan asl sanasi")}
                required
                disabled={readOnly}
            />
            {/* 8-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"document_type"}
                label={t("Hujjat turi")}
                placeholder={t("Hujjat turi")}
                required
                disabled={readOnly}
            />
            {/* 9-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"document_owner"}
                label={t("Hujjat egasi (qaysi tashkilotdan)")}
                placeholder={t("Hujjat egasi (qaysi tashkilotdan)")}
                required
                disabled={readOnly}
            />

            {/* 10-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"document_content"}
                label={t("Hujjatning qisqacha mazmuni")}
                placeholder={t("Hujjatning qisqacha mazmuni")}
                required
                disabled={readOnly}
            />
            {/* 11-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"responsible_person"}
                label={t("Bo‘limda kimga yuklatilgan (ijrochi)")}
                placeholder={t("Bo‘limda kimga yuklatilgan (ijrochi)")}
                required
                disabled={readOnly}
            />
            {/* 12-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"management_decision"}
                label={t("Rahbaroyat qarori")}
                placeholder={t("Rahbaroyat qarori")}
                required
                disabled={readOnly}
            />

            {/* 13-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"execution_deadline"}
                label={t("Ijro muddati")}
                placeholder={t("Ijro muddati")}
                required
                disabled={readOnly}
            />
            {/* 14-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"execution_note"}
                label={t("Ijro belgisi (javob xati), kechikish sababi")}
                placeholder={t("Ijro belgisi (javob xati), kechikish sababi")}
                required
                disabled={readOnly}
            />
            {/* 15-ustun */}
            <MyInput<ChannelDto>
                control={form.control}
                name={"response_letter_date"}
                label={t("Javob xatining sanasi")}
                placeholder={t("Javob xatining sanasi")}
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
                    onClick={() => navigate("/eid/eid-96")}
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