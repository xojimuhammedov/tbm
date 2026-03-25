import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form"; // MySelect qo'shildi
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions.ts";
import useOutgoingForm from "@/pages/Journals/outgoing/hooks/useOutgoingForm.ts";
import { OutgoingDto } from "@/pages/Journals/outgoing/schemas/createOutgoingSchema.ts";

interface OutgoingFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const OutgoingForm = ({ id, onSave, readOnly = false }: OutgoingFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { staffOptions } = useStaffOptions();
  const { form, onSubmit } = useOutgoingForm({ id, onSave });

  const title = id ? t("Tahrirlash") : t("Yangi chiqish hujjati");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
          <MySelect<OutgoingDto>
            control={form.control}
            name="user_id"
            options={staffOptions || []}
            label={t("Mas'ul xodim (User ID)")}
            placeholder={t("Select staff")}
            isClearable
            required
          />

          <MyInput<OutgoingDto>
            control={form.control}
            name={"registration_date"}
            label={t("Рўйхат санаси")}
            type="date"
            required
            disabled={readOnly}
          />

          <MyInput<OutgoingDto>
            control={form.control}
            name={"doc_index"}
            label={t("Ҳужжат индекси")}
            required
            disabled={readOnly}
          />

          <MyInput<OutgoingDto>
            control={form.control}
            name={"recipient"}
            label={t("Қабул қилувчи (Recipient)")}
            required
            disabled={readOnly}
          />

          <MyInput<OutgoingDto>
            control={form.control}
            name={"summary"}
            label={t("Қисқача мазмуни (Summary)")}
            required
            disabled={readOnly}
          />
        </div>

        {!readOnly && (
          <FormContainerFooter>
            <div className="flex gap-2">
              <Button
                size={"sm"}
                variant={"default"}
                type={"button"}
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                {t("Back")}
              </Button>

              <Button size={"sm"} type={"submit"}>
                {t("Saqlash")}
              </Button>
            </div>
          </FormContainerFooter>
        )}
      </form>
    </Form>
  );
};

export default OutgoingForm;
