import { Form, MyInput, MyTextarea } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { StaffDto } from "@/pages/organizations/schemas/createOrgSchema.ts";
import useStaffForm from "@/pages/organizations/hooks/useOrganizationForm";

interface StaffFormProps {
  id: string | null;
  onSave?: () => void;
  readOnly?: boolean;
}

const StaffForm = ({ id, onSave, readOnly = false }: StaffFormProps) => {
  const { t } = useTranslation();
  const { form, onSubmit } = useStaffForm({
    id,
    onSave,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
          <MyInput<StaffDto>
            control={form.control}
            name={"name"}
            label={t("Name")}
            placeholder={t("Enter name")}
            required
            disabled={readOnly}
          />
          <MyTextarea<StaffDto>
            className={"min-h-[120px]"}
            control={form.control}
            name={"description"}
            placeholder={t("Enter description")}
          />
        </div>
        {!readOnly && <FormContainerFooter />}
      </form>
    </Form>
  );
};

export default StaffForm;
