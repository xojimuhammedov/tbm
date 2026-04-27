import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { Button } from "dgz-ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MaintenanceLogDto } from "../schemas/createMaintenanceLogSchema";
import useMaintenanceLogForm from "../hooks/useMaintenanceLogForm";

interface Props {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const MaintenanceLogForm = ({ id, onSave, readOnly = false }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onSubmit } = useMaintenanceLogForm({ id, onSave });
  const title = id ? t("Tahrirlash") : t("Yangi hujjat");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <h2 className={"text-xl font-medium"}>{title}</h2>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
          <MyInput<MaintenanceLogDto>
            control={form.control}
            name={"scheduled_at"}
            label={"1. Режалаштирилган вақт"}
            type="datetime-local"
            required
            disabled={readOnly}
          />
          <MyInput<MaintenanceLogDto>
            control={form.control}
            name={"actual_at"}
            label={"2. Ҳақиқий вақт"}
            type="datetime-local"
            required
            disabled={readOnly}
          />
          <MyInput<MaintenanceLogDto>
            control={form.control}
            name={"actual_duration"}
            label={"3. Давомийлиги (дақиқа)"}
            type="number"
            required
            disabled={readOnly}
          />
          <MyInput<MaintenanceLogDto>
            control={form.control}
            name={"ko_number"}
            label={"4. KO рақами"}
            required
            disabled={readOnly}
          />
          <MyInput<MaintenanceLogDto>
            control={form.control}
            name={"channel_designation"}
            label={"5. Канал белгиси"}
            required
            disabled={readOnly}
          />
          <MyInput<MaintenanceLogDto>
            control={form.control}
            name={"work_section"}
            label={"6. Иш участкаси"}
            required
            disabled={readOnly}
          />
          <MyInput<MaintenanceLogDto>
            control={form.control}
            name={"maintenance_type"}
            label={"7. Техник хизмат тури"}
            required
            disabled={readOnly}
          />
          <MyInput<MaintenanceLogDto>
            control={form.control}
            name={"mbb_zone"}
            label={"8. MBB зонаси"}
            required
            disabled={readOnly}
          />
          <div className="md:col-span-3">
            <MyInput<MaintenanceLogDto>
              control={form.control}
              name={"work_reason"}
              label={"9. Иш сабаби"}
              required
              disabled={readOnly}
            />
          </div>
          <div className="md:col-span-3">
            <MyInput<MaintenanceLogDto>
              control={form.control}
              name={"notes"}
              label={"10. Изоҳлар"}
              disabled={readOnly}
            />
          </div>
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

export default MaintenanceLogForm;
