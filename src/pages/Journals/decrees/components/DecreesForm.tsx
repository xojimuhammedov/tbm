import {Form, MyInput} from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {DecreesDto} from "@/pages/Journals/decrees/schemas/createDecreesSchema.ts";
import useDecreesForm from "@/pages/Journals/decrees/hooks/useDecreesForm.ts";


interface DecreesFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const DecreesForm = ({
                      id,
                      onSave,
                      readOnly = false,
                    }: DecreesFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useDecreesForm({ id, onSave });
  const title = id ? t("Tahrirlash") : t("Yangi buyruq");

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="flex items-center justify-between">
            <h2 className={"text-xl font-medium"}>{title}</h2>
          </div>
          <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
            <MyInput<DecreesDto>
                control={form.control}
                name={"registration_date"}
                type={"date"}
                label={t("Ro'yxatga olingan sana")}
                disabled={readOnly}
            />

            <MyInput<DecreesDto>
                control={form.control}
                name={"summary"}
                label={t("Xulosa")}
                required
                disabled={readOnly}
            />

            <MyInput<DecreesDto>
                control={form.control}
                name={"prepared_by"}
                label={t("Tayyorlagan shaxs")}
                required
                disabled={readOnly}
            />

            <MyInput<DecreesDto>
                control={form.control}
                name={"signed_by"}
                label={t("Imzolagan.")}
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
                    {t("Orqaga")}
                  </Button>
                </div>
              </FormContainerFooter>
          )}
        </form>
      </Form>
  );
};

export default DecreesForm;