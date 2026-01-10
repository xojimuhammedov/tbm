import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useExternalOutboundForm
  from "@/pages/in & out documents/17-97 external outbound document/hooks/useExternalOutboundForm.ts";
import {
  ExternalOutboundDto
} from "@/pages/in & out documents/17-97 external outbound document/schemas/createExternalOutboundSchema.ts";

interface ExternalOutboundFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const ExternalOutboundForm = ({ id, onSave, readOnly = false }: ExternalOutboundFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useExternalOutboundForm({ id, onSave });

  const title = id ? t("Tahrirlash") : t("Yangi chiquvchi hujjat");

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <h2 className={"text-xl font-medium"}>{title}</h2>

          <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>

            <MyInput<ExternalOutboundDto>
                control={form.control}
                name={"reg_num"}
                label={"1. Tartib raqami"}
                required
                disabled={readOnly}
            />

            <MyInput<ExternalOutboundDto>
                control={form.control}
                name={"reg_date"}
                label={"2. Sana"}
                type="date"
                required
                disabled={readOnly}
            />

            <MyInput<ExternalOutboundDto>
                control={form.control}
                name={"external_out_doc_number"}
                label={"3. Tashqi chiquvchi hujjat raqami"}
                required
                disabled={readOnly}
            />

            <MyInput<ExternalOutboundDto>
                control={form.control}
                name={"recipient"}
                label={"4. Jo‘natilayotgan tashkilot (korxona)"}
                required
                disabled={readOnly}
            />

            <MyInput<ExternalOutboundDto>
                control={form.control}
                name={"summary"}
                label={"5. Qisqa mazmuni"}
                required
                disabled={readOnly}
            />

            <MyInput<ExternalOutboundDto>
                control={form.control}
                name={"response_reference_number"}
                label={"6. Kelib tushgan javob raqami"}
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

export default ExternalOutboundForm;