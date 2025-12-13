import { Form, MyInput } from "dgz-ui-shared/components/form";
import { useTranslation } from "react-i18next";
import { FormContainerFooter } from "@/shared/components/templates/form";
import MyListItems from "@/shared/components/atoms/form/MyListItems.tsx";
import { StaffInterface } from "@/pages/staff/interfaces/staff.interface.ts";
import { ColumnType } from "dgz-ui-shared/types";
import { GroupDto } from "@/pages/groups/schemas/createGroupSchema.ts";
import useGroupForm, {
  GroupFormProps,
} from "@/pages/groups/hooks/useGroupForm.ts";

type Props = GroupFormProps & { readOnly?: boolean };

const GroupForm = ({ id, onSave, readOnly = false }: Props) => {
  const { t } = useTranslation();
  const {
    form,
    onSubmit,
    staffList,
    staffTotal,
    staffParams,
    handleStaffFilter,
    groupUsers,
  } = useGroupForm({ id, onSave });

  const columns: ColumnType<StaffInterface>[] = [
    {
      key: "first_name",
      dataIndex: "first_name",
      name: t("Staff"),
      render: (first_name, record) => (
        <div>
          {first_name} {record.second_name}
        </div>
      ),
    },

    {
      key: "pinfl",
      dataIndex: "pinfl",
      name: t("PINFL"),
    },
    {
      key: "email",
      dataIndex: "email",
      name: t("Email"),
    },
    {
      key: "role",
      dataIndex: "role",
      name: t("Role"),
      render: (role) => role.name,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
        <div className={"grid grid-cols-1 gap-4"}>
          <MyInput<GroupDto>
            control={form.control}
            name={"name"}
            label={t("Group name")}
            placeholder={t("Enter group name")}
            required
            disabled={readOnly}
          />
          <MyInput<GroupDto>
            control={form.control}
            name={"description"}
            label={t("Group description")}
            placeholder={t("Enter group description")}
            required
            disabled={readOnly}
          />
        </div>

        <div className={"border border-border-alpha-strong rounded-lg p-3"}>
          {readOnly ? (
            <MyListItems
              label={t("Staffs")}
              rowKey={"_id"}
              rows={groupUsers}
              columns={columns}
              hasCheckbox={false}
              required={false}
            />
          ) : (
            <MyListItems<GroupDto, StaffInterface>
              control={form.control}
              name={"users"}
              label={t("Staffs")}
              required
              rowKey={"_id"}
              rows={staffList}
              columns={columns}
              params={staffParams}
              total={staffTotal}
              onParamsChange={handleStaffFilter}
              helperText={t("Select staff to include in this group")}
              hasCheckbox
            />
          )}
        </div>

        {!readOnly && <FormContainerFooter />}
      </form>
    </Form>
  );
};

export default GroupForm;
