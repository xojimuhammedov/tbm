import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ExternalInboundDto
} from "@/pages/in & out documents/17-96 external inbound document/schemas/createExternalInboundSchema.ts";
import useExternalInboundForm
  from "@/pages/in & out documents/17-96 external inbound document/hooks/useExternalInboundForm.ts";

interface ExternalInboundFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const ExternalInboundForm = ({ id, onSave, readOnly = false }: ExternalInboundFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useExternalInboundForm({ id, onSave });

  const title = id ? t("Tahrirlash") : t("Yangi hujjat");

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <h2 className={"text-xl font-medium"}>{title}</h2>

          <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"reg_num"}
                label={"1. Бўлим тартиб рақами"}
                required
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"reg_date"}
                label={"2. Бўлим рўйхат санаси"}
                type="date"
                required
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"journal_index"}
                label={"3. Журнал индекси"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"reception_num"}
                label={"4. Қабулхона рўйхат рақами"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"reception_date"}
                label={"5. Қабулхона рўйхат санаси"}
                type="date"
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"original_num"}
                label={"6. Хатнинг тартиб рақами"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"original_date"}
                label={"7. Ҳужжат асл санаси"}
                type="date"
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"doc_type"}
                label={"8. Ҳужжат тури"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"organization"}
                label={"9. Юборган ташкилот"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"content"}
                label={"10. Қисқача мазмуни"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"assignee"}
                label={"11. Ижрочи (кимга)"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"resolution"}
                label={"12. Раҳбарият қарори"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"deadline"}
                label={"13. Ижро муддати"}
                type="date"
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"status"}
                label={"14. Ижро белгиси / Сабаб"}
                disabled={readOnly}
            />

            <MyInput<ExternalInboundDto>
                control={form.control}
                name={"reply_order_date"}
                label={"15. Жавоб хати санаси"}
                type="date"
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
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  {t("Back")}
                </Button>
              </FormContainerFooter>
          )}
        </form>
      </Form>
  );
};

export default ExternalInboundForm;