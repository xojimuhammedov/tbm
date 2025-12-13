import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useCardIndexForm from "@/pages/card-indexes/hooks/useCardIndexForm.ts";
import { CardIndexDto } from "@/pages/card-indexes/schemas/createCardIndexSchema.ts";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardIndexFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const CardIndexForm = ({
  id,
  onSave,
  readOnly = false,
}: CardIndexFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit } = useCardIndexForm({ id, onSave });
  const navigate = useNavigate();
  const title = id
    ? `${t("Edit")} ${t("Card index")}`
    : `${t("Create")} ${t("Card index")}`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<CardIndexDto>
            control={form.control}
            name={"code"}
            label={t("Code")}
            placeholder={t("Enter code")}
            required
            disabled={readOnly}
          />
          <MyInput<CardIndexDto>
            control={form.control}
            name={"verification"}
            label={t("Verification")}
            placeholder={t("Enter verification")}
            required
            disabled={readOnly}
          />
          <MyInput<CardIndexDto>
            control={form.control}
            name={"consumer"}
            label={t("Consumer")}
            placeholder={t("Enter consumer")}
            required
            disabled={readOnly}
          />

          <MyInput<CardIndexDto>
            control={form.control}
            name={"zone2"}
            label={t("Zone 2")}
            placeholder={t("Enter zone 2")}
            required
            disabled={readOnly}
          />
          <MyInput<CardIndexDto>
            control={form.control}
            name={"track"}
            label={t("Track")}
            placeholder={t("Enter track")}
            required
            disabled={readOnly}
          />
          <MyInput<CardIndexDto>
            control={form.control}
            name={"id"}
            label={t("ID")}
            placeholder={t("Enter ID")}
            required
            disabled={readOnly}
          />

          <MyInput<CardIndexDto>
            control={form.control}
            name={"international"}
            label={t("International")}
            placeholder={t("Enter international")}
            required
            disabled={readOnly}
          />
          <MyInput<CardIndexDto>
            control={form.control}
            name={"start"}
            label={t("Start")}
            placeholder={t("Enter start date")}
            required
            disabled={readOnly}
          />
          <MyInput<CardIndexDto>
            control={form.control}
            name={"end"}
            label={t("End")}
            placeholder={t("Enter end date")}
            required
            disabled={readOnly}
          />

          <MyInput<CardIndexDto>
            control={form.control}
            name={"signal_level"}
            label={t("Signal level")}
            placeholder={t("Enter signal level")}
            required
            disabled={readOnly}
          />
          <MyInput<CardIndexDto>
            control={form.control}
            name={"order_number_for_stream"}
            label={t("Order number for stream")}
            placeholder={t("Enter order number for stream")}
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
              onClick={() => navigate("/card-indexes")}
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

export default CardIndexForm;
