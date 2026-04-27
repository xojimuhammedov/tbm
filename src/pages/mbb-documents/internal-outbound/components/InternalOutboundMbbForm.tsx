import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InternalOutboundMbbDto } from "../schemas/createInternalOutboundMbbSchema";
import useInternalOutboundMbbForm from "../hooks/useInternalOutboundMbbForm";

interface InternalOutboundMbbFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const InternalOutboundMbbForm = ({
  id,
  onSave,
  readOnly = false,
}: InternalOutboundMbbFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useInternalOutboundMbbForm({ id, onSave });

  const title = id ? t("Tahrirlash") : t("Yangi hujjat");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"reg_num"}
            label={"Рўйхат тартиб рақами"}
            required
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"reg_date"}
            label={"Рўйхат санаси"}
            type="date"
            required
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"journal_index"}
            label={"Журнал индекси"}
            required
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"doc_num"}
            label={"Ҳужжат рақами"}
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"doc_date"}
            label={"Ҳужжат санаси"}
            type="date"
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"recipient"}
            label={"Қабул қилувчи"}
            required
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"response_reference_number"}
            label={"Жавоб хати рақами"}
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"internal_inbound_id"}
            label={"Кириш ҳужжат ID"}
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"assignee"}
            label={"Ижрочи"}
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"deadline"}
            label={"Муддати"}
            type="date"
            disabled={readOnly}
          />

          <MyInput<InternalOutboundMbbDto>
            control={form.control}
            name={"status"}
            label={"Ҳолати"}
            disabled={readOnly}
          />

          <div className="md:col-span-3">
            <MyInput<InternalOutboundMbbDto>
              control={form.control}
              name={"summary"}
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

export default InternalOutboundMbbForm;
