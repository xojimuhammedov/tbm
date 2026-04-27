import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TvRvOutputLogDto } from "../schemas/createTvRvOutputLogSchema";
import useTvRvOutputLogForm from "../hooks/useTvRvOutputLogForm";

interface TvRvOutputLogFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const TvRvOutputLogForm = ({
  id,
  onSave,
  readOnly = false,
}: TvRvOutputLogFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useTvRvOutputLogForm({ id, onSave });

  const title = id ? t("Tahrirlash") : t("Yangi hujjat");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<TvRvOutputLogDto>
            control={form.control}
            name={"record_date"}
            label={"1. Sana"}
            type="date"
            required
            disabled={readOnly}
          />

          <MyInput<TvRvOutputLogDto>
            control={form.control}
            name={"output_type"}
            label={"2. Чиқиш тури (TV/RV)"}
            required
            disabled={readOnly}
          />

          <MyInput<TvRvOutputLogDto>
            control={form.control}
            name={"tv_output_section"}
            label={"3. Чиқиш бўлими"}
            required
            disabled={readOnly}
          />

          <MyInput<TvRvOutputLogDto>
            control={form.control}
            name={"planned_time"}
            label={"4. Режалаштирилgan вақт"}
            type="datetime-local"
            required
            disabled={readOnly}
          />

          <MyInput<TvRvOutputLogDto>
            control={form.control}
            name={"actual_time"}
            label={"5. Ҳақиқий вақт"}
            type="datetime-local"
            required
            disabled={readOnly}
          />

          <MyInput<TvRvOutputLogDto>
            control={form.control}
            name={"recipient_address"}
            label={"6. Қабул қилувчи манзили"}
            required
            disabled={readOnly}
          />

          <MyInput<TvRvOutputLogDto>
            control={form.control}
            name={"transferred_to"}
            label={"7. Кимга узатилди"}
            required
            disabled={readOnly}
          />

          <div className="md:col-span-3">
            <MyInput<TvRvOutputLogDto>
              control={form.control}
              name={"tv_output_result"}
              label={"8. Чиқиш натижаси"}
              required
              disabled={readOnly}
            />
          </div>

          <div className="md:col-span-3 border p-4 rounded-md space-y-4">
            <h3 className="font-medium">{t("Signed By")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MyInput<TvRvOutputLogDto>
                control={form.control}
                name={"signed_by.full_name"}
                label={"Ф.И.Ш."}
                required
                disabled={readOnly}
              />
              <MyInput<TvRvOutputLogDto>
                control={form.control}
                name={"signed_by.signature"}
                label={"Имзо (Base64/URL)"}
                disabled={readOnly}
              />
            </div>
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

export default TvRvOutputLogForm;
