import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChannelStatusDto } from "../schemas/createChannelStatusSchema";
import useChannelStatusForm from "../hooks/useChannelStatusForm";

interface ChannelStatusFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const ChannelStatusForm = ({
  id,
  onSave,
  readOnly = false,
}: ChannelStatusFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useChannelStatusForm({ id, onSave });

  const title = id ? t("Tahrirlash") : t("Yangi hujjat");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<ChannelStatusDto>
            control={form.control}
            name={"device_type"}
            label={"1. Қурилма тури"}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelStatusDto>
            control={form.control}
            name={"point_name"}
            label={"2. Нуқта номи"}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelStatusDto>
            control={form.control}
            name={"duty_officer"}
            label={"3. Навбатчи"}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelStatusDto>
            control={form.control}
            name={"ko_status_at_shift_handover"}
            label={"4. КО ҳолати"}
            required
            disabled={readOnly}
          />

          <MyInput<ChannelStatusDto>
            control={form.control}
            name={"shift_handover_at"}
            label={"5. Сменани топшириш вақти"}
            type="datetime-local"
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

export default ChannelStatusForm;
