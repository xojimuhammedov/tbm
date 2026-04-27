import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TelecomOperativeDto } from "../schemas/createTelecomOperativeSchema";
import useTelecomOperativeForm from "../hooks/useTelecomOperativeForm";

interface Props {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const TelecomOperativeForm = ({ id, onSave, readOnly = false }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useTelecomOperativeForm({ id, onSave });
  const title = id ? t("Tahrirlash") : t("Yangi hujjat");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"received_at"}
            label={"1. Қабул қилинган вақт"}
            type="datetime-local"
            required
            disabled={readOnly}
          />
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"transmitted_at"}
            label={"2. Узатилган вақт"}
            type="datetime-local"
            required
            disabled={readOnly}
          />
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"sender_address"}
            label={"3. Юборувчи манзили"}
            required
            disabled={readOnly}
          />
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"recipient_address"}
            label={"4. Қабул қилувчи манзили"}
            required
            disabled={readOnly}
          />
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"transferred_to"}
            label={"5. Кимга узатилди"}
            required
            disabled={readOnly}
          />
        </div>

        <h3 className={"text-lg font-medium mt-6"}>{t("Кодограмма")}</h3>
        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4"}>
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"kodogram.status_index"}
            label={"Статус индекси"}
            disabled={readOnly}
          />
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"kodogram.ko_number"}
            label={"KO рақами"}
            disabled={readOnly}
          />
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"kodogram.start_time"}
            label={"Бошланиш вақти"}
            type="datetime-local"
            disabled={readOnly}
          />
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"kodogram.end_time"}
            label={"Тугаш вақти"}
            type="datetime-local"
            disabled={readOnly}
          />
        </div>

        <div className={"grid grid-cols-1 gap-4 mt-4"}>
          <MyInput<TelecomOperativeDto>
            control={form.control}
            name={"content_info"}
            label={"6. Мазмуни"}
            required
            disabled={readOnly}
          />
        </div>

        {!readOnly && (
          <FormContainerFooter>
            <Button size={"sm"} variant={"ghost"} type={"button"} onClick={() => navigate(-1)}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              {t("Back")}
            </Button>
          </FormContainerFooter>
        )}
      </form>
    </Form>
  );
};

export default TelecomOperativeForm;
