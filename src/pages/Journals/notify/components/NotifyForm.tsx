import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useNotifyForm from "@/pages/Journals/notify/hooks/useNotifyForm.ts";
import {NotifyDto} from "@/pages/Journals/notify/schemas/createNotifySchema.ts";

interface NotifyFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const NotifyForm = ({
                      id,
                      onSave,
                      readOnly = false,
                    }: NotifyFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Hook nomini ham yangi maqsadga ko'ra useNotifyForm deb atash mantiqiyroq
  const { form, onSubmit } = useNotifyForm({ id, onSave });

  const title = id ? t("Tahrirlash") : t("Yangi bildirishnoma");

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="flex items-center justify-between">
            <h2 className={"text-xl font-medium"}>{title}</h2>
          </div>

          <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
            <MyInput<NotifyDto>
                control={form.control}
                name={"registration_date"}
                label={t("Рўйхат санаси")}
                type="date"
                required
                disabled={readOnly}
            />

            <MyInput<NotifyDto>
                control={form.control}
                name={"nomenclature_number"}
                label={t("Номенклатура рақами")}
                type="number"
                required
                disabled={readOnly}
            />

            <MyInput<NotifyDto>
                control={form.control}
                name={"doc_recipient"}
                label={t("Ҳужжатни қабул қилувчи")}
                required
                disabled={readOnly}
            />

            <MyInput<NotifyDto>
                control={form.control}
                name={"signed_by"}
                label={t("Имзолаган шахс")}
                required
                disabled={readOnly}
            />

            <div className="md:col-span-2 lg:col-span-3">
              <MyInput<NotifyDto>
                  control={form.control}
                  name={"summary"}
                  label={t("Қисқача мазмуни")}
                  required
                  disabled={readOnly}
                  // Agar MyInput textarea-ni qo'llab quvvatlasa:
                  // type="textarea"
              />
            </div>
          </div>

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

            {!readOnly && (
                <Button size={"sm"} type={"submit"}>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  {t("Save")}
                </Button>
            )}
          </FormContainerFooter>
        </form>
      </Form>
  );
};

export default NotifyForm;