import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InternalInboundMbbDto } from "@/pages/mbb-documents/internal-inbound/schemas/createInternalInboundMbbSchema";
import useInternalInboundMbbForm from "@/pages/mbb-documents/internal-inbound/hooks/useInternalInboundMbbForm";

interface InternalInboundMbbFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const InternalInboundMbbForm = ({
  id,
  onSave,
  readOnly = false,
}: InternalInboundMbbFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useInternalInboundMbbForm({ id, onSave });

  const title = id ? t("Tahrirlash") : t("Yangi hujjat");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"reg_num"}
            label={"Рўйхат тартиб рақами"}
            required
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"reg_date"}
            label={"Рўйхат санаси"}
            type="date"
            required
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"journal_index"}
            label={"Журнал индеksi"}
            required
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"original_num"}
            label={"Юборилган рақами (Original)"}
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"original_date"}
            label={"Юборилган санаси (Original)"}
            type="date"
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"doc_num"}
            label={"Ҳужжат рақами"}
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"doc_date"}
            label={"Ҳужжат санаси"}
            type="date"
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"doc_type"}
            label={"Ҳужжат тури"}
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"organization"}
            label={"Ташкилот"}
            required
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"assignee"}
            label={"Ижрочи"}
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"deadline"}
            label={"Муддати (Deadline)"}
            type="date"
            disabled={readOnly}
          />

          <MyInput<InternalInboundMbbDto>
            control={form.control}
            name={"reply_order_date"}
            label={"Жавоб бериш санаси"}
            type="date"
            disabled={readOnly}
          />

          <div className="md:col-span-3">
            <MyInput<InternalInboundMbbDto>
              control={form.control}
              name={"resolution"}
              label={"Резолюция"}
              disabled={readOnly}
            />
          </div>

          <div className="md:col-span-3">
            <MyInput<InternalInboundMbbDto>
              control={form.control}
              name={"content"}
              label={"Қисқача мазмуни"}
              required
              disabled={readOnly}
            />
          </div>
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

export default InternalInboundMbbForm;
