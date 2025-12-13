import {
  Form,
  MyInput,
  MyMaskInput,
  MySelect,
} from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import { StaffDto } from "@/pages/staff/schemas/createStaffSchema.ts";
import useStaffForm from "@/pages/staff/hooks/useStaffForm.ts";
import useRoleOptions from "@/pages/role/hooks/useRoleOptions.ts";

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
  const { roleOptions } = useRoleOptions();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
          <MyInput<StaffDto>
            control={form.control}
            name={"first_name"}
            label={t("First name")}
            placeholder={t("Enter first name")}
            required
            disabled={readOnly}
          />
          <MyInput<StaffDto>
            control={form.control}
            name={"second_name"}
            label={t("Second name")}
            placeholder={t("Enter second name")}
            required
            disabled={readOnly}
          />
          <MyInput<StaffDto>
            control={form.control}
            name={"middle_name"}
            label={t("Middle name")}
            placeholder={t("Enter second name")}
            disabled={readOnly}
          />
          <MyInput<StaffDto>
            control={form.control}
            name={"email"}
            label={t("Email")}
            placeholder={t("Enter email")}
            required
            disabled={readOnly}
          />
          <MyMaskInput<StaffDto>
            control={form.control}
            name={"pinfl"}
            label={t("Pinfl")}
            placeholder={t("Enter pinfl")}
            required
            mask={"0000000000000"}
            disabled={readOnly}
          />
          <MyMaskInput<StaffDto>
            control={form.control}
            name={"phone"}
            label={t("Phone")}
            placeholder={t("Enter phone number")}
            required
            mask={"{998}000000000"}
            disabled={readOnly}
          />
          {!readOnly && (
            <>
              <MyInput<StaffDto>
                control={form.control}
                name={"password"}
                type={"password"}
                label={t("Password")}
                placeholder={t("Enter password")}
                required
              />
              <MyInput<StaffDto>
                control={form.control}
                name={"passwordRepeat"}
                type={"password"}
                label={t("Confirm password")}
                placeholder={t("Repeat password")}
                required
              />
            </>
          )}
          <MySelect<StaffDto>
            control={form.control}
            name={"role"}
            options={roleOptions || []}
            label={t("Role")}
            placeholder={t("Select role")}
            required
            isDisabled={readOnly}
          />
        </div>
        {!readOnly && <FormContainerFooter />}
      </form>
    </Form>
  );
};

export default StaffForm;
