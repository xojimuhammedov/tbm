import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import usePositionForm from "@/pages/position/hooks/usePositionForm.ts";
import { PositionDto } from "@/pages/position/schemas/createPositionSchema.ts";

interface PositionFormProps {
  id: string | null;
  onSave?: () => void;
}

const PositionForm = ({ id, onSave }: PositionFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit } = usePositionForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <MyInput<PositionDto>
          control={form.control}
          name={"name"}
          label={t("Name")}
          placeholder={t("Enter position name")}
          required
        />
        <MyInput<PositionDto>
          control={form.control}
          name={"description"}
          label={t("Description")}
          placeholder={t("Enter description")}
        />
        <FormContainerFooter />
      </form>
    </Form>
  );
};

export default PositionForm;
