import { Form, MyInput, MySelect } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import useRoleForm from "@/pages/role/hooks/useRoleForm.ts";
import { RoleDto } from "@/pages/role/schemas/createRoleSchema.ts";
import usePermissionOptions from "@/pages/role/hooks/usePermissionOptions.ts";

interface StaffFormProps {
  id: string | null;
  onSave?: () => void;
}

const RoleForm = ({ id, onSave }: StaffFormProps) => {
  const { t } = useTranslation();
  const { permissionOptions } = usePermissionOptions();
  const { form, onSubmit } = useRoleForm({
    id,
    onSave,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <MyInput<RoleDto>
          control={form.control}
          name={"name"}
          label={t("Role")}
          placeholder={t("Enter role")}
          required
        />
        <MySelect<RoleDto>
          control={form.control}
          name={"permissions"}
          options={permissionOptions || []}
          label={t("Permissions")}
          placeholder={t("Select permission")}
          isClearable
          required
          isMulti
        />
        <FormContainerFooter />
      </form>
    </Form>
  );
};

export default RoleForm;
